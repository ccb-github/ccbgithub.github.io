import LoginForm from '#/components/login/LoginForm'
import ModalQRCodeDialog from '#/components/form/ModalQRCodeDialog'
import { BasePageProps } from '#/types/page'
import { useTranslation } from '#/lib/i18n'

export default async function LoginPage({ params:{lng}}: BasePageProps) {
  const { t } = await useTranslation(lng)
  return (
    <main className="flex min-h-screen flex-col items-center space-around p-24">    
      <h1 className='text-xl'>{t("Traceability system powered by Nextjs")}</h1>
      <LoginForm lng={lng} className={"w-full"}/>
    </main>
  )
}



