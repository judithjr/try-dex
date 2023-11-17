import { formatEther } from 'viem'
import dayjs from 'dayjs'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import { SWRConfig } from 'swr'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import { getCakeContract } from 'utils/contractHelpers'
import { getBlocksFromTimestamps } from 'utils/getBlocksFromTimestamps'
import { bitQueryServerClient, infoServerClient } from 'utils/graphql'
import Home from '../views/Home'

const IndexPage = ({ totalTx30Days, addressCount30Days, tvl }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          totalTx30Days,
          addressCount30Days,
          tvl,
        },
      }}
    >
      <Home />
    </SWRConfig>
  )
}

// Values fetched from TheGraph and BitQuery jan 24, 2022
const txCount = 64187
const addressCount = 4459

const tvl = 6082955532.115718

export const getStaticProps: GetStaticProps = async () => {
  const totalTxQuery = gql`
    query TotalTransactions($block: Block_height) {
      pattieswapFactory(block: $block) {
        totalTransactions
      }
    }
  `

  const days30Ago = dayjs().subtract(30, 'days')

  const results = {
    totalTx30Days: txCount,
    addressCount30Days: addressCount,
    tvl,
  }

  try {
    const [days30AgoBlock] = await getBlocksFromTimestamps([days30Ago.unix()])

    if (!days30AgoBlock) {
      throw new Error('No block found for 30 days ago')
    }

    const totalTx = await infoServerClient.request<any>(totalTxQuery)
    const totalTx30DaysAgo = await infoServerClient.request<any>(totalTxQuery, {
      block: {
        number: days30AgoBlock.number,
      },
    })

    if (
      totalTx?.pattieswapFactory?.totalTransactions &&
      totalTx30DaysAgo?.pattieswapFactory?.totalTransactions &&
      parseInt(totalTx.pattieswapFactory.totalTransactions) > parseInt(totalTx30DaysAgo.pattieswapFactory.totalTransactions)
    ) {
      results.totalTx30Days =
        parseInt(totalTx.pattieswapFactory.totalTransactions) - parseInt(totalTx30DaysAgo.pattieswapFactory.totalTransactions)
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error('Error when fetching total tx count', error)
    }
  }

  const usersQuery = gql`
    query userCount($since: ISO8601DateTime, $till: ISO8601DateTime) {
      ethereum(network: bsc) {
        dexTrades(exchangeName: { in: ["Pancake", "Pancake v2"] }, date: { since: $since, till: $till }) {
          count(uniq: senders)
        }
      }
    }
  `

  if (process.env.BIT_QUERY_HEADER) {
    try {
      const result = await bitQueryServerClient.request<any>(usersQuery, {
        since: days30Ago.toISOString(),
        till: new Date().toISOString(),
      })
      if (result?.ethereum?.dexTrades?.[0]?.count) {
        results.addressCount30Days = result.ethereum.dexTrades[0].count
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Error when fetching address count', error)
      }
    }
  }

  try {
    const result = await infoServerClient.request<any>(gql`
      query tvl {
        pattieswapFactories(first: 1) {
          totalLiquidityUSD
        }
      }
    `)
    const cake = await (await fetch('https://farms-api.pancakeswap.com/price/cake')).json()
    const { totalLiquidityUSD } = result.pattieswapFactories[0]
    const cakeVaultV2 = getCakeVaultAddress()
    const cakeContract = getCakeContract()
    const totalCakeInVault = await cakeContract.read.balanceOf([cakeVaultV2])
    results.tvl = parseFloat(formatEther(totalCakeInVault)) * cake.price + parseFloat(totalLiquidityUSD)
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error('Error when fetching tvl stats', error)
    }
  }

  return {
    props: results,
    revalidate: 60 * 60 * 24 * 30, // 30 days
  }
}

IndexPage.chains = []

export default IndexPage
