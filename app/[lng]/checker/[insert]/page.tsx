'use client'

import type { BasePageProps } from "#/types/page";

import AddDataForm from "#/components/form/AddDataForm";
import { schemaJson } from "#/lib/constants";
import RelatedObjectSelect from "#/components/form/RelatedObjSelect";

export default function Page({ params: {lng}}: BasePageProps) {
  return (
    
    <>
      <AddDataForm schemaObj={schemaJson["Product"]} lng={lng}>
        <RelatedObjectSelect objectType="Product" />  
      </AddDataForm>
      
    </>
  );
}
  