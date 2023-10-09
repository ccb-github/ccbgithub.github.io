"use client"
import { useContext, useEffect, useRef } from "react"
import { useTranslation } from "#/lib/i18n/client"
import Button from "#/components/common/Button"
import { ConfirmContext } from "#/context/ConfirmContext"

// TODO event listener unbind
export default function ConfirmDialog({
  lng,
  confirmAction = async () => {
    console.log("Confirm action")
  },
  closeAction = async () => {
    console.log("Close action")
  },
}: {
  lng: string
  desc?: string
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
  // const confirmButtonRef = useRef<HTMLDialogElement>(null)
  // const cancelButtonRef = useRef<HTMLDialogElement>(null)
  let confirmDialogContext = useContext(ConfirmContext)
  useEffect(() => {
    /* const favDialog = document.getElementById("favDialog") as HTMLDialogElement

    if (favDialog === null || favDialog.querySelector("#confirmBtn") === null) {
      throw new Error("No document find with id" + "favDialog")
    } */
    if (dialogRef.current === null) {
      return
    }
    const confirmBtn = dialogRef.current.querySelector(
      "#confirmBtn",
    ) as HTMLButtonElement
    const cancelBtn = dialogRef.current.querySelector(
      "#cancelBtn",
    ) as HTMLButtonElement

    confirmBtn.onclick = async () => {
      confirmAction()
      confirmDialogContext = {
        ...confirmDialogContext,
        confirmed: true,
      }

      return true
    }

    cancelBtn.onclick = async () => {
      closeAction()
      dialogRef.current!.close()
    }

    // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
    dialogRef.current.addEventListener("close", () => {
      closeAction()
      confirmDialogContext.opened = false
    })
  }, [closeAction, confirmAction, confirmDialogContext])

  return (
    <dialog id="favDialog" ref={dialogRef} className="rounded-md p-8">
      <form method="dialog">
        <h2 className="font-bold">Confirm the option</h2>
        <p>{confirmDialogContext.message}</p>
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
