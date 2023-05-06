import { NavItem } from "#/types/webContent";

//All the link should be absloute(regardless of the current path)
export const adminSideBarItems: NavItem[] = [
	{
	  name: 'Admin function',
	  items: [
		{
		  name: 'Account Manage',
		  link: '/admin/account',
		  description: 'Manage user account for the app',
		},
		{
		  name: 'Data manage',
			items: [
				{
					name: 'product',
					link: '/admin/product',
					description: 'Manage product',
				},
				{
					name: 'checker',
					link: '/admin/checker',
					description: 'Manage checker',
				},
				{
					name: 'Catgory register',
					link: '/admin/catgory/insert',
					description: 'Register new catgory',
				}
			]
		},
		{
			name: 'Regulatory manage',
			  items: [
				  {
					  name: 'Regulatory',
					  link: '/admin/regulatory',
					  description: 'Manage the regulatory',
				  },
				  {
					name: '质量检测记录',
					link: '/admin/regulatory',
					description: 'Manage the regulatory',
				  },
			  ]
		},
		{
			name: '过程管理',
			link: '/admin/process',
			description: 'All the process',
		},
	  ],
	},
]

export const enterPriseSideBarItems: NavItem[] = [
  {
    name: 'Enterprise',
    items: [
      {
		name: 'Account',
        link: '/enterprise/account',
        description: 'Enterprise account profile manage',
      },
			{
        name: 'Product manage',
        link: '/enterprise/add',
        description: 'Add product',
      },
			{
        name: 'Order',
        link: '/enterprise/order',
        description: 'Order manage',
      },

    ],
  },
]

export const customerSideBarItems: NavItem[] = [
	{
	  name: 'Customer',
	  items: [
		{
		  name: 'Account Profile',
		  link: '/customer/account',
		  description: 'Account Profile manage',
		},
		{
		  name: 'Product',
		  link: '/customer/product',
		  description: 'Enterprise search',
		},
		{
		  name: 'Checker',
		  link: '/customer/checker',
		  description: 'setting page',
		},
	  ],
	},
]

export const adminSettings: { name: string; items: NavItem[] }[] = [	
	{
	  name: 'Qrcode',
	  items: [
		{
		  name: 'Settings',
		  link: 'qrcode',
		  description: 'Create UI that is shared across routes',
		},
	
	  ],
	},
	{
	  name: 'Appearance',
	  items: [
		{
		  name: 'theme',
		  link: '#',
		  description:
			'Change the application theme',
		},
	  ],
	},
	
]
