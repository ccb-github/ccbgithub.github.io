import ApolloCookieWrapper from "#/components/ApolloCookieWrapper"
import "#/styles/global.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: {
    lng: string
  }
}) {
  return (
    <html lang={lng}>
      <body className={inter.className}>
        {/* <ConfirmContextProvider> */}
        <ApolloCookieWrapper>
          {/* <ConfirmDialog
              lng={lng}
              closeAction={async () => {
                "use server";
                console.log("Confirm dialog closed");
              }}
              confirmAction={async () => {
                "use server"
                console.log("Confirm dialog confirmed");
              }}
            /> */}
          {children}
        </ApolloCookieWrapper>
        {/* </ConfirmContextProvider> */}
      </body>
    </html>
  )
}
