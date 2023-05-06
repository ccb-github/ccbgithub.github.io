import { NavItem } from "#/types/webContent";

export const adminMainPanels: { name: string; items: NavItem[] }[] = [	
   
    {
      name: 'Show data',
      items: [
        {
          name: 'Product',
          link: 'product',
          description:
            'Description for product',
        },
        {
          name: 'Enterprise',
          link: 'enterprise',
          description: 'All the enterprise',
        },
        {
          name: 'Account',
          link: 'account',
          description: 'Account management',
        },
        {
          name: 'Catgory',
          link: 'catogory/insert',
          description: 'Add new catgory',
        },
      ],
    }
]

export const enterpriseMainPanels: { name: string; items: NavItem[] }[] = [	
    {
      name: 'Operation Panel',
      items: [
        {
          name: 'Product info enter',
          link: 'layouts',
          description: 'Create UI that is shared across routes',
        },
        {
          name: 'Grouped Layouts',
          link: 'route-groups',
          description: 'Organize routes without affecting URL paths',
        },
        {
          name: 'Streaming with Suspense',
          link: 'streaming',
          description:
            'Streaming data fetching from the server with React Suspense',
        },
      ],
    },
    {
      name: 'Show data',
      items: [
        {
          name: 'record',
          link: 'show/record',
          description:
            'Create meaningful loading UI for specific parts of an app',
        },
        {
          name: 'error.js',
          link: 'error-handling',
          description: 'Create error UI for specific parts of an app',
        },
        {
          name: 'head.js',
          link: 'head',
          description: 'Configure the <head> tag of a route segment',
        },
      ],
    },
    {
      name: 'Data Fetching',
      items: [
        {
          name: 'Static-Site Generation',
          link: 'ssg',
          description: 'Generate static pages',
        },
        {
          name: 'Server-Side Rendering',
          link: 'ssr',
          description: 'Server-render pages',
        },
        {
          name: 'Incremental Static Regeneration',
          link: 'isr',
          description: 'Get the best of both worlds between static & dynamic',
        },
      ],
    },
]
