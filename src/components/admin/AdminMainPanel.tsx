'use client'
import { useTranslation } from '#/lib/i18n/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavItem } from '#/types/webContent'
import { adminMainPanels } from '#/lib/webcontents/mainPanel'
//TODO more type
export function AdminMainPanel({lng}: {lng: string}) {
  const pathName: string | null = usePathname()
  console.log("Current language in adminpanel",lng)
  const {t} = useTranslation(lng, "admin")

  return (
    <div className="space-y-10 text-white" id="adminMainPanel">
      {adminMainPanels.map((section) => (
        <div key={section.name} className="space-y-5">
          <div className="text-xl font-semibold uppercase tracking-wider text-gray-400">
            {t(section.name)}
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {section.items.map((item: NavItem) => (
              <Link
                href={`/${pathName ? pathName : ''}/${item.link}`}
                key={item.name}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div
                  className="font-medium text-gray-200 group-hover:text-gray-50"
                >
                  {t("temp.else")}
                </div>

                {item.description ? (
                  <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                    {t(item.description)}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ))}
      {/* <ModalFormWithImage src='https://www.pexels.com/photo/abstract-background-with-swirls-multicolor-splashes-of-paints-3844788' desc='placeholder' /> */}
    </div>
  )
}
