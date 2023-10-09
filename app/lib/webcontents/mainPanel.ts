import { PanelItem } from "#/types/webContent"

export const adminMainPanels: { name: string; items: PanelItem[] }[] = [
  {
    name: "Show data",
    items: [
      {
        name: "Product",
        link: "product",
        description: "Product enter",
        image: "qrcode://",
      },
      {
        name: "Enterprise",
        link: "enterprise",
        description: "All enterprises",
      },
      {
        name: "Account",
        link: "account",
        description: "Account management",
      },
      {
        name: "Category",
        link: "category/insert",
        description: "Add new category",
      },
    ],
  },
]

export const enterpriseMainPanels: { name: string; items: PanelItem[] }[] = [
  {
    name: "Quick Entrance",
    items: [
      {
        name: "Order",
        link: "./order",
        description: "Order manage",
      },
      {
        name: "Product",
        link: "./product",
        description: "Product manage",
      },
    ],
  },
]
