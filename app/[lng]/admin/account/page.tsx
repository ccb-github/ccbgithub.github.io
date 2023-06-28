import { AccountList } from "#/components/admin/account/AccountList";
import { BasePageProps } from "#/types/page";

export default async function AccountListPage({ params: {lng}}: BasePageProps){
  return(
    <AccountList lng={lng}/> 
  )
}