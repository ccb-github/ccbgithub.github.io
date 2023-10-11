import { CommonLayoutProps } from "#/types/pageProp"

import AccountFooter from "#/components/normal/AccountFooter"
import BreadCrumb from "#/components/common/BreadCrumb"
import TopTabBar from "#/components/common/TopTabBar"
import SideNavItem from "#/components/common/SideNavItem"
import { customerSideBarItems } from "#/lib/webcontents/sideBar"
import clsx from "clsx"
import Link from "next/link"
import SideBarToggleButton from "../../components/common/SideBarToggleButton"
import { useTranslation } from "#/lib/i18n"
import Script from "next/script"

export default async function CustomerRootLayout({
  children,
  params: { lng },
}: CommonLayoutProps) {
  const { t } = await useTranslation(lng, "customer")
  return (
    <>
      <div
        id="admin-nav"
        className="fixed top-0 z-10 flex w-full flex-col border-b 
                border-gray-800 bg-black 
                  lg:bottom-0 lg:z-auto lg:w-72   lg:border-r lg:border-gray-800"
      >
        <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
          <Link
            href={`/${lng}`}
            id="backToHomeLink"
            className="group flex w-full items-center space-x-2.5"
          >
            <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
              {t("Customer")}
            </h3>
          </Link>
        </div>
        <SideBarToggleButton />
        <div
          id="side-nav-container"
          className={clsx("overflow-y-auto hidden  lg:block")}
        >
          <nav id="side-nav">
            {customerSideBarItems.map((sideBarItem) => {
              return (
                <SideNavItem
                  lng={lng}
                  text={sideBarItem.name}
                  i18ns={"admin"}
                  link={
                    sideBarItem.link ? `/${lng}/${sideBarItem.link}` : undefined
                  }
                  description={sideBarItem.description}
                  close={async () => {
                    "use server"
                    return false
                  }}
                  key={sideBarItem.name}
                  items={sideBarItem.items}
                />
              )
            })}
          </nav>
        </div>
      </div>
      <div className="flex h-full flex-col lg:pl-72">
        <div className="flex-grow-0 rounded-lg" id="footer">
          <AccountFooter lng={lng} />
        </div>
        <TopTabBar lng={lng} />
        <BreadCrumb className="flex-grow-0" lng={lng} />
        <div
          id="app-root-container"
          className="flex-grow rounded-lg p-2 shadow-lg shadow-black/20 overflow-y-scroll"
        >
          {children}
        </div>
      </div>
      <Script id={"toggle-button"} strategy={"lazyOnload"}>
        {`
         document.querySelector('#sidebar-toggle').onclick =  (event) => {
           console.log('Event handler')
           document.querySelector('#side-nav-container').classList.toggle("sidebar-open")
         }
        
     `}
      </Script>
    </>
  )
}
