import { BasePageProps } from '#/types/page'

import RegisterForm from '#/components/login/RegisterForm';
import { useTranslation } from '#/lib/i18n';

export default async function Page({ params: { lng } }: BasePageProps) {
 
  const { t } = await useTranslation(lng, "admin")
  
  return (
    <>
      <main>
        <RegisterForm lng={lng}/>
        <hr style={{ marginTop: 20, width: "100%" }} />
      </main>
    </>
  );
}
