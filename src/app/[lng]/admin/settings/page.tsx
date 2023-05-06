import { useTranslation } from "#/lib/i18n";
import { adminSettings } from "#/lib/webcontents/sideBar";
import { BasePageProps } from "#/types/page";


export default async function Page({params}: BasePageProps) {
  const { t } = await useTranslation(params.lng, 'message')
	
  return (
    <div className="space-y-8">
      <div className="space-y-10 text-white">
        {adminSettings.map((section) => {
          return (
            <div key={section.name} className="space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {t(section.name)}
              </div>

             {/*  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {section.items.map((item: NavItem) => {
                  return (
                    <Link
                      href={`/${item.link}`}
                      key={item.name}
                      className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
                    >
                      <div className="font-medium text-gray-200 group-hover:text-gray-50">
                        {item.name}
                      </div>

                      {item.description ? (
                        <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                          {item.description}
                        </div>
                      ) : null}
                    </Link>
                  )
                })}
              </div> */}
            </div>
          )
        })}
      </div>
    </div>
  )
  }



