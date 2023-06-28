
import ReactTable from "#/components/common/ReactTable";
import { getCookieByName } from "#/components/util/cookie";
import { useApp } from "#/hooks/useApp";
import { getAllEnterprise } from "#/lib/api/apolloEndpoint";
import { schemaJson } from "#/lib/schema";
import { BasePageProps } from "#/types/page";
import { cookies } from "next/headers";
import { useEffect, useRef, useState } from "react";
import { BSON } from "realm-web";

function TypeSign({
  text,
  children,
  className
}: {
  text: string,
  children?: React.ReactNode;
  className?: string
}) {
  return (
    <span
      className={`
        inline-flex space-x-2 rounded-lg bg-gray-700 
        px-3 py-1 text-sm font-medium 
      text-gray-100 hover:bg-gray-500 hover:text-white
        ${className || ''}
      `}>
      {text}
      {children}
      {/* <ArrowRightIcon className="block w-4" /> */}
    </span>
  );
};

export default async function AdminEnterpriseManagePage({params: {lng}}: BasePageProps) {
    //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
    const schemaType = "Enterprise"
    const accessToken = getCookieByName("accessToken")
    const { enterprises } = await getAllEnterprise()
    
    return (
      <div
        id="data-table"
        className="h-full w-full overflow-x-scroll overflow-y-scroll"
      >
        <ReactTable
          lng={lng}
          data={enterprises}
          schemaType={"Enterprise"}
          columnList={[
            "name",
            "address",
            "createdAt",
            "creditCode",
            "registerPlace",
          ]}
          deleteEnabled={true}
        />
      </div>
    );
  }



