import { NavItem } from "#/types/webContent"

//All the link should be absloute(regardless of the current path)
export const adminSideBarItems: NavItem[] = [
  {
    name: "Admin",
    description: "Root admin sidebar menu",
    items: [
      {
        name: "Account manage",
        link: "/admin/account",
        description: "Manage user account for the app",
      },
      {
        name: "Traceability info",
        description: "No spec description",
        items: [
          {
            name: "Product",
            link: "/admin/product",
            description: "Manage product",
          },

          {
            name: "Category register",
            link: "/admin/category/insert",
            description: "Register new category",
          },
        ],
      },
      {
        name: "Organization manage",
        description: "No spec description provide",
        items: [
          {
            name: "Stock",
            link: "/admin/stock",
            description: "All the stock",
          },
          {
            name: "Seller",
            link: "/admin/seller",
            description: "Manage the celler",
          },
        ],
      },
      // {
      //   name: "Other",
      //   description: "No spec description provide",
      //   items: [
      //     {
      //       name: "Process manage",
      //       link: "/admin/process",
      //       description: "All the process",
      //     },
      //   ],
      // },
    ],
  },
]

export const regulatorySideBarItems: NavItem[] = [
  {
    name: "Regulatory",
    description: "Root item of regulatory sidebar",
    items: [
      {
        name: "Account",
        description: "Manage user account(regulatory)",
        items: [
          {
            name: "Account info",
            link: "/regulatory/account",
            description: "Account info",
          },
          {
            name: "Organization info",
            link: "#",
            description: "Organization info",
          },
        ],
      },
      {
        name: "Data manage",
        description: "Default description",
        items: [
          {
            name: "质检",
            link: "/regulatory/check-record",
            description: "Manage product",
          },
        ],
      },
    ],
  },
]

export const enterPriseSideBarItems: NavItem[] = [
  {
    name: "Enterprise",
    items: [
      {
        name: "Account",
        link: "/enterprise/account",
        description: "Enterprise account profile manage",
      },
      {
        name: "Product",
        link: "/enterprise/product",
        description: "Manage product",
      },
      {
        name: "Stock manage",
        link: "/enterprise/stock",
        description: "Manage stock",
      },
      {
        name: "Order",
        link: "/enterprise/order",
        description: "Order manage",
      },
    ],
    description: "Enterprise sideBar",
  },
]

export const customerSideBarItems: NavItem[] = [
  {
    name: "Customer",
    items: [
      {
        name: "Account Profile",
        link: "/customer/account",
        description: "Account Profile manage",
      },
      {
        name: "Product",
        link: "/customer/product",
        description: "Enterprise search",
      },
      {
        name: "Checker",
        link: "/customer/checker",
        description: "setting page",
      },
    ],
    description: "Customer sideBar ",
  },
]

export const adminSettings: { name: string; items: NavItem[] }[] = [
  {
    name: "Qrcode",
    items: [
      {
        name: "Settings",
        link: "qrcode",
        description: "Create UI that is shared across routes",
      },
    ],
  },
  {
    name: "Appearance",
    items: [
      {
        name: "theme",
        link: "#",
        description: "Change the application theme",
      },
    ],
  },
]
