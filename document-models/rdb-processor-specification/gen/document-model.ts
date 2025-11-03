import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  description:
    "A document model for defining RDB processor specifications including query specifications and database table structures",
  extension: ".phdm",
  id: "powerhouse/rdb-processor-specification",
  name: "RdbProcessorSpecification",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "",
          id: "4b7b8bda-f24f-4bfc-8509-6014388053dc",
          name: "specification_metadata",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "8b7298e4-12c2-4456-8ec4-d6a944833e35",
              name: "SET_SPEC",
              reducer: "",
              schema:
                "input SetSpecInput {\n  name: String\n  description: String\n}",
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "d4cf20fc-6b44-424c-bbdc-fd597bc6f07f",
          name: "query_specification",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "edbbb9d1-8fc7-46f2-b89f-b22a9c95ca43",
              name: "ADD_QUERY_SPECIFICATION",
              reducer: "",
              schema:
                "input AddQuerySpecificationInput {\n  id: OID!\n  querySchema: String\n  queryExample: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "d338e836-6144-467b-a69f-ecf912131146",
              name: "UPDATE_QUERY_SCHEMA",
              reducer: "",
              schema:
                "input UpdateQuerySchemaInput {\n  id: OID!\n  querySchema: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "abcac748-7fbd-4914-8118-263a3576d268",
              name: "UPDATE_QUERY_EXAMPLE",
              reducer: "",
              schema:
                "input UpdateQueryExampleInput {\n  id: OID!\n  queryExample: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "a05f1887-8898-4987-b74c-04c715ce50a4",
              name: "DELETE_QUERY_SPECIFICATION",
              reducer: "",
              schema: "input DeleteQuerySpecificationInput {\n  id: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "676cccba-c4de-4753-9372-de07ad3c784e",
              name: "ADD_QUERY_FILTER_PARAM",
              reducer: "",
              schema:
                "input AddQueryFilterParamInput {\n  querySpecId: OID!\n  id: OID!\n  name: String\n  type: String\n  optional: Boolean!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "e88bef8e-9def-4f2e-926d-bd02dbf6fd86",
              name: "UPDATE_FILTER_PARAM",
              reducer: "",
              schema:
                "input UpdateFilterParamInput {\n  querySpecId: OID!\n  id: OID!\n  name: String\n  type: String\n  optional: Boolean\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "5b59b9f8-9005-433c-b932-bfc5c7c09f26",
              name: "DELETE_FILTER_PARAM",
              reducer: "",
              schema:
                "input DeleteFilterParamInput {\n  querySpecId: OID!\n  id: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "39781b84-8b96-4968-9907-ac0ae9f51bd2",
              name: "SET_QUERY_SPEC_NAME",
              reducer: "",
              schema:
                "input SetQuerySpecNameInput {\n  querySpecId: OID!\n  name: String\n}",
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "4355dc3b-8c4b-4542-a02f-2d96d7ef4f4e",
          name: "rdb_specification",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "871cb1b6-2efc-4c0a-99eb-7a192ac6def5",
              name: "ADD_RDB_TABLE",
              reducer: "",
              schema: "input AddRdbTableInput {\n  id: OID!\n  name: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "702a83f4-6c1b-44ed-9bfd-1353bd7b77cc",
              name: "UPDATE_TABLE_NAME",
              reducer: "",
              schema:
                "input UpdateTableNameInput {\n  id: OID!\n  name: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "905fc056-7813-4772-833f-df5c2399a54d",
              name: "DELETE_RDB_TABLE",
              reducer: "",
              schema: "input DeleteRdbTableInput {\n  id: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "82987d94-e93e-4818-8ff3-b597647dbea9",
              name: "ADD_RDB_COLUMN",
              reducer: "",
              schema:
                "input AddRdbColumnInput {\n  tableId: OID!\n  id: OID!\n  name: String\n  type: RdbColumnType!\n  description: String\n  sourceDocModel: String\n  sourceProperty: String\n  primaryKey: Boolean!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "1ccd10fc-cdaf-44d5-9f1a-659e728da6c9",
              name: "UPDATE_RDB_COLUMN",
              reducer: "",
              schema:
                "input UpdateRdbColumnInput {\n  tableId: OID!\n  id: OID!\n  name: String\n  type: RdbColumnTypeInput\n  description: String\n  sourceDocModel: String\n  sourceProperty: String\n  primaryKey: Boolean\n}\n\nenum RdbColumnTypeInput {\n  String\n  Int\n  Float\n  Boolean\n  Date\n  DateTime\n  Text\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "c9992a22-f8a7-4ac1-a5bb-e3ffd0b0b28d",
              name: "DELETE_RDB_COLUMN",
              reducer: "",
              schema:
                "input DeleteRdbColumnInput {\n  tableId: OID!\n  id: OID!\n}",
              scope: "global",
              template: "",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue:
            '"{\\n  \\"name\\": null,\\n  \\"description\\": null,\\n  \\"querySpecifications\\": [],\\n  \\"rdbSpecification\\": []\\n}"',
          schema:
            "type RdbProcessorSpecificationState {\n  name: String\n  description: String\n  querySpecifications: [QuerySpecification!]!\n  rdbSpecification: [RdbTable!]!\n}\n\ntype QuerySpecification {\n  id: OID!\n  name: String\n  querySchema: String\n  filter: [QueryFilterParam!]!\n  queryExample: String\n}\n\ntype QueryFilterParam {\n  id: OID!\n  name: String\n  type: String\n  optional: Boolean!\n}\n\ntype RdbTable {\n  id: OID!\n  name: String\n  columns: [RdbColumn!]!\n}\n\ntype RdbColumn {\n  id: OID!\n  name: String\n  type: RdbColumnType!\n  description: String\n  sourceDocModel: String\n  sourceProperty: String\n  primaryKey: Boolean!\n}\n\nenum RdbColumnType {\n  String\n  Int\n  Float\n  Boolean\n  Date\n  DateTime\n  Text\n}\n",
        },
        local: {
          examples: [],
          initialValue: '""',
          schema: "",
        },
      },
      version: 1,
    },
  ],
};
