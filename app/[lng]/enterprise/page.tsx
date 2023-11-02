/* eslint-disable react/react-in-jsx-scope */
import MainPanelNavItem from '#/components/common/MainPanelNavItem'
import { useTranslation } from '#/lib/i18n'
import { enterpriseMainPanels } from '#/lib/webContents/mainPanel'
import { type BasePageProps } from '#/types/pageProp'
import { type NavItem } from '#/types/webContent'


export default async function EnterpriseMainPanelPage({
  params: { lng },
}: BasePageProps) {
  const { t } = await useTranslation(lng, "enterprise", {
    keyPrefix: "mainPanel",
  })
  return (
    <>
      {enterpriseMainPanels.map((section) => (
        <div key={section.name} className="space-y-5">
          <div className="text-xl font-semibold uppercase tracking-wider text-gray-400">
            {t(section.name)}
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {section.items.map((item: NavItem) => (
              <MainPanelNavItem
                key={item.name}
                link={`/${lng}/enterprise/${item.link}`}
                name={t(item.name)}
                description={t(item.description)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
