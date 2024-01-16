"use client"
import { useContext, useEffect, useRef } from "react"
import { useTranslation } from "#/lib/i18n/client"
import Button from "#/components/common/Button"
import { ConfirmContext } from "#/context/ConfirmContext"
import { Language } from "#/lib/i18n/settings"

// TODO event listener unbind
export default function ConfirmDialog({
  lng,
  confirmAction = async () => {
    console.log("Confirm action")
  },
  defaultOpen = true,
  closeAction = async () => {
    console.log("Close action")
  },
}: {
  lng: Language
  desc?: string
  defaultOpen?: boolean
  confirmAction: () => Promise<boolean | void>
  closeAction: () => Promise<boolean | void>
}) {
  // async function windowReady() {

  //   const favDialog = document.getElementById('favDialog') as HTMLDialogElement

  //   if (favDialog === null || favDialog.querySelector('#confirmBtn') === null) {
  //     throw new Error('No document find with id' + 'favDialog')
  //   }
  //   const confirmBtn = favDialog.querySelector('#confirmBtn')

  //   favDialog.open = false
  //   favDialog.showModal()

  //   // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
  //   favDialog.addEventListener('close', () => {

  //   })
  // }
  const { t } = useTranslation(lng, "dialog")
  const dialogRef = useRef<HTMLDialogElement>(null)
  const {opened, setOpened, message } = useContext(ConfirmContext)
  // const confirmButtonRef = useRef<HTMLDialogElement>(null)
  // const cancelButtonRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    /* const favDialog = document.getElementById("favDialog") as HTMLDialogElement

    if (favDialog === null || favDialog.querySelector("#confirmBtn") === null) {
      throw new Error("No document find with id" + "favDialog")
    } */
    if (dialogRef.current === null) {
      return
    }
    if (opened) dialogRef.current.showModal()
    const confirmBtn = dialogRef.current.querySelector(
      "#confirmBtn",
    ) as HTMLButtonElement
    const cancelBtn = dialogRef.current.querySelector(
      "#cancelBtn",
    ) as HTMLButtonElement

    confirmBtn.onclick = async () => {
      confirmAction()
      setOpened(true)

      return true
    }

    cancelBtn.onclick = async () => {
      closeAction()
      dialogRef.current!.close()
    }

    // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
    dialogRef.current.addEventListener("close", () => {
      closeAction()
      setOpened(false)
    })
  }, [closeAction, confirmAction, opened, setOpened])

  return (
    <dialog id="favDialog" ref={dialogRef} className="rounded-md p-8">
      <form method="dialog">
        <h2 className="font-bold">Confirm the option</h2>
        <p>{message}</p>
        <div className="w-full flex">
          <Button id="confirmBtn" type="submit" className="flex-1 bg-slate-50">
            {t("Confirm")}
          </Button>

          <Button id="cancelBtn" value="bg-slate-50">
            {t("Cancel")}
          </Button>
        </div>
      </form>
    </dialog>
  )
}
