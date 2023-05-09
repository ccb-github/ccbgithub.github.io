'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '#/hooks/useApp';
import SideNavItem from '../common/SideNavItem';
import { adminSideBarItems } from '../../lib/webcontents/sideBar';
import { useTranslation } from '#/lib/i18n/client';

export function AdminSideBar({lng}: {lng: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  
  const app = useApp()
  const currentUser = useRef(app?.currentUser)
  
  const { t } = useTranslation(lng,'admin.sideBar')
  const [email, setEmail] = useState<string | undefined>()
 
  
  useEffect(() => {
    console.log(`Lng in AdminSideBar ${lng}`)
    console.log(JSON.stringify(currentUser))
    //setEmail(currentUser.current?.profile.email)
    //console.log( getUser(currentUser.current) )
    //debugger
    // if(currentUser.current === null){
    //   throw new Error("User not login!")
    // }
  }, [lng])
  return (
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
          onClick={close}
        >
          <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
            {/* <NextLogo /> */}
          </div>

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            {t('Admin')}
            <span className="Work in progress">{email}</span>
          </h3>
        </Link>
      </div>

      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center space-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
       
        
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2" id="side-nav">
            {adminSideBarItems.map((sideBarItem) => {
              
              return (
                <SideNavItem
                  name={t(sideBarItem.name)}
                  lng={lng}
                  link={sideBarItem.link ? `/${lng}/${sideBarItem.link}` : undefined}
                  description={sideBarItem.description}
                  close={() => false}
                  key={sideBarItem.name}
                  items={sideBarItem.items}
                />
              )
            })}
         
        </nav>
      </div>
    </div>
  )
}


