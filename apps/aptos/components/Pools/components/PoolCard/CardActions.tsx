import { Pool } from '@pancakeswap/widgets-internal'
import { Coin } from '@pancakeswap/aptos-swap-sdk'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

export default Pool.withCardActions<Coin>(HarvestActions, StakeActions)
