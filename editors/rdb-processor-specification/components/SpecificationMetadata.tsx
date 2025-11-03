import { TextInput, Textarea } from "@powerhousedao/document-engineering";
import * as creators from "../../../document-models/rdb-processor-specification/gen/specification-metadata/creators.js";
import type { RdbProcessorSpecificationState } from "../../../document-models/rdb-processor-specification/gen/types.js";
import type { RdbProcessorSpecificationAction } from "../../../document-models/rdb-processor-specification/gen/actions.js";

interface SpecificationMetadataProps {
  state: RdbProcessorSpecificationState;
  dispatch: (action: RdbProcessorSpecificationAction) => void;
}

export function SpecificationMetadata({ state, dispatch }: SpecificationMetadataProps) {
  const handleNameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.value.trim();
    if (name !== (state.name || "")) {
      dispatch(creators.setSpec({ name: name || null }));
    }
  };

  const handleDescriptionChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const description = e.target.value.trim();
    if (description !== (state.description || "")) {
      dispatch(creators.setSpec({ description: description || null }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>

        <div>
          <TextInput
            label="Name"
            defaultValue={state.name || ""}
            onBlur={handleNameChange}
            placeholder="Enter specification name"
            className="w-full"
          />
        </div>

        <div>
          <Textarea
            label="Description"
            defaultValue={state.description || ""}
            onBlur={handleDescriptionChange}
            placeholder="Enter specification description"
            className="w-full"
            rows={4}
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Statistics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">RDB Tables:</span>
            <span className="ml-2 font-medium">{state.rdbSpecification.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Query Specifications:</span>
            <span className="ml-2 font-medium">{state.querySpecifications.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}