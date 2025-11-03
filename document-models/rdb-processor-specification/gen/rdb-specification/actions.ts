import { type Action } from "document-model";
import type {
  AddRdbTableInput,
  UpdateTableNameInput,
  DeleteRdbTableInput,
  AddRdbColumnInput,
  UpdateRdbColumnInput,
  DeleteRdbColumnInput,
} from "../types.js";

export type AddRdbTableAction = Action & {
  type: "ADD_RDB_TABLE";
  input: AddRdbTableInput;
};
export type UpdateTableNameAction = Action & {
  type: "UPDATE_TABLE_NAME";
  input: UpdateTableNameInput;
};
export type DeleteRdbTableAction = Action & {
  type: "DELETE_RDB_TABLE";
  input: DeleteRdbTableInput;
};
export type AddRdbColumnAction = Action & {
  type: "ADD_RDB_COLUMN";
  input: AddRdbColumnInput;
};
export type UpdateRdbColumnAction = Action & {
  type: "UPDATE_RDB_COLUMN";
  input: UpdateRdbColumnInput;
};
export type DeleteRdbColumnAction = Action & {
  type: "DELETE_RDB_COLUMN";
  input: DeleteRdbColumnInput;
};

export type RdbProcessorSpecificationRdbSpecificationAction =
  | AddRdbTableAction
  | UpdateTableNameAction
  | DeleteRdbTableAction
  | AddRdbColumnAction
  | UpdateRdbColumnAction
  | DeleteRdbColumnAction;
