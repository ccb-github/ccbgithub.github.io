import React from "react"

import MongoDbList  from "#/components/common/MongodbList"

import { toSchemaTypestring } from "#/lib/stringFactory"
import '#/styles/table.css'
import Link from "next/link"

type PageProps = {
	params: {
		type: string,
		id: string,
		lng: string
	}
	searchParams?: {
		[key: string]: string | string[] | undefined
	}
}


export default function Page({ params, searchParams }: PageProps) {
	const { type, lng } = params
	//TODO type of searchParams 
	return (
		<MongoDbList type={toSchemaTypestring(type)} filter={{ ...searchParams }}
			lng={lng} sortOption={{}} /> 
	)
}

