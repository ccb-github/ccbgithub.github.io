"use client"
import { NavItem } from '#/types/webContent';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import { FaArrowCircleDown, FaArrowRight, FaChevronCircleDown, FaChevronCircleRight, FaChevronCircleUp } from 'react-icons/fa';
//TODO type link, remove unnessary props
export default function SideNavItem({
  name,
  link,
  items,
  lng,
  description,
  close,
}: {
  name: string,
  link?: string,
  description ?: string,
  items?: NavItem[],
  lng: string,
  close?: () => Promise<false | void>;
}) {
  //TODO what does it mean to return false in link
  const segment = useSelectedLayoutSegment();
  const isActive = link === segment;
  const [isOpen, setIsOpen] = useState(false)
  console.log("The link",link)
  return (
    <div className='pl-4'>
      {link ?
        <Link
          href={`/${lng}${link}`}
          className={clsx(
            'nest-link  flex  justify-between rounded-md  px-3 py-2 text-sm font-medium hover:text-gray-300',
            {
              'text-blue-400 hover:bg-blue-800': !isActive,
              'text-white': isActive,
              'opened': isOpen
            },
          )}
        >
          {name}
          
        </Link> : 
        <a
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className={clsx(
            'flex rounded-md cursor-pointer px-3 py-2 text-sm font-medium hover:text-gray-300',
            {
              'text-blue-400 hover:bg-blue-800': !isActive,
              'text-white': isActive,
              'opened': isOpen
            },
          )}
        >
          {
            isOpen ? 
              <FaChevronCircleUp className='self-center mr-2'/> : 
              <FaChevronCircleDown className='self-center mr-2'/>
          }
          {name}
        </a>
      }
      {
        items && isOpen ?
          items.map(
            (item, index) =>
              <SideNavItem
                lng={lng}
                key={index}
                name={item.name}
                link={item.link}
                description={item.description}
                
                items={item.items}
              />
          ) : 
          null
      }
    </div>
  );
}