'use client'
import Button from "#/components/common/Button";

import { templateHTML } from "#/components/form/templateHTML";
import { schemaJson } from "#/lib/schema";

import Script from "next/script";


export default async function ProductEditPage({ params: {lng}}: {params: {lng: string}}) {
  console.log("This Product editpage is rendered")
  const schemaObj = schemaJson["Product"]
  const formSubmit = (editedData: FormData) => {
    
  }
  return (
    <>
      <dialog id={"editProductDialog"}>
        <form
          method="post"
          action="#"
          id="insertForm"
          className={`
          grid grid-cols-1 gap-5 lg:grid-cols-2 
          h-full overflow-y-scroll pt-2
        `}
        >
          {Object.keys(schemaObj.properties).map((e) =>
            templateHTML(schemaObj.properties[e])
          )}

          {/* <RelatedItemDialog itemType='Product'/> */}
          <div className="form-group lg:col-span-2">
            <Button type="reset" className="m-2">
              Reset
            </Button>
            <Button type="reset" className="m-2">
              Save
            </Button>
            <Button type="submit" className="m-2">
              Submit
            </Button>
          </div>
        </form>
      </dialog>
      <Script id={"loadDialog"}>
        {`addEventListener("DOMContentLoaded", () => {
          window.editProductDialog.showModal()
        })`}
      </Script>
    </>
  );
}