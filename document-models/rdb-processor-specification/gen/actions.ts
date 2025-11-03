import type { RdbProcessorSpecificationSpecificationMetadataAction } from "./specification-metadata/actions.js";
import type { RdbProcessorSpecificationQuerySpecificationAction } from "./query-specification/actions.js";
import type { RdbProcessorSpecificationRdbSpecificationAction } from "./rdb-specification/actions.js";

export * from "./specification-metadata/actions.js";
export * from "./query-specification/actions.js";
export * from "./rdb-specification/actions.js";

export type RdbProcessorSpecificationAction =
  | RdbProcessorSpecificationSpecificationMetadataAction
  | RdbProcessorSpecificationQuerySpecificationAction
  | RdbProcessorSpecificationRdbSpecificationAction;
