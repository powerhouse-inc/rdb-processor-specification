import { type Action } from "document-model";
import type {
  AddQuerySpecificationInput,
  UpdateQuerySchemaInput,
  UpdateQueryExampleInput,
  DeleteQuerySpecificationInput,
  AddQueryFilterParamInput,
  UpdateFilterParamInput,
  DeleteFilterParamInput,
  SetQuerySpecNameInput,
} from "../types.js";

export type AddQuerySpecificationAction = Action & {
  type: "ADD_QUERY_SPECIFICATION";
  input: AddQuerySpecificationInput;
};
export type UpdateQuerySchemaAction = Action & {
  type: "UPDATE_QUERY_SCHEMA";
  input: UpdateQuerySchemaInput;
};
export type UpdateQueryExampleAction = Action & {
  type: "UPDATE_QUERY_EXAMPLE";
  input: UpdateQueryExampleInput;
};
export type DeleteQuerySpecificationAction = Action & {
  type: "DELETE_QUERY_SPECIFICATION";
  input: DeleteQuerySpecificationInput;
};
export type AddQueryFilterParamAction = Action & {
  type: "ADD_QUERY_FILTER_PARAM";
  input: AddQueryFilterParamInput;
};
export type UpdateFilterParamAction = Action & {
  type: "UPDATE_FILTER_PARAM";
  input: UpdateFilterParamInput;
};
export type DeleteFilterParamAction = Action & {
  type: "DELETE_FILTER_PARAM";
  input: DeleteFilterParamInput;
};
export type SetQuerySpecNameAction = Action & {
  type: "SET_QUERY_SPEC_NAME";
  input: SetQuerySpecNameInput;
};

export type RdbProcessorSpecificationQuerySpecificationAction =
  | AddQuerySpecificationAction
  | UpdateQuerySchemaAction
  | UpdateQueryExampleAction
  | DeleteQuerySpecificationAction
  | AddQueryFilterParamAction
  | UpdateFilterParamAction
  | DeleteFilterParamAction
  | SetQuerySpecNameAction;
