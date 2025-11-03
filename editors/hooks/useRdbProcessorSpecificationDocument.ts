import {
  useDocumentOfType,
  useSelectedDocumentOfType,
} from "@powerhousedao/reactor-browser";
import type {
  RdbProcessorSpecificationAction,
  RdbProcessorSpecificationDocument,
} from "../../document-models/rdb-processor-specification/index.js";

export function useRdbProcessorSpecificationDocument(
  documentId: string | null | undefined,
) {
  return useDocumentOfType<
    RdbProcessorSpecificationDocument,
    RdbProcessorSpecificationAction
  >(documentId, "powerhouse/rdb-processor-specification");
}

export function useSelectedRdbProcessorSpecificationDocument() {
  return useSelectedDocumentOfType<
    RdbProcessorSpecificationDocument,
    RdbProcessorSpecificationAction
  >("powerhouse/rdb-processor-specification");
}
