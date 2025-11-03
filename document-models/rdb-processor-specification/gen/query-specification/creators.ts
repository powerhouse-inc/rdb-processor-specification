import { createAction } from "document-model/core";
import {
  z,
  type AddQuerySpecificationInput,
  type UpdateQuerySchemaInput,
  type UpdateQueryExampleInput,
  type DeleteQuerySpecificationInput,
  type AddQueryFilterParamInput,
  type UpdateFilterParamInput,
  type DeleteFilterParamInput,
  type SetQuerySpecNameInput,
} from "../types.js";
import {
  type AddQuerySpecificationAction,
  type UpdateQuerySchemaAction,
  type UpdateQueryExampleAction,
  type DeleteQuerySpecificationAction,
  type AddQueryFilterParamAction,
  type UpdateFilterParamAction,
  type DeleteFilterParamAction,
  type SetQuerySpecNameAction,
} from "./actions.js";

export const addQuerySpecification = (input: AddQuerySpecificationInput) =>
  createAction<AddQuerySpecificationAction>(
    "ADD_QUERY_SPECIFICATION",
    { ...input },
    undefined,
    z.AddQuerySpecificationInputSchema,
    "global",
  );

export const updateQuerySchema = (input: UpdateQuerySchemaInput) =>
  createAction<UpdateQuerySchemaAction>(
    "UPDATE_QUERY_SCHEMA",
    { ...input },
    undefined,
    z.UpdateQuerySchemaInputSchema,
    "global",
  );

export const updateQueryExample = (input: UpdateQueryExampleInput) =>
  createAction<UpdateQueryExampleAction>(
    "UPDATE_QUERY_EXAMPLE",
    { ...input },
    undefined,
    z.UpdateQueryExampleInputSchema,
    "global",
  );

export const deleteQuerySpecification = (
  input: DeleteQuerySpecificationInput,
) =>
  createAction<DeleteQuerySpecificationAction>(
    "DELETE_QUERY_SPECIFICATION",
    { ...input },
    undefined,
    z.DeleteQuerySpecificationInputSchema,
    "global",
  );

export const addQueryFilterParam = (input: AddQueryFilterParamInput) =>
  createAction<AddQueryFilterParamAction>(
    "ADD_QUERY_FILTER_PARAM",
    { ...input },
    undefined,
    z.AddQueryFilterParamInputSchema,
    "global",
  );

export const updateFilterParam = (input: UpdateFilterParamInput) =>
  createAction<UpdateFilterParamAction>(
    "UPDATE_FILTER_PARAM",
    { ...input },
    undefined,
    z.UpdateFilterParamInputSchema,
    "global",
  );

export const deleteFilterParam = (input: DeleteFilterParamInput) =>
  createAction<DeleteFilterParamAction>(
    "DELETE_FILTER_PARAM",
    { ...input },
    undefined,
    z.DeleteFilterParamInputSchema,
    "global",
  );

export const setQuerySpecName = (input: SetQuerySpecNameInput) =>
  createAction<SetQuerySpecNameAction>(
    "SET_QUERY_SPEC_NAME",
    { ...input },
    undefined,
    z.SetQuerySpecNameInputSchema,
    "global",
  );
