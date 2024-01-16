import { useTranslation } from "#/lib/i18n"
import { Language, fallbackLng } from "#/lib/i18n/settings"
import Button from "../Button"

export default async function UploadForm({
  children,
  formAction,
  lng,
}: {
  text?: string
  lng?: Language
  children?: React.ReactNode
  className?: string
  formAction: (formData: FormData) => Promise<unknown>
}) {
  const { t } = await useTranslation(lng ?? fallbackLng)
  return (
    <form action={formAction}>
      {children}
      <input type="file" name="file" />
      <Button type="submit">{t("Upload")}</Button>
    </form>
  )
}
