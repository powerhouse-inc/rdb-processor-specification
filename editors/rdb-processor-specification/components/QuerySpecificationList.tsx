import { Icon, Textarea } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { generateId } from "document-model/core";
import { useState } from "react";
import * as creators from "../../../document-models/rdb-processor-specification/gen/query-specification/creators.js";
import type { QuerySpecification } from "../../../document-models/rdb-processor-specification/gen/types.js";
import type { RdbProcessorSpecificationAction } from "../../../document-models/rdb-processor-specification/gen/actions.js";
import { QuerySpecificationCard } from "./QuerySpecificationCard.js";

interface QuerySpecificationListProps {
  querySpecifications: QuerySpecification[];
  dispatch: (action: RdbProcessorSpecificationAction) => void;
}

export function QuerySpecificationList({
  querySpecifications,
  dispatch,
}: QuerySpecificationListProps) {
  const handleAddQuery = () => {
    const id = generateId();
    dispatch(creators.addQuerySpecification({
      id,
      querySchema: null,
      queryExample: null,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Query Specifications</h2>
        <Button
          onClick={handleAddQuery}
          className="inline-flex items-center gap-2 px-4 py-2"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Add Query
        </Button>
      </div>

      {querySpecifications.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Icon name="Search" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No Query Specifications Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first query specification to define how data should be queried.
          </p>
          <Button
            onClick={handleAddQuery}
            className="inline-flex items-center gap-2"
          >
            <Icon name="Plus" className="w-4 h-4" />
            Add Query Specification
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {querySpecifications.map((querySpec) => (
            <QuerySpecificationCard
              key={querySpec.id}
              querySpec={querySpec}
              dispatch={dispatch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
