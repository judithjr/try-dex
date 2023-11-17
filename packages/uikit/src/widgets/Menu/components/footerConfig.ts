import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("Ecosystem"),
    items: [
      {
        label: t("Trade"),
        href: "/swap",
      },
      {
        label: t("Earn"),
        href: "/farms",
      },
      {
        label: t("PattieFlip"),
        href: "https://pattieflip.com/",
      },
      {
        label: t("PattiePad"),
        href: "https://pattiepad.com/",
      },
      
      
    ],
  },
  
  {
    label: t("Support"),
    items: [
      {
        label: t("Contact"),
        href: "https://t.me/pattieswap",
      },
      {
        label: t("Guides"),
        href: "https://swap.pattieswap.finance/pattieswap.pdf",
      },
     
    ],
  },
  {
    label: t("About"),
    items: [
      {
        label: t("Smart Contract"),
        href: "https://bscscan.com/token/0x0ee4024e8d5ae9affce26f692028407dd2050b7d#code",
      },
      
    ],
  },
];
