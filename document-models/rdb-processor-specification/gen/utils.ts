import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model/core";
import type {
  RdbProcessorSpecificationGlobalState,
  RdbProcessorSpecificationLocalState,
} from "./types.js";
import type { RdbProcessorSpecificationPHState } from "./types.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: RdbProcessorSpecificationGlobalState = {
  name: null,
  description: null,
  querySpecifications: [],
  rdbSpecification: [],
};
export const initialLocalState: RdbProcessorSpecificationLocalState = {};

const utils: DocumentModelUtils<RdbProcessorSpecificationPHState> = {
  fileExtension: ".phdm",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = "powerhouse/rdb-processor-specification";

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
};

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromInput = utils.loadFromInput;

export default utils;
