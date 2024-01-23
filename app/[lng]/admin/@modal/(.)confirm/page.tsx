"use client"
import ConfirmDialog from "#/components/common/dialog/ConfirmDialog";
import { Language } from "#/lib/i18n/settings";
import { useRouter } from "next/navigation";


export default function ModelConfirmDialog({
  params: { lng },
}: {
  params: { lng: Language }
}) {
  console.log("Yes this dialog is rendered")
  const router = useRouter()
  return (
    <ConfirmDialog
      lng={lng}
      closeAction={async () => {
        router.back()
        return true
      }}
      confirmAction={async () => {
        return false
      }}
    />
  );
}