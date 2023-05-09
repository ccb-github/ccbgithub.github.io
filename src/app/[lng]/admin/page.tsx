import { adminMainPanels } from "#/lib/webcontents/mainPanel";
import { NavItem } from "#/types/webContent";
import Link from "next/link";
import { cookies } from "next/headers"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { useTranslation } from "#/lib/i18n";

import { getOneProduct, gqlQueryNow } from "#/lib/api/ApolloEndpoint";

type PageParams = {
	lng: string
}
const getApolloClient = async (cookie: ReadonlyRequestCookies) => {
  console.log(cookie.getAll())
  return cookie.get("accessToken")
}
export default async function Page({params}: {params: PageParams}) {
  const { lng } = params
   
  const { t } = await useTranslation(lng, 'admin')
  
  const cookieStore = cookies()
  const  test = await getApolloClient(cookieStore)
  //const accessToken = cookieStore.get('accessToken')
  const data = await getOneProduct()
  console.log(data)
  
  return (
    <>
      {adminMainPanels.map((section) => (
        <div key={section.name} className="space-y-5">
          <div className="text-xl font-semibold uppercase tracking-wider">
            {t(`mainPanel.${section.name}`)}
          </div>
          {/* <Suspense fallback={<p>Suspense</p>}> */}
                    {/* <p>{"test?.value}</p> */}
          {/* </Suspense> */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {section.items.map((item: NavItem) => (
              <Link
                href={`/${lng}/admin/${item.link}`}
                key={item.name}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div 
                  className="font-medium text-gray-200 group-hover:text-gray-50"
                >
                  {t(`mainPanel.${item.name}`)}
                </div>
                {item.description ? (
                  <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                    {t(`mainPanel.${item.description}`)}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ))}
      
      {/* <AllowedCatgoryList list={[]}/> */}
    </>
  )
}