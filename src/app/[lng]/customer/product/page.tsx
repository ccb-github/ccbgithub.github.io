import { getEnterprise } from "#/lib/api/ApolloEndpoint";
import EnterpriseItem from "#/components/common/item/EnterpriseItem";
import ProductItem from "#/components/common/item/ProductItem";
import { BasePageProps } from "#/types/page";
import { ArrowDownIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default async function Page({ params: { lng } }: BasePageProps) {

  return (
    <div className="w-full overflow-y-scroll">
      <Link href={"./product/example"}>
        Here is an example <ExternalLinkIcon className="w-4"/>
      </Link>
      
      {/* <EnterpriseItem lng={lng} item={enterprise}/>  */}

    </div>
  )
}