'use client';

import { useEffect, useRef, useState } from 'react';



import { useApp } from '#/hooks/useApp';
import BlurImage from '../common/BlurImage';
import { useTranslation } from '#/lib/i18n/client';
import { FaUser } from 'react-icons/fa';
import NormalButton from '../common/NormalButton';



export default function CenterUserInfo({lng}: {lng: string}) {
  const currentUser = useRef(useApp().currentUser)
  
  const {email , name} = currentUser.current!.profile 
  const { t } = useTranslation(lng, "common")
  const [editable, setEditalbe] = useState(false)

  useEffect(() => {
    
    //setEmail(currentUser.current?.profile.email)
    // const infoCheckTimeOut = setTimeout(() => {
        
    // }, 3000);
    //debugger
    // if(currentUser.current === null){
    //   throw new Error("User not login!")
    // }
  }, [lng, currentUser])
  //A grid box with 3column if device is above middle size
  return (
    <div id="centered-user-info"
         className="border-b border-gray-800 
           grid grid-cols-1 md:grid-cols-3  
         "
    > <div>
      {/* <BlurImage 
        alt={`User avatar of ${currentUser.current?.id}`}
        width={64}
        height={64}
        src={currentUser.current?.profile.pictureUrl || 
            "https://i.ibb.co/7xmcfgQ/Screenshot-from-2023-05-02-18-06-17.png"}/> */}
      {/* https://i.ibb.co/7xmcfgQ/Screenshot-from-2023-05-02-18-06-17.png */}
        <FaUser className='w-32 h-32 float-right'/>
      </div>
      <div>
        <div id="user-info-column"
          className="md:col-span-2"
        >
         
          <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
            <span className='font-bold mr-2'>{t("Email") + ":"}</span>{email}
          </div>
          <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
            <span className='font-bold mr-2'>{t("Name") + ":"}</span>{"user alpha"}
          </div>
          <hr />
          {/* <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
            <label>Allowed catgory</label>
            <ReactSelect className='w-full' options={productCatgoryRoleList}/>
          </div> */}
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}


