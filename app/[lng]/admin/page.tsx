import { adminMainPanels } from "#/lib/webContents/mainPanel"
import Link from "next/link"
import { useTranslation } from "#/lib/i18n"
import { NavItem } from "#/types/webContent"
import TempComponent from "./upload/TempComponent"

type PageParams = {
  lng: string
}

export default async function AdminHomePage({
  params,
}: {
  params: PageParams
}) {
  const { lng } = params
  const { t } = await useTranslation(lng, "admin")
  return (
    <>
      <TempComponent/>
      {adminMainPanels.map((section) => (
        <div key={section.name} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {section.items.map((item: NavItem) => (
              <Link
                href={`/${lng}/admin/${item.link}`}
                key={item.name}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {t(`mainpanel.${item.name}`)}
                </div>
                {item.description ? (
                  <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                    {t(`mainpanel.${item.description}`)}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
