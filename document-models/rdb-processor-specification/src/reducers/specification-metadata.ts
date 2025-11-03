import type { RdbProcessorSpecificationSpecificationMetadataOperations } from "../../gen/specification-metadata/operations.js";

export const reducer: RdbProcessorSpecificationSpecificationMetadataOperations = {
    setSpecOperation(state, action) {
        if (action.input.name !== undefined) {
            state.name = action.input.name ?? null;
        }
        if (action.input.description !== undefined) {
            state.description = action.input.description ?? null;
        }
    }
};
