import type { PHDocument, PHBaseState } from "document-model";
import type { RdbProcessorSpecificationAction } from "./actions.js";
import type { RdbProcessorSpecificationState as RdbProcessorSpecificationGlobalState } from "./schema/types.js";

export { z } from "./schema/index.js";
export * from "./schema/types.js";
type RdbProcessorSpecificationLocalState = Record<PropertyKey, never>;
type RdbProcessorSpecificationPHState = PHBaseState & {
  global: RdbProcessorSpecificationGlobalState;
  local: RdbProcessorSpecificationLocalState;
};
type RdbProcessorSpecificationDocument =
  PHDocument<RdbProcessorSpecificationPHState>;

export type {
  RdbProcessorSpecificationGlobalState,
  RdbProcessorSpecificationLocalState,
  RdbProcessorSpecificationPHState,
  RdbProcessorSpecificationAction,
  RdbProcessorSpecificationDocument,
};
