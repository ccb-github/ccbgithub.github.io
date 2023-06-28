'use client'
import AccountPermissionManage from '#/components/admin/account/AccountPermissionManage';
import { BasePageParams, BasePageProps } from '#/types/page';




 
export default async function Page({ params, searchParams}: BasePageProps) {
  const { lng } = params
  const { id } = searchParams
  // let accounts: NavItem[] = [{ name:"",link:"/1", description: `To user 1`}]
  //const { product } = await getAllProducts()
  if(id === undefined) 
    return null
  
  return (
    <AccountPermissionManage lng={lng} id={id as string}/> 
  );
}