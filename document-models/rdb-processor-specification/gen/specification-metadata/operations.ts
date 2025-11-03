import { type SignalDispatch } from "document-model";
import { type SetSpecAction } from "./actions.js";
import { type RdbProcessorSpecificationState } from "../types.js";

export interface RdbProcessorSpecificationSpecificationMetadataOperations {
  setSpecOperation: (
    state: RdbProcessorSpecificationState,
    action: SetSpecAction,
    dispatch?: SignalDispatch,
  ) => void;
}
