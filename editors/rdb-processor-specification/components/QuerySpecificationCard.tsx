import { Icon, Textarea } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { generateId } from "document-model/core";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import * as creators from "../../../document-models/rdb-processor-specification/gen/query-specification/creators.js";
import type { QuerySpecification, QueryFilterParam } from "../../../document-models/rdb-processor-specification/gen/types.js";
import type { RdbProcessorSpecificationAction } from "../../../document-models/rdb-processor-specification/gen/actions.js";

interface QuerySpecificationCardProps {
  querySpec: QuerySpecification;
  dispatch: (action: RdbProcessorSpecificationAction) => void;
}

export function QuerySpecificationCard({ querySpec, dispatch }: QuerySpecificationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [querySchema, setQuerySchema] = useState(querySpec.querySchema || "");
  const [queryExample, setQueryExample] = useState(querySpec.queryExample || "");
  const [isEditingName, setIsEditingName] = useState(false);
  const [localName, setLocalName] = useState(querySpec.name || "");

  // Sync state when querySpec changes
  useEffect(() => {
    setQuerySchema(querySpec.querySchema || "");
    setQueryExample(querySpec.queryExample || "");
    if (!isEditingName) {
      setLocalName(querySpec.name || "");
    }
  }, [querySpec.querySchema, querySpec.queryExample, querySpec.name, isEditingName]);

  // Debounced save handlers
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmedValue = querySchema.trim();
      if (trimmedValue !== (querySpec.querySchema || "")) {
        dispatch(creators.updateQuerySchema({ id: querySpec.id, querySchema: trimmedValue || null }));
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [querySchema, querySpec.id, querySpec.querySchema, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmedValue = queryExample.trim();
      if (trimmedValue !== (querySpec.queryExample || "")) {
        dispatch(creators.updateQueryExample({ id: querySpec.id, queryExample: trimmedValue || null }));
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [queryExample, querySpec.id, querySpec.queryExample, dispatch]);

  const handleDeleteQuery = () => {
    if (confirm("Are you sure you want to delete this query specification?")) {
      dispatch(creators.deleteQuerySpecification({ id: querySpec.id }));
    }
  };

  const handleAddFilterParam = () => {
    const id = generateId();
    dispatch(creators.addQueryFilterParam({
      querySpecId: querySpec.id,
      id,
      name: null,
      type: null,
      optional: false,
    }));
  };

  const handleUpdateFilterParam = (paramId: string, field: keyof QueryFilterParam, value: string | boolean | null) => {
    dispatch(creators.updateFilterParam({
      querySpecId: querySpec.id,
      id: paramId,
      [field]: value,
    }));
  };

  const handleDeleteFilterParam = (paramId: string) => {
    dispatch(creators.deleteFilterParam({
      querySpecId: querySpec.id,
      id: paramId,
    }));
  };

  const saveName = () => {
    const trimmedName = localName.trim();
    const currentName = querySpec.name || "";
    
    if (trimmedName !== currentName) {
      dispatch(creators.setQuerySpecName({
        querySpecId: querySpec.id,
        name: trimmedName || null,
      }));
    }
    setIsEditingName(false);
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    saveName();
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      saveName();
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setLocalName(querySpec.name || "");
      setIsEditingName(false);
    }
  };

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingName(true);
  };

  const handleSchemaChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    if (value !== (querySpec.querySchema || "")) {
      dispatch(creators.updateQuerySchema({ id: querySpec.id, querySchema: value || null }));
    }
  };

  const handleExampleChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    if (value !== (querySpec.queryExample || "")) {
      dispatch(creators.updateQueryExample({ id: querySpec.id, queryExample: value || null }));
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 group">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
            <div className="flex-1" onClick={(e) => e.stopPropagation()}>
              {isEditingName ? (
                <input
                  type="text"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  onBlur={handleNameBlur}
                  onKeyDown={handleNameKeyDown}
                  onMouseDown={(e) => e.stopPropagation()}
                  autoFocus
                  className="font-medium text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-600 w-full"
                  placeholder="Untitled Query"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <h4
                    className="font-medium text-gray-900 cursor-text hover:text-blue-600 flex-1"
                    onClick={handleNameClick}
                  >
                    {querySpec.name || "Untitled Query"}
                  </h4>
                  <button
                    onClick={handleNameClick}
                    className="text-gray-400 hover:text-blue-600 p-1 transition-colors"
                    title="Edit name"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-sm text-gray-500">
                {querySpec.filter.length} filter parameter{querySpec.filter.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteQuery();
            }}
            className="text-gray-400 hover:text-red-600 p-1 bg-transparent border-none"
            title="Delete query specification"
          >
            <Icon name="Trash" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Textarea
                label="Query Schema"
                defaultValue={querySchema}
                onChange={(e) => setQuerySchema(e.target.value)}
                onBlur={handleSchemaChange}
                placeholder="# Enter GraphQL schema definition here&#10;# Example:&#10;# type Query {&#10;#   hello: String&#10;# }"
                className="w-full font-mono text-sm"
                rows={12}
              />
            </div>

            <div>
              <Textarea
                label="Query Example"
                defaultValue={queryExample}
                onChange={(e) => setQueryExample(e.target.value)}
                onBlur={handleExampleChange}
                placeholder="# Enter example GraphQL query here&#10;# Example:&#10;# query {&#10;#   hello&#10;# }"
                className="w-full font-mono text-sm"
                rows={12}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium text-gray-900">Filter Parameters</h5>
              <Button
                onClick={handleAddFilterParam}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm"
              >
                <Icon name="Plus" className="w-3 h-3" />
                Add Parameter
              </Button>
            </div>

            {querySpec.filter.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-500 mb-3">No filter parameters defined</p>
                <Button
                  onClick={handleAddFilterParam}
                  className="inline-flex items-center gap-2 text-sm"
                >
                  <Icon name="Plus" className="w-3 h-3" />
                  Add First Parameter
                </Button>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase">Optional</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {querySpec.filter.map((param) => (
                      <tr key={param.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            defaultValue={param.name || ""}
                            onBlur={(e) => handleUpdateFilterParam(param.id, "name", e.target.value.trim() || null)}
                            placeholder="Parameter name"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            defaultValue={param.type || ""}
                            onBlur={(e) => handleUpdateFilterParam(param.id, "type", e.target.value.trim() || null)}
                            placeholder="Type"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={param.optional}
                            onChange={(e) => handleUpdateFilterParam(param.id, "optional", e.target.checked)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteFilterParam(param.id)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Delete parameter"
                          >
                            <Icon name="Trash" className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
