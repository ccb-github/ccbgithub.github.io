'use client'
import { useEffect } from "react";
import { updateQRCode } from '#/lib/qrcode'
import { useTranslation } from "#/lib/i18n/client";

export default function ModalQRCodeDialog(props:{ src: string, lng: string,desc?: string}) {
  // async function windowReady() {
  //   alert("Window ready called")
  //   const favDialog = document.getElementById('favDialog') as HTMLDialogElement
     
     
  //   if (favDialog === null || favDialog.querySelector('#downloadBtn') === null) {
  //     throw new Error('No document find with id' + 'favDialog')
  //   }
  //   const confirmBtn = favDialog.querySelector('#downloadBtn')
    
  //   favDialog.open = false
  //   favDialog.showModal()
    
  //   updateQRCode(props.src)
  //   // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
  //   favDialog.addEventListener('close', () => {
      
  //   })
  // }

  const {t} = useTranslation(props.lng, "dialog")
 
  useEffect( () => {
    const favDialog = document.getElementById('favDialog') as HTMLDialogElement
    const confirmBtn = favDialog.querySelector('#downloadBtn')
    if (favDialog === null || favDialog.querySelector('#downloadBtn') === null) {
      throw new Error('No document find with id' + 'favDialog')
    }
   
    favDialog.open = false
    favDialog.showModal()
      
    updateQRCode(props.src)
      // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
      favDialog.addEventListener('close', () => {
        
      })
     
    
    
    return () => {
      //TODO remove the event
    }
  }, [])
  
	return (
    <dialog id="favDialog">
      <form method="dialog">
        <p>
          {t("Download the qrcode image for your need")}
        </p>
        <div id="qrcode">
        
        </div>
        <div className="w-full flex">
          <button type="submit" id="downloadBtn" className="flex-1" value="default">
            Confirm
          </button>
          <button value="cancel" className="flex-1">
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  )
}