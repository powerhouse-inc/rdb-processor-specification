import { type SignalDispatch } from "document-model";
import {
  type AddRdbTableAction,
  type UpdateTableNameAction,
  type DeleteRdbTableAction,
  type AddRdbColumnAction,
  type UpdateRdbColumnAction,
  type DeleteRdbColumnAction,
} from "./actions.js";
import { type RdbProcessorSpecificationState } from "../types.js";

export interface RdbProcessorSpecificationRdbSpecificationOperations {
  addRdbTableOperation: (
    state: RdbProcessorSpecificationState,
    action: AddRdbTableAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTableNameOperation: (
    state: RdbProcessorSpecificationState,
    action: UpdateTableNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteRdbTableOperation: (
    state: RdbProcessorSpecificationState,
    action: DeleteRdbTableAction,
    dispatch?: SignalDispatch,
  ) => void;
  addRdbColumnOperation: (
    state: RdbProcessorSpecificationState,
    action: AddRdbColumnAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateRdbColumnOperation: (
    state: RdbProcessorSpecificationState,
    action: UpdateRdbColumnAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteRdbColumnOperation: (
    state: RdbProcessorSpecificationState,
    action: DeleteRdbColumnAction,
    dispatch?: SignalDispatch,
  ) => void;
}
