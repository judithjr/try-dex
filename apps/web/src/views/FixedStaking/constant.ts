import { ChainId } from '@pancakeswap/chains'
import { bscTokens } from '@pancakeswap/tokens'

import { FIXED_STAKING_PERIOD } from './type'

export const PERIOD_ARR = [FIXED_STAKING_PERIOD.D30, FIXED_STAKING_PERIOD.D60, FIXED_STAKING_PERIOD.D90]

export const PERCENT_DIGIT = 1000000000

export const DAYS_A_YEAR = 365

export const DISABLED_POOLS = {
  [ChainId.BSC]: [bscTokens.wbnb.address],
}
