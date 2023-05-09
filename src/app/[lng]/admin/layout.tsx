import { AdminSideBar } from "#/components/admin/AdminSideBar";
import ApolloCookie from "#/components/ApolooCookie";
import { AddressBar } from "#/components/common/AddressBar";
import TopNavbar from "#/components/common/TopNavbar";
import AccountFooter from "#/components/normal/AccountFooter";
import { CommonLayoutProps } from "#/types/page";



export default function AdminRootLayout({
  children,
  params: { lng },
}: CommonLayoutProps) {
  return (
    <>
      <AdminSideBar lng={lng} />
      <div className="flex h-full flex-col lg:pl-72">
        {/*<TopNavbar lng={lng}/>*/}
        <AddressBar className="flex-grow-0" lng={lng}/>
        <div
          id="app-root-container"
          className="flex-grow rounded-lg p-2 shadow-lg shadow-black/20"
        >
          {children}
        </div>
        <div className="flex-grow-0 rounded-lg" id="footer">
          {/* <AccountFooter lng={lng}/> */}
        </div>
      </div>
    </>
  )
}
