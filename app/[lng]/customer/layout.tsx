import { CommonLayoutProps } from "#/types/page";

import CustomerSideBar from "#/components/customer/CustomerSidebar";
import AccountFooter from "#/components/normal/AccountFooter";
import { BreadCrumb } from "#/components/common/AddressBar";





export default function CustomerRootLayout({
  children,
  params: { lng },
}: CommonLayoutProps) {
  return (
    <>
      <CustomerSideBar lng={lng}/>

      <div className="flex h-full flex-col lg:pl-72">
        <BreadCrumb className="flex-grow-0" lng={lng}/>

        <div
          id="app-root-container"
          className="h-4/5 flex-grow rounded-lg p-2 
			           shadow-lg shadow-black/20"
        >
          {children}
        </div>

        <div className="flex-grow-0 rounded-lg" id="sign">
          <AccountFooter lng={lng}/>
        </div>
      </div>
    </>
  )
}