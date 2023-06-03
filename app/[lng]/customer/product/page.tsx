import EnterpriseItem from "#/components/common/item/EnterpriseItem";
import ProductItem from "#/components/common/item/ProductItem";
import { getCookieByName } from "#/components/util/cookie";
import { getOneProduct } from "#/lib/api/apolloEndpoint";
import { BasePageProps } from "#/types/page";
import { ArrowDownIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default async function Page({ params: { lng } }: BasePageProps) {
  const accessToken = getCookieByName("accessToken")
  const { product} = await getOneProduct(accessToken!)

  return (
    <div className="w-full overflow-y-scroll">
      <Link href={"./product/example"}>
        Here is an example <ExternalLinkIcon className="w-4"/>
      </Link>
      <p>{product.name}</p>
      {/* <EnterpriseItem lng={lng} item={enterprise}/>  */}

    </div>
  )
}