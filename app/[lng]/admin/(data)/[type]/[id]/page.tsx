import React from "react"
import MongodbList  from "#/components/common/MongodbListBefore"
import { BasePageProps } from "#/types/page"
import ProductItem from "#/components/common/item/ProductItem"
import EnterpriseItem from "#/components/common/item/EnterpriseItem"
import { getEnterprise } from "#/lib/api/apolloEndpoint"

interface PageProps extends BasePageProps{
  params :{
    type: string; 
    id: string;
    lng: string
  }
}
export default async function Page({ params }: PageProps) {
	const {type,  lng} = params
  console.log('Type', type)
  const enterprise = await getEnterprise()
  console.log(enterprise)
	return (
    <div>
      {(() => {
        switch (type) {
          case 'Product':
            return <ProductItem lng={lng} product={{name: "Product a", catgory: "A"}}/>
          case 'Enterprise':
            return <h1>Enterprise</h1>
          default:
            return <h1>Not implement yet</h1>
        }
      })()}
    </div>
  )
}


