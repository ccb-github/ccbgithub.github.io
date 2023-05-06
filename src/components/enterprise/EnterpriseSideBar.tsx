'use client';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { MenuAlt2Icon } from '@heroicons/react/solid';
import { useApp } from '#/hooks/useApp';
import SideNavItem from '../common/SideNavItem';
import { XIcon } from '../icons';
import { useTranslation } from '#/lib/i18n/client';
import { enterPriseSideBarItems } from '#/lib/webcontents/sideBar';


export default function EnterpriseSideBar({lng}: {lng: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  
  const pathName = usePathname()
  const currentUser = useRef(useApp().currentUser)
  
  const { t } = useTranslation(lng, "enterprise")

  const [email, setEmail] = useState<string | undefined>()
  //let email
  console.log({pathName})
  
  useEffect(() => {
    console.log(`Lng in AdminSideBar ${lng}`)
    //setEmail(currentUser.current?.profile.email)
    
    //debugger
    // if(currentUser.current === null){
    //   throw new Error("User not login!")
    // }
  }, [lng])
  return (
    <div
      id="customer-nav"
      className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-gray-800"
    >
      <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
        <Link
          href={`/${lng}`}
          id="backToHomeLink"
          className="group flex w-full items-center space-x-2.5"
          onClick={close}
        >
          {/* <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
            <NextLogo />
          </div> */}

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            {t("Enterprise")}
            <span className="Work in progress">{email}</span>
          </h3>
        </Link>
      </div>
      {/* <SearchBar/> */}
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center space-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <XIcon className="block w-6" />
        ) : (
          <MenuAlt2Icon className="block w-6" />
        )}
      </button>

      <div
        className={clsx("overflow-y-auto lg:static lg:block", {
          "fixed inset-x-0 bottom-0 top-14 mt-px bg-black": isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2 py-5" id="side-nav-container">
          {/* {userActions.map((section) => {
            return (
              <div key={section.name}>
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider">
                  <div>{section.name}</div>
                </div> */}

          <div className="space-y-1">
            {enterPriseSideBarItems.map((sideBarItem) => (
              <SideNavItem lng={lng}
                key={sideBarItem.name} close={close} {...sideBarItem}/>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}


