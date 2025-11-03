export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Upload: { input: File; output: File };
};

export type AddQueryFilterParamInput = {
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  optional: Scalars["Boolean"]["input"];
  querySpecId: Scalars["OID"]["input"];
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddQuerySpecificationInput = {
  id: Scalars["OID"]["input"];
  queryExample?: InputMaybe<Scalars["String"]["input"]>;
  querySchema?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddRdbColumnInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  primaryKey: Scalars["Boolean"]["input"];
  sourceDocModel?: InputMaybe<Scalars["String"]["input"]>;
  sourceProperty?: InputMaybe<Scalars["String"]["input"]>;
  tableId: Scalars["OID"]["input"];
  type: RdbColumnType | `${RdbColumnType}`;
};

export type AddRdbTableInput = {
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeleteFilterParamInput = {
  id: Scalars["OID"]["input"];
  querySpecId: Scalars["OID"]["input"];
};

export type DeleteQuerySpecificationInput = {
  id: Scalars["OID"]["input"];
};

export type DeleteRdbColumnInput = {
  id: Scalars["OID"]["input"];
  tableId: Scalars["OID"]["input"];
};

export type DeleteRdbTableInput = {
  id: Scalars["OID"]["input"];
};

export type QueryFilterParam = {
  id: Scalars["OID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
  optional: Scalars["Boolean"]["output"];
  type: Maybe<Scalars["String"]["output"]>;
};

export type QuerySpecification = {
  filter: Array<QueryFilterParam>;
  id: Scalars["OID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
  queryExample: Maybe<Scalars["String"]["output"]>;
  querySchema: Maybe<Scalars["String"]["output"]>;
};

export type RdbColumn = {
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
  primaryKey: Scalars["Boolean"]["output"];
  sourceDocModel: Maybe<Scalars["String"]["output"]>;
  sourceProperty: Maybe<Scalars["String"]["output"]>;
  type: RdbColumnType | `${RdbColumnType}`;
};

export type RdbColumnType =
  | "Boolean"
  | "Date"
  | "DateTime"
  | "Float"
  | "Int"
  | "String"
  | "Text";

export type RdbColumnTypeInput =
  | "Boolean"
  | "Date"
  | "DateTime"
  | "Float"
  | "Int"
  | "String"
  | "Text";

export type RdbProcessorSpecificationState = {
  description: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
  querySpecifications: Array<QuerySpecification>;
  rdbSpecification: Array<RdbTable>;
};

export type RdbTable = {
  columns: Array<RdbColumn>;
  id: Scalars["OID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
};

export type SetQuerySpecNameInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  querySpecId: Scalars["OID"]["input"];
};

export type SetSpecInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateFilterParamInput = {
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  optional?: InputMaybe<Scalars["Boolean"]["input"]>;
  querySpecId: Scalars["OID"]["input"];
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateQueryExampleInput = {
  id: Scalars["OID"]["input"];
  queryExample?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateQuerySchemaInput = {
  id: Scalars["OID"]["input"];
  querySchema?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateRdbColumnInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  primaryKey?: InputMaybe<Scalars["Boolean"]["input"]>;
  sourceDocModel?: InputMaybe<Scalars["String"]["input"]>;
  sourceProperty?: InputMaybe<Scalars["String"]["input"]>;
  tableId: Scalars["OID"]["input"];
  type?: InputMaybe<RdbColumnTypeInput | `${RdbColumnTypeInput}`>;
};

export type UpdateTableNameInput = {
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};
