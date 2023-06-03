import { adminMainPanels } from "#/lib/webcontents/mainPanel";

import Link from "next/link";
import { useTranslation } from "#/lib/i18n";

import { getAllOrders } from "#/lib/api/apolloEndpoint";
import { getCookieByName } from "#/components/util/cookie";
import { NavItem } from "#/types/webContent";
import RelatedItemDialog from "#/components/form/RelatedItemDialog";


type PageParams = {
	lng: string
}

export default async function AdminHomePage({params}: {params: PageParams}) {
  const { lng } = params   
  const { t } = await useTranslation(lng, 'admin')
  const accessToken = getCookieByName("accessToken")
 
 
  return (
    <>
      {/* <ModalQRCodeDialog lng={lng} src='This is an dialog'/> */}
      <Link href={"./admin/other"}>Intercept</Link>
      {adminMainPanels.map((section) => (
        <div key={section.name} className="space-y-5">
          <div className="text-xl font-semibold uppercase tracking-wider">
            {t(`mainPanel.${section.name}`)}
          </div>
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