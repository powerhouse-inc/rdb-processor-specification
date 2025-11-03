import { Icon } from "@powerhousedao/document-engineering";
import { useSelectedRdbProcessorSpecificationDocument } from "../hooks/useRdbProcessorSpecificationDocument.js";
import { SpecificationMetadata } from "./components/SpecificationMetadata.js";
import { QuerySpecificationList } from "./components/QuerySpecificationList.js";
import { RdbTableList } from "./components/RdbTableList.js";
import { useState } from "react";
import { DocumentToolbar } from "@powerhousedao/design-system";

type ActiveTab = "metadata" | "queries" | "tables";

export function Editor() {
  const [document, dispatch] = useSelectedRdbProcessorSpecificationDocument();
  const [activeTab, setActiveTab] = useState<ActiveTab>("metadata");

  // Add loading and error handling
  if (!document) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-lg text-gray-600">
            Loading RDB Processor Specification...
          </div>
        </div>
      </div>
    );
  }

  if (!document.state?.global) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-lg text-red-600">
            Error: Document state not available
          </div>
        </div>
      </div>
    );
  }

  const state = document.state.global;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Document Toolbar */}
      <DocumentToolbar />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {state.name || "RDB Processor Specification"}
            </h1>
            {state.description && (
              <p className="text-sm text-gray-600 mt-1">{state.description}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="BarChart" className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {state.rdbSpecification.length} tables
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Search" className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {state.querySpecifications.length} queries
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("metadata")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "metadata"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="BookOpenText" className="w-4 h-4" />
              Metadata
            </div>
          </button>

          <button
            onClick={() => setActiveTab("queries")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "queries"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Search" className="w-4 h-4" />
              Query Specifications
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {state.querySpecifications.length}
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("tables")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "tables"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="BarChart" className="w-4 h-4" />
              RDB Tables
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {state.rdbSpecification.length}
              </span>
            </div>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === "metadata" && (
            <SpecificationMetadata state={state} dispatch={dispatch} />
          )}

          {activeTab === "queries" && (
            <QuerySpecificationList
              querySpecifications={state.querySpecifications}
              dispatch={dispatch}
            />
          )}

          {activeTab === "tables" && (
            <RdbTableList
              rdbTables={state.rdbSpecification}
              dispatch={dispatch}
            />
          )}
        </div>
      </main>
    </div>
  );
}
