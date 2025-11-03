import type { RdbProcessorSpecificationRdbSpecificationOperations } from "../../gen/rdb-specification/operations.js";

export const reducer: RdbProcessorSpecificationRdbSpecificationOperations = {
    addRdbTableOperation(state, action) {
        state.rdbSpecification.push({
            id: action.input.id,
            name: action.input.name ?? null,
            columns: []
        });
    },
    updateTableNameOperation(state, action) {
        const table = state.rdbSpecification.find(r => r.id === action.input.id);
        if (table && action.input.name !== undefined) {
            table.name = action.input.name ?? null;
        }
    },
    deleteRdbTableOperation(state, action) {
        state.rdbSpecification = state.rdbSpecification.filter(r => r.id !== action.input.id);
    },
    addRdbColumnOperation(state, action) {
        const table = state.rdbSpecification.find(r => r.id === action.input.tableId);
        if (table) {
            table.columns.push({
                id: action.input.id,
                name: action.input.name ?? null,
                type: action.input.type ?? null,
                description: action.input.description ?? null,
                sourceDocModel: action.input.sourceDocModel ?? null,
                sourceProperty: action.input.sourceProperty ?? null,
                primaryKey: action.input.primaryKey ?? false,
            });
        }
    },
    updateRdbColumnOperation(state, action) {
        const table = state.rdbSpecification.find(r => r.id === action.input.tableId);
        if (table) {
            const column = table.columns.find(c => c.id === action.input.id);
            if (column) {
                if (action.input.name !== undefined) {
                    column.name = action.input.name ?? null;
                }
                if (action.input.type !== undefined) {
                    column.type = action.input.type ?? "String";
                }
                if (action.input.description !== undefined) {
                    column.description = action.input.description ?? null;
                }
                if (action.input.sourceDocModel !== undefined) {
                    column.sourceDocModel = action.input.sourceDocModel ?? null;
                }
                if (action.input.sourceProperty !== undefined) {
                    column.sourceProperty = action.input.sourceProperty ?? null;
                }
                if (action.input.primaryKey !== undefined) {
                    column.primaryKey = action.input.primaryKey ?? false;
                }
            }
        }
    },
    deleteRdbColumnOperation(state, action) {
        const table = state.rdbSpecification.find(r => r.id === action.input.tableId);
        if (table) {
            table.columns = table.columns.filter(c => c.id !== action.input.id);
        }
    }
};
