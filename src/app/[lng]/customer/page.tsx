'use client'
import { BasePageProps } from '#/types/page';

import SearchBySchemaName from '#/components/common/SearchBySchemaName';
import { useState } from 'react';
import ProductItem from '#/components/common/item/ProductItem';
import { SchemaName, SearchResultMap } from '#/types/schema';
import CheckerItem from '#/components/common/item/CheckerItem';
import EnterpriseItem from '#/components/common/item/EnterpriseItem';
import DefaultItem from '#/components/common/item/DefaultItem';



const SearchResultWrapper = ({type, data, lng}: {type: SchemaName, data: any, lng: string}) => {
  if(data === null || data === undefined) 
    return(
      <p>Empty result, check your search query</p>
    )
  switch(type) {
    case "Product":
      return <ProductItem lng={lng} product={data}/>
    case "Checker":
      return <CheckerItem lng={lng} item={data}/>
    case "Enterprise":
      return <EnterpriseItem lng={lng} item={data}/>
    default: 
      return <DefaultItem lng={lng} item={data}/>
  }
}

export default function Page({ params: {lng}}: BasePageProps) {
  const searchProductByName = async (value: string) => {
    console.log(value)
    return {
      value,
      name: "placeholder"
    }
  }
  const [searchResult, setSearchResult] = useState<SearchResultMap>()
  return (
    <div className="space-y-4">
      <SearchBySchemaName 
        searchSchemaName={'Product'} 
        onSearchSubmit={(result) => {
          setSearchResult(result)
        }} 
      />
      {
        searchResult? 
          <SearchResultWrapper 
            lng={lng} 
            data={searchResult.get("resultData")} 
            type={searchResult.get("type")}
          />
          : null
      }
      
    </div>
  );
}
