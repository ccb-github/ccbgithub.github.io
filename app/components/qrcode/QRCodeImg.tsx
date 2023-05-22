'use client'
import { useEffect } from "react";
import { Trans } from "react-i18next";

export default function QRCodeImg(props:{ src: string, desc?: string, id?: string}) {
  const windowReady =  () => {
    console.log("Window ready", src)
    return () => {"This is real window ready"}
  } 
  //Default id is qrcode
  //let testButton
  const {src, desc} = props
  useEffect( () => {
    //@ts-ignore
    //
    // const qrcodeImg = document.querySelector("#qrcode>img") as HTMLImageElement
    // qrcodeImg.alt = desc || `A qrcode contain data ${desc}`
    // testButton = document.querySelector("#testButton")
    // testButton.onclick = () => {
    //   alert("Hint")
    // }
   
    window  ? window.onload = windowReady() : null
    return () => {
      // testButton.onclick = null
    }
  }, [src])
  
	return (
    <div id="qrcode" className="qrcode">
     
    </div>
      
   
  )
}