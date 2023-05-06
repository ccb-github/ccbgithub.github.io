'use client'
import { BasePageParams, BasePageProps } from '#/types/page';
import AccountProfileManage from '#/components/admin/account/AccountProfileManage';
import { getUser } from '#/lib/api';
import { getAllProducts, getByName, getUsers } from '#/components/ApolloEndpoint';
import { NavItem } from '#/types/webContent';

interface ParamsWithId extends BasePageParams {
  id: string
}
 
export default async function Page({ params }: {params: ParamsWithId}) {
  const { id, lng } = params
  // let accounts: NavItem[] = [{ name:"",link:"/1", description: `To user 1`}]
  //const { product } = await getAllProducts()
  return (
    <AccountProfileManage lng={lng} id={id}/> 
  );
}
//