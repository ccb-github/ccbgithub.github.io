import LoginForm from '#/components/login/LoginForm'
import ModalQRCodeDialog from '#/components/form/ModalQRCodeDialog'
import { BasePageProps } from '#/types/page'
import Image from 'next/image'
import Link from 'next/link'
import { EditIcon } from '#/components/icons'

export default function Login({ params:{lng}}: BasePageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">    
      <LoginForm lng={lng}/>
      <EditIcon/>
    </main>
  )
}



