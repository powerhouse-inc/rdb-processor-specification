import { Icon, TextInput } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { generateId } from "document-model/core";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as creators from "../../../document-models/rdb-processor-specification/gen/rdb-specification/creators.js";
import type { RdbTable, RdbColumn, RdbColumnType } from "../../../document-models/rdb-processor-specification/gen/types.js";
import type { RdbProcessorSpecificationAction } from "../../../document-models/rdb-processor-specification/gen/actions.js";

interface RdbTableCardProps {
  table: RdbTable;
  dispatch: (action: RdbProcessorSpecificationAction) => void;
}

const COLUMN_TYPE_OPTIONS: RdbColumnType[] = ["String", "Int", "Float", "Boolean", "Date", "DateTime", "Text"];

export function RdbTableCard({ table, dispatch }: RdbTableCardProps) {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleUpdateTableName = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.value.trim();
    if (name !== (table.name || "")) {
      dispatch(creators.updateTableName({ id: table.id, name: name || null }));
    }
  };

  const handleDeleteTable = () => {
    if (confirm("Are you sure you want to delete this table and all its columns?")) {
      dispatch(creators.deleteRdbTable({ id: table.id }));
    }
  };

  const handleAddColumn = () => {
    const id = generateId();
    dispatch(creators.addRdbColumn({
      tableId: table.id,
      id,
      name: null,
      type: "String",
      description: null,
      sourceDocModel: null,
      sourceProperty: null,
      primaryKey: false,
    }));
  };

  // Track local edits for all fields - key is "columnId.field"
  const [localEdits, setLocalEdits] = useState<Record<string, string>>({});
  const [editingColumn, setEditingColumn] = useState<{ id: string; field: keyof RdbColumn } | null>(null);

  // Clean up local edits when state has updated to match them
  useEffect(() => {
    setLocalEdits(prev => {
      const next = { ...prev };
      let changed = false;
      for (const [editKey, localValue] of Object.entries(prev)) {
        const [columnId, field] = editKey.split(".");
        const column = table.columns.find(c => c.id === columnId);
        if (column) {
          const stateValue = column[field as keyof RdbColumn];
          const stateStr = (typeof stateValue === "string" ? stateValue : null) || "";
          // Compare trimmed values - if state matches local edit (trimmed) and we're not currently editing this field, clear it
          const isCurrentlyEditing = editingColumn?.id === columnId && editingColumn?.field === field;
          const localTrimmed = localValue.trim();
          if (localTrimmed === stateStr && !isCurrentlyEditing) {
            delete next[editKey];
            changed = true;
          }
        }
      }
      return changed ? next : prev;
    });
  }, [table.columns, editingColumn]);

  const getFieldValue = (columnId: string, field: keyof RdbColumn, stateValue: string | null): string => {
    const editKey = `${columnId}.${field}`;
    // If we have a local edit for this field, use it
    if (editKey in localEdits) {
      return localEdits[editKey];
    }
    // Otherwise use the state value
    return stateValue || "";
  };

  const handleStartEdit = (columnId: string, field: keyof RdbColumn, currentValue: string | null) => {
    // If we're switching from another field, save the previous field first
    // Keep the local edit - it will be cleared when state updates via useEffect
    if (editingColumn && (editingColumn.id !== columnId || editingColumn.field !== field)) {
      const prevEditKey = `${editingColumn.id}.${editingColumn.field}`;
      // Get the value from local edits if it exists
      let prevValue: string | null = null;
      if (prevEditKey in localEdits) {
        prevValue = localEdits[prevEditKey].trim() || null;
      } else {
        // Fallback: get from state if local edit doesn't exist (shouldn't happen, but safe)
        const prevColumn = table.columns.find(c => c.id === editingColumn.id);
        if (prevColumn) {
          const stateValue = prevColumn[editingColumn.field];
          prevValue = (typeof stateValue === "string" ? stateValue.trim() : null) || null;
        }
      }
      // Save the previous field's value
      // The local edit will remain until state updates and useEffect clears it
      dispatch(creators.updateRdbColumn({
        tableId: table.id,
        id: editingColumn.id,
        [editingColumn.field]: prevValue,
      }));
    }
    setEditingColumn({ id: columnId, field });
    // Initialize local edit with current state value if not already editing
    // If we're re-editing a field that was just saved, use the current state value
    const editKey = `${columnId}.${field}`;
    if (!(editKey in localEdits)) {
      setLocalEdits(prev => ({ ...prev, [editKey]: currentValue || "" }));
    }
  };

  const handleUpdateColumn = (columnId: string, field: keyof RdbColumn, value: string | boolean | null) => {
    // For string fields, use local edit value if available, otherwise use the passed value
    let finalValue = value;
    if (typeof value === "string" || value === null) {
      const editKey = `${columnId}.${field}`;
      if (editKey in localEdits) {
        finalValue = localEdits[editKey].trim() || null;
      } else {
        finalValue = value;
      }
    }
    dispatch(creators.updateRdbColumn({
      tableId: table.id,
      id: columnId,
      [field]: finalValue,
    }));
    // Clear local edit for this field
    const editKey = `${columnId}.${field}`;
    setLocalEdits(prev => {
      const next = { ...prev };
      delete next[editKey];
      return next;
    });
    setEditingColumn(null);
  };

  const handleDeleteColumn = (columnId: string) => {
    dispatch(creators.deleteRdbColumn({
      tableId: table.id,
      id: columnId,
    }));
  };

  const primaryKeyCount = table.columns.filter(col => col.primaryKey).length;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
            <div>
              <h4 className="font-medium text-gray-900">
                {table.name || "Untitled Table"}
              </h4>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{table.columns.length} column{table.columns.length !== 1 ? "s" : ""}</span>
                {primaryKeyCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Icon name="Branch" className="w-3 h-3 text-yellow-600" />
                    {primaryKeyCount} primary key{primaryKeyCount !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTable();
            }}
            className="text-gray-400 hover:text-red-600 p-1 bg-transparent border-none"
            title="Delete table"
          >
            <Icon name="Trash" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-6 space-y-6">
          <div>
            <TextInput
              label="Table Name"
              defaultValue={table.name || ""}
              onBlur={handleUpdateTableName}
              placeholder="Enter table name"
              className="w-full max-w-md"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium text-gray-900">Columns</h5>
              <Button
                onClick={handleAddColumn}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm"
              >
                <Icon name="Plus" className="w-3 h-3" />
                Add Column
              </Button>
            </div>

            {table.columns.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-500 mb-3">No columns defined</p>
                <Button
                  onClick={handleAddColumn}
                  className="inline-flex items-center gap-2 text-sm"
                >
                  <Icon name="Plus" className="w-3 h-3" />
                  Add First Column
                </Button>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Description</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Source Model</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Source Property</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase">PK</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {table.columns.map((column) => (
                      <tr key={column.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={getFieldValue(column.id, "name", column.name)}
                            onChange={(e) => {
                              const editKey = `${column.id}.name`;
                              setLocalEdits(prev => ({ ...prev, [editKey]: e.target.value }));
                            }}
                            onFocus={() => handleStartEdit(column.id, "name", column.name)}
                            onBlur={(e) => handleUpdateColumn(column.id, "name", e.target.value.trim() || null)}
                            placeholder="Column name"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={column.type}
                            onChange={(e) => handleUpdateColumn(column.id, "type", e.target.value as RdbColumnType)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {COLUMN_TYPE_OPTIONS.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={getFieldValue(column.id, "description", column.description)}
                            onChange={(e) => {
                              const editKey = `${column.id}.description`;
                              setLocalEdits(prev => ({ ...prev, [editKey]: e.target.value }));
                            }}
                            onFocus={() => handleStartEdit(column.id, "description", column.description)}
                            onBlur={(e) => handleUpdateColumn(column.id, "description", e.target.value.trim() || null)}
                            placeholder="Description"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={getFieldValue(column.id, "sourceDocModel", column.sourceDocModel)}
                            onChange={(e) => {
                              const editKey = `${column.id}.sourceDocModel`;
                              setLocalEdits(prev => ({ ...prev, [editKey]: e.target.value }));
                            }}
                            onFocus={() => handleStartEdit(column.id, "sourceDocModel", column.sourceDocModel)}
                            onBlur={(e) => handleUpdateColumn(column.id, "sourceDocModel", e.target.value.trim() || null)}
                            placeholder="Source model"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={getFieldValue(column.id, "sourceProperty", column.sourceProperty)}
                            onChange={(e) => {
                              const editKey = `${column.id}.sourceProperty`;
                              setLocalEdits(prev => ({ ...prev, [editKey]: e.target.value }));
                            }}
                            onFocus={() => handleStartEdit(column.id, "sourceProperty", column.sourceProperty)}
                            onBlur={(e) => handleUpdateColumn(column.id, "sourceProperty", e.target.value.trim() || null)}
                            placeholder="Source property"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={column.primaryKey}
                            onChange={(e) => handleUpdateColumn(column.id, "primaryKey", e.target.checked)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteColumn(column.id)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Delete column"
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
