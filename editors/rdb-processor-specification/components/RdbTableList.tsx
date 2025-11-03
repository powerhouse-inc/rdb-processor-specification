import { Icon } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { generateId } from "document-model/core";
import * as creators from "../../../document-models/rdb-processor-specification/gen/rdb-specification/creators.js";
import type { RdbTable } from "../../../document-models/rdb-processor-specification/gen/types.js";
import type { RdbProcessorSpecificationAction } from "../../../document-models/rdb-processor-specification/gen/actions.js";
import { RdbTableCard } from "./RdbTableCard.js";

interface RdbTableListProps {
  rdbTables: RdbTable[];
  dispatch: (action: RdbProcessorSpecificationAction) => void;
}

export function RdbTableList({ rdbTables, dispatch }: RdbTableListProps) {
  const handleAddTable = () => {
    const id = generateId();
    dispatch(creators.addRdbTable({
      id,
      name: null,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">RDB Tables</h2>
        <Button
          onClick={handleAddTable}
          className="inline-flex items-center gap-2 px-4 py-2"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Add Table
        </Button>
      </div>

      {rdbTables.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Icon name="BarChart" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No RDB Tables Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first table to define the relational database schema.
          </p>
          <Button
            onClick={handleAddTable}
            className="inline-flex items-center gap-2"
          >
            <Icon name="Plus" className="w-4 h-4" />
            Add Table
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {rdbTables.map((table) => (
            <RdbTableCard
              key={table.id}
              table={table}
              dispatch={dispatch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
