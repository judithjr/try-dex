import { ERC20Token } from "@pancakeswap/sdk";
import { ChainId } from "@pancakeswap/chains";

// For StoryBook
export const cakeToken = new ERC20Token(
  ChainId.BSC,
  "0x0eE4024E8d5ae9afFCe26f692028407dD2050B7D",
  18,
  "CAKE",
  "PattieSwap Token",
  "https://pancakeswap.finance/"
);

export const bscToken = new ERC20Token(
  ChainId.BSC,
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  18,
  "BNB",
  "BNB",
  "https://www.binance.com/"
);
