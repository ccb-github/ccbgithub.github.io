import { BSON } from "realm-web";
//TODO with different shape
export interface SchemaPropties {
  min?: number;
	name: string;
  optional: boolean;
	type: PropType;
	indexed: boolean;
	mapTo: string;
	objectType?: string;
}
//TODO keep two field exclusive
type PropType =
  | 'double'
  | 'int'
  | 'objectType'
  | 'string'
  | 'objectId'
  | 'object'
  | 'date'
  | 'list'
  | 'uuid'
  | 'bool'

export type SchemaName = 'Enterprise' | 'Order' | 'Product' | "Checker" | "Regulatory" | "Catgory"
export interface SchemaObject {
	name: SchemaName,
	primaryKey?: string,
	embedded: boolean,
	properties: {
	    _id: SchemaPropties;
		[key: string] : SchemaPropties
	}
}

export type SchemaJson = {
	[key in SchemaName]: SchemaObject;
};

type Email = string

export type SchemaResultMapper = {
	Enterprise: {
		_id: BSON.ObjectID;
		address: string;
		createdAt: Date;
		creditCode: string;
		description: string;
		email: Email;
		name: string;
		registerPlace: string;
		tradeMark: string
	},
	Product : {
		_id: BSON.ObjectID;
	},
	Checker: {
		_id: BSON.ObjectID;
	},
	Catgory: {
		_id: BSON.ObjectID;
	}
	Regulatory: {
		_id: BSON.ObjectID;
	}
	Order: {
		_id: BSON.ObjectID;
	}
}
export type SearchResultMap = Map<string, SchemaName | SchemaResultMapper[SchemaName]>
// export namespace DBResult {
// 	type Enterprise = {
// 		_id: BSON.ObjectID;
// 		address: string;
// 		createdAt: Date;
// 		creditCode: string;
// 		description: string;
// 		email: Email;
// 		name: string;
// 		registerPlace: string;
// 		tradeMark: string
// 	}
// }