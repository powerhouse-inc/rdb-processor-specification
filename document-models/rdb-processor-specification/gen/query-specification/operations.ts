import { type SignalDispatch } from "document-model";
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
import { type RdbProcessorSpecificationState } from "../types.js";

export interface RdbProcessorSpecificationQuerySpecificationOperations {
  addQuerySpecificationOperation: (
    state: RdbProcessorSpecificationState,
    action: AddQuerySpecificationAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateQuerySchemaOperation: (
    state: RdbProcessorSpecificationState,
    action: UpdateQuerySchemaAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateQueryExampleOperation: (
    state: RdbProcessorSpecificationState,
    action: UpdateQueryExampleAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteQuerySpecificationOperation: (
    state: RdbProcessorSpecificationState,
    action: DeleteQuerySpecificationAction,
    dispatch?: SignalDispatch,
  ) => void;
  addQueryFilterParamOperation: (
    state: RdbProcessorSpecificationState,
    action: AddQueryFilterParamAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateFilterParamOperation: (
    state: RdbProcessorSpecificationState,
    action: UpdateFilterParamAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteFilterParamOperation: (
    state: RdbProcessorSpecificationState,
    action: DeleteFilterParamAction,
    dispatch?: SignalDispatch,
  ) => void;
  setQuerySpecNameOperation: (
    state: RdbProcessorSpecificationState,
    action: SetQuerySpecNameAction,
    dispatch?: SignalDispatch,
  ) => void;
}
