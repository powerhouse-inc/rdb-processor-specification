/**
 * Factory methods for creating RdbProcessorSpecificationDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  RdbProcessorSpecificationDocument,
  RdbProcessorSpecificationLocalState,
  RdbProcessorSpecificationGlobalState,
  RdbProcessorSpecificationPHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): RdbProcessorSpecificationGlobalState {
  return {
    name: null,
    description: null,
    querySpecifications: [],
    rdbSpecification: [],
  };
}

export function defaultLocalState(): RdbProcessorSpecificationLocalState {
  return {};
}

export function defaultPHState(): RdbProcessorSpecificationPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<RdbProcessorSpecificationGlobalState>,
): RdbProcessorSpecificationGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as RdbProcessorSpecificationGlobalState;
}

export function createLocalState(
  state?: Partial<RdbProcessorSpecificationLocalState>,
): RdbProcessorSpecificationLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as RdbProcessorSpecificationLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<RdbProcessorSpecificationGlobalState>,
  localState?: Partial<RdbProcessorSpecificationLocalState>,
): RdbProcessorSpecificationPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a RdbProcessorSpecificationDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createRdbProcessorSpecificationDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<RdbProcessorSpecificationGlobalState>;
    local?: Partial<RdbProcessorSpecificationLocalState>;
  }>,
): RdbProcessorSpecificationDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
