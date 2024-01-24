"use client"
import { useCallback, useContext, useEffect, useRef } from "react"
import { useTranslation } from "#/lib/i18n/client"
import Button from "#/components/common/Button"
import { ConfirmContext } from "#/context/ConfirmContext"
import { Language } from "#/lib/i18n/settings"

// TODO event listener unbind
export default function ConfirmDialog({
  lng,
  confirmAction: confirmActionProp = async () => {
    console.log("Confirm action")
  },
  closeAction: closeActionProp = async () => {
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
  const { opened, setOpened } = useContext(ConfirmContext)
  // const confirmButtonRef = useRef<HTMLDialogElement>(null)
  // const cancelButtonRef = useRef<HTMLDialogElement>(null)
  const confirmAction = useCallback(async () => {
    const actionPropResult = await confirmActionProp()
    console.log(`ConfirmActionProp result ${JSON.stringify(actionPropResult)}`)
    setOpened(true)

    return true
  }, [confirmActionProp, setOpened])

  const closeAction = useCallback(async () => {
    const actionPropResult = await closeActionProp()
    console.log(`CloseActionProp result ${JSON.stringify(actionPropResult)}`)
    setOpened(false)
    return false
  }, [closeActionProp, setOpened])
  useEffect(() => {
    // Bind the event
    const confirmBtn = dialogRef.current?.querySelector(
      "#confirmBtn",
    ) as HTMLButtonElement
    const cancelBtn = dialogRef.current?.querySelector(
      "#cancelBtn",
    ) as HTMLButtonElement

    confirmBtn.onclick = confirmAction

    cancelBtn.onclick = closeAction

    // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
    dialogRef.current?.addEventListener("close", () => {
      closeActionProp()
      setOpened(false)
    })
  }, [closeAction, closeActionProp, confirmAction, setOpened])

  useEffect(() => {
    if (opened) {
      dialogRef.current?.showModal()
    }
  }, [opened])
  return (
    <dialog id="favDialog" ref={dialogRef} className="rounded-md p-8">
      <form method="dialog">
        <h2 className="font-bold">{t("Confirm the option")}</h2>
        <div className="w-full flex space-x-2">
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
