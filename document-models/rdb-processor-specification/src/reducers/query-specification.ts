import type { RdbProcessorSpecificationQuerySpecificationOperations } from "../../gen/query-specification/operations.js";

export const reducer: RdbProcessorSpecificationQuerySpecificationOperations = {
    addQuerySpecificationOperation(state, action) {
        state.querySpecifications.push({
            id: action.input.id,
            name: "",
            querySchema: action.input.querySchema ?? null,
            queryExample: action.input.queryExample ?? null,
            filter: []
        });
    },
    updateQuerySchemaOperation(state, action) {
        const querySpecification = state.querySpecifications.find(q => q.id === action.input.id);
        if (querySpecification && action.input.querySchema !== undefined) {
            querySpecification.querySchema = action.input.querySchema ?? null;
        }
    },
    updateQueryExampleOperation(state, action) {
        const querySpecification = state.querySpecifications.find(q => q.id === action.input.id);
        if (querySpecification && action.input.queryExample !== undefined) {
            querySpecification.queryExample = action.input.queryExample ?? null;
        }
    },
    deleteQuerySpecificationOperation(state, action) {
        state.querySpecifications = state.querySpecifications.filter(q => q.id !== action.input.id);
    },
    addQueryFilterParamOperation(state, action) {
        const querySpecification = state.querySpecifications.find(q => q.id === action.input.querySpecId);
        if (querySpecification) {
            querySpecification.filter.push({
                id: action.input.id,
                name: action.input.name ?? null,
                type: action.input.type ?? null,
                optional: action.input.optional ?? false,
            });
        }
    },
    updateFilterParamOperation(state, action) {
        const querySpecification = state.querySpecifications.find(q => q.id === action.input.querySpecId);
        if (querySpecification) {
            const filterParam = querySpecification.filter.find(p => p.id === action.input.id);
            if (filterParam) {
                if (action.input.name !== undefined) {
                    filterParam.name = action.input.name ?? null;
                }
                if (action.input.type !== undefined) {
                    filterParam.type = action.input.type ?? null;
                }
                if (action.input.optional !== undefined) {
                    filterParam.optional = action.input.optional ?? false;
                }
            }
        }
    },
    deleteFilterParamOperation(state, action) {
        const querySpecification = state.querySpecifications.find(q => q.id === action.input.querySpecId);
        if (querySpecification) {
            querySpecification.filter = querySpecification.filter.filter(p => p.id !== action.input.id);
        }
    },
    setQuerySpecNameOperation(state, action) {
        const querySpecification = state.querySpecifications.find(q => q.id === action.input.querySpecId);
        if (querySpecification) {
            if (action.input.name !== undefined) {
                querySpecification.name = action.input.name ?? null;
            }
        }
    }
};
