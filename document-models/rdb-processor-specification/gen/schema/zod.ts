import { z } from "zod";
import type {
  AddQueryFilterParamInput,
  AddQuerySpecificationInput,
  AddRdbColumnInput,
  AddRdbTableInput,
  DeleteFilterParamInput,
  DeleteQuerySpecificationInput,
  DeleteRdbColumnInput,
  DeleteRdbTableInput,
  QueryFilterParam,
  QuerySpecification,
  RdbColumn,
  RdbColumnType,
  RdbColumnTypeInput,
  RdbProcessorSpecificationState,
  RdbTable,
  SetQuerySpecNameInput,
  SetSpecInput,
  UpdateFilterParamInput,
  UpdateQueryExampleInput,
  UpdateQuerySchemaInput,
  UpdateRdbColumnInput,
  UpdateTableNameInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const RdbColumnTypeSchema = z.enum([
  "Boolean",
  "Date",
  "DateTime",
  "Float",
  "Int",
  "String",
  "Text",
]);

export const RdbColumnTypeInputSchema = z.enum([
  "Boolean",
  "Date",
  "DateTime",
  "Float",
  "Int",
  "String",
  "Text",
]);

export function AddQueryFilterParamInputSchema(): z.ZodObject<
  Properties<AddQueryFilterParamInput>
> {
  return z.object({
    id: z.string(),
    name: z.string().nullish(),
    optional: z.boolean(),
    querySpecId: z.string(),
    type: z.string().nullish(),
  });
}

export function AddQuerySpecificationInputSchema(): z.ZodObject<
  Properties<AddQuerySpecificationInput>
> {
  return z.object({
    id: z.string(),
    queryExample: z.string().nullish(),
    querySchema: z.string().nullish(),
  });
}

export function AddRdbColumnInputSchema(): z.ZodObject<
  Properties<AddRdbColumnInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
    primaryKey: z.boolean(),
    sourceDocModel: z.string().nullish(),
    sourceProperty: z.string().nullish(),
    tableId: z.string(),
    type: RdbColumnTypeSchema,
  });
}

export function AddRdbTableInputSchema(): z.ZodObject<
  Properties<AddRdbTableInput>
> {
  return z.object({
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function DeleteFilterParamInputSchema(): z.ZodObject<
  Properties<DeleteFilterParamInput>
> {
  return z.object({
    id: z.string(),
    querySpecId: z.string(),
  });
}

export function DeleteQuerySpecificationInputSchema(): z.ZodObject<
  Properties<DeleteQuerySpecificationInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function DeleteRdbColumnInputSchema(): z.ZodObject<
  Properties<DeleteRdbColumnInput>
> {
  return z.object({
    id: z.string(),
    tableId: z.string(),
  });
}

export function DeleteRdbTableInputSchema(): z.ZodObject<
  Properties<DeleteRdbTableInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function QueryFilterParamSchema(): z.ZodObject<
  Properties<QueryFilterParam>
> {
  return z.object({
    __typename: z.literal("QueryFilterParam").optional(),
    id: z.string(),
    name: z.string().nullable(),
    optional: z.boolean(),
    type: z.string().nullable(),
  });
}

export function QuerySpecificationSchema(): z.ZodObject<
  Properties<QuerySpecification>
> {
  return z.object({
    __typename: z.literal("QuerySpecification").optional(),
    filter: z.array(QueryFilterParamSchema()),
    id: z.string(),
    name: z.string().nullable(),
    queryExample: z.string().nullable(),
    querySchema: z.string().nullable(),
  });
}

export function RdbColumnSchema(): z.ZodObject<Properties<RdbColumn>> {
  return z.object({
    __typename: z.literal("RdbColumn").optional(),
    description: z.string().nullable(),
    id: z.string(),
    name: z.string().nullable(),
    primaryKey: z.boolean(),
    sourceDocModel: z.string().nullable(),
    sourceProperty: z.string().nullable(),
    type: RdbColumnTypeSchema,
  });
}

export function RdbProcessorSpecificationStateSchema(): z.ZodObject<
  Properties<RdbProcessorSpecificationState>
> {
  return z.object({
    __typename: z.literal("RdbProcessorSpecificationState").optional(),
    description: z.string().nullable(),
    name: z.string().nullable(),
    querySpecifications: z.array(QuerySpecificationSchema()),
    rdbSpecification: z.array(RdbTableSchema()),
  });
}

export function RdbTableSchema(): z.ZodObject<Properties<RdbTable>> {
  return z.object({
    __typename: z.literal("RdbTable").optional(),
    columns: z.array(RdbColumnSchema()),
    id: z.string(),
    name: z.string().nullable(),
  });
}

export function SetQuerySpecNameInputSchema(): z.ZodObject<
  Properties<SetQuerySpecNameInput>
> {
  return z.object({
    name: z.string().nullish(),
    querySpecId: z.string(),
  });
}

export function SetSpecInputSchema(): z.ZodObject<Properties<SetSpecInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string().nullish(),
  });
}

export function UpdateFilterParamInputSchema(): z.ZodObject<
  Properties<UpdateFilterParamInput>
> {
  return z.object({
    id: z.string(),
    name: z.string().nullish(),
    optional: z.boolean().nullish(),
    querySpecId: z.string(),
    type: z.string().nullish(),
  });
}

export function UpdateQueryExampleInputSchema(): z.ZodObject<
  Properties<UpdateQueryExampleInput>
> {
  return z.object({
    id: z.string(),
    queryExample: z.string().nullish(),
  });
}

export function UpdateQuerySchemaInputSchema(): z.ZodObject<
  Properties<UpdateQuerySchemaInput>
> {
  return z.object({
    id: z.string(),
    querySchema: z.string().nullish(),
  });
}

export function UpdateRdbColumnInputSchema(): z.ZodObject<
  Properties<UpdateRdbColumnInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
    primaryKey: z.boolean().nullish(),
    sourceDocModel: z.string().nullish(),
    sourceProperty: z.string().nullish(),
    tableId: z.string(),
    type: z.lazy(() => RdbColumnTypeInputSchema.nullish()),
  });
}

export function UpdateTableNameInputSchema(): z.ZodObject<
  Properties<UpdateTableNameInput>
> {
  return z.object({
    id: z.string(),
    name: z.string().nullish(),
  });
}
