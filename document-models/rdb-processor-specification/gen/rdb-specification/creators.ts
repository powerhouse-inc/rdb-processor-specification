import { createAction } from "document-model/core";
import {
  z,
  type AddRdbTableInput,
  type UpdateTableNameInput,
  type DeleteRdbTableInput,
  type AddRdbColumnInput,
  type UpdateRdbColumnInput,
  type DeleteRdbColumnInput,
} from "../types.js";
import {
  type AddRdbTableAction,
  type UpdateTableNameAction,
  type DeleteRdbTableAction,
  type AddRdbColumnAction,
  type UpdateRdbColumnAction,
  type DeleteRdbColumnAction,
} from "./actions.js";

export const addRdbTable = (input: AddRdbTableInput) =>
  createAction<AddRdbTableAction>(
    "ADD_RDB_TABLE",
    { ...input },
    undefined,
    z.AddRdbTableInputSchema,
    "global",
  );

export const updateTableName = (input: UpdateTableNameInput) =>
  createAction<UpdateTableNameAction>(
    "UPDATE_TABLE_NAME",
    { ...input },
    undefined,
    z.UpdateTableNameInputSchema,
    "global",
  );

export const deleteRdbTable = (input: DeleteRdbTableInput) =>
  createAction<DeleteRdbTableAction>(
    "DELETE_RDB_TABLE",
    { ...input },
    undefined,
    z.DeleteRdbTableInputSchema,
    "global",
  );

export const addRdbColumn = (input: AddRdbColumnInput) =>
  createAction<AddRdbColumnAction>(
    "ADD_RDB_COLUMN",
    { ...input },
    undefined,
    z.AddRdbColumnInputSchema,
    "global",
  );

export const updateRdbColumn = (input: UpdateRdbColumnInput) =>
  createAction<UpdateRdbColumnAction>(
    "UPDATE_RDB_COLUMN",
    { ...input },
    undefined,
    z.UpdateRdbColumnInputSchema,
    "global",
  );

export const deleteRdbColumn = (input: DeleteRdbColumnInput) =>
  createAction<DeleteRdbColumnAction>(
    "DELETE_RDB_COLUMN",
    { ...input },
    undefined,
    z.DeleteRdbColumnInputSchema,
    "global",
  );
