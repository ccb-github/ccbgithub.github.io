'use client'
import  QRCode, { QRErrorCorrectLevel} from './class/QRCodeClass' 

function showQRCode(text: string, targetElement?: HTMLDivElement | Document) {
  if (arguments.length === 0) {
    throw new Error(`Missing two arguments ${arguments}`)
  }
  if (arguments.length === 1) {
    targetElement = document
  }
  var dotsize = 5 // size of box drawn on canvas
  var padding = 10 // (white area around your QRCode)
  var black = "rgb(0,0,0)"
  var white = "rgb(255,255,255)"
  var QRCodeVersion = 15    
  // 1-40 see http://www.denso-wave.com/qrcode/qrgene2-e.html

  var canvas = document.createElement("canvas")
  var qrCanvasContext = canvas.getContext("2d")
  let qr
  try {
    // QR Code Error Correction Capability
    // Higher levels improves error correction capability while decreasing the amount of data QR Code size.
    // QRErrorCorrectLevel.L (5%) QRErrorCorrectLevel.M (15%) QRErrorCorrectLevel.Q (25%) QRErrorCorrectLevel.H (30%)
    // eg. L can survive approx 5% damage...etc.
    qr = new QRCode(QRCodeVersion, QRErrorCorrectLevel.L)
    qr.addData(text)
    qr.make()
  } catch (err) {
    var errorChild = document.createElement("p")
    var errorMSG = document.createTextNode("QR Code FAIL! " + err)
    errorChild.appendChild(errorMSG)
    return errorChild
  }

  //Adjust the canvas size according to qrcode size setting
  var qrsize = qr.getModuleCount()
  //@ts-ignore
  canvas.setAttribute("height", qrsize * dotsize + padding)
  //@ts-ignore
  canvas.setAttribute("width", qrsize * dotsize + padding)
  var shiftForPadding = padding / 2
  
  // if (canvas.getContext) {
    for (var r = 0; r < qrsize; r++) {
      for (var c = 0; c < qrsize; c++) {
        if (qr.isDark(r, c)){ 
          qrCanvasContext!.fillStyle = black
        }
        
        else {
          qrCanvasContext!.fillStyle = white
        }
        
        qrCanvasContext!.fillRect(
          c * dotsize + shiftForPadding,
          r * dotsize + shiftForPadding,
          dotsize,
          dotsize
        ) // x, y, w, h
      }
    }
  

  var imgElement = document.createElement("img")
  imgElement.src = canvas.toDataURL("image/png")

  return imgElement
}

export function  updateQRCode(text: string, targetElement: HTMLElement) {
  //const targetElement = document.getElementById(targetElementId || "qrcode")
  console.log(targetElement)
  //TODO if empty
  if (targetElement!.lastChild)
    targetElement!.replaceChild(showQRCode(text), targetElement.lastChild)
  else targetElement!.appendChild(showQRCode(text))
}
