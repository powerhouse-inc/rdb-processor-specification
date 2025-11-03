import { type Action } from "document-model";
import type { SetSpecInput } from "../types.js";

export type SetSpecAction = Action & { type: "SET_SPEC"; input: SetSpecInput };

export type RdbProcessorSpecificationSpecificationMetadataAction =
  SetSpecAction;
