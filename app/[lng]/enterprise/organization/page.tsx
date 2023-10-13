import CenterUserInfo from "#/components/customer/CenteredUserInfo"
import { BasePageProps } from "#/types/pageProp"

export default function EnterpriseOrganizationPage({
  params: { lng },
}: BasePageProps) {
  return <CenterUserInfo lng={lng} />
}
