import CenterUserInfo from "#/components/customer/CenteredUserInfo";
import { BasePageProps } from "#/types/page";

export default function Page({ params: {lng}}: BasePageProps) {
  return (
    <CenterUserInfo lng={lng}/>
  )
}