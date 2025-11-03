/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import utils from "../../gen/utils.js";
import {
  type AddQuerySpecificationInput,
  type UpdateQuerySchemaInput,
  type UpdateQueryExampleInput,
  type DeleteQuerySpecificationInput,
  type AddQueryFilterParamInput,
  type UpdateFilterParamInput,
  type DeleteFilterParamInput
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/query-specification/creators.js";
import type { RdbProcessorSpecificationDocument } from "../../gen/types.js";

describe("QuerySpecification Operations", () => {
  let document: RdbProcessorSpecificationDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  describe("ADD_QUERY_SPECIFICATION operation", () => {
    it("should add a query specification with schema and example", () => {
      const input: AddQuerySpecificationInput = {
        id: "query-001",
        querySchema: "getUsersByActivity(startDate: Date!, endDate: Date!, minActions: Int!): [User]",
        queryExample: "getUsersByActivity(startDate: '2024-01-01', endDate: '2024-12-31', minActions: 10)"
      };

      const updatedDocument = reducer(document, creators.addQuerySpecification(input));

      expect(updatedDocument.operations.global).toHaveLength(1);
      expect(updatedDocument.operations.global[0].action.type).toBe("ADD_QUERY_SPECIFICATION");
      expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
      expect(updatedDocument.operations.global[0].index).toEqual(0);

      // Verify state
      expect(updatedDocument.state.global.querySpecifications).toHaveLength(1);
      expect(updatedDocument.state.global.querySpecifications[0]).toEqual({
        id: "query-001",
        querySchema: "getUsersByActivity(startDate: Date!, endDate: Date!, minActions: Int!): [User]",
        queryExample: "getUsersByActivity(startDate: '2024-01-01', endDate: '2024-12-31', minActions: 10)",
        filter: []
      });
    });

    it("should add multiple query specifications", () => {
      const input1: AddQuerySpecificationInput = {
        id: "query-001",
        querySchema: "getActiveUsers(): [User]"
      };

      const input2: AddQuerySpecificationInput = {
        id: "query-002",
        querySchema: "getTransactionsByUser(userId: String!): [Transaction]",
        queryExample: "getTransactionsByUser(userId: 'user-123')"
      };

      let updatedDocument = reducer(document, creators.addQuerySpecification(input1));
      updatedDocument = reducer(updatedDocument, creators.addQuerySpecification(input2));

      expect(updatedDocument.state.global.querySpecifications).toHaveLength(2);
      expect(updatedDocument.state.global.querySpecifications[0].id).toBe("query-001");
      expect(updatedDocument.state.global.querySpecifications[1].id).toBe("query-002");
    });
  });

  describe("UPDATE_QUERY_SCHEMA operation", () => {
    it("should update query schema for existing specification", () => {
      // First add a query specification
      const addInput: AddQuerySpecificationInput = {
        id: "query-001",
        querySchema: "getUsers(): [User]"
      };
      let updatedDocument = reducer(document, creators.addQuerySpecification(addInput));

      // Update the schema
      const updateInput: UpdateQuerySchemaInput = {
        id: "query-001",
        querySchema: "getUsers(limit: Int, offset: Int): [User]"
      };
      updatedDocument = reducer(updatedDocument, creators.updateQuerySchema(updateInput));

      expect(updatedDocument.state.global.querySpecifications[0].querySchema).toBe(
        "getUsers(limit: Int, offset: Int): [User]"
      );
    });

    it("should not affect other specifications when updating schema", () => {
      // Add two specifications
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "queryOne(): [Result]"
      }));
      updatedDocument = reducer(updatedDocument, creators.addQuerySpecification({
        id: "query-002",
        querySchema: "queryTwo(): [Result]"
      }));

      // Update only first one
      updatedDocument = reducer(updatedDocument, creators.updateQuerySchema({
        id: "query-001",
        querySchema: "queryOne(param: String): [Result]"
      }));

      expect(updatedDocument.state.global.querySpecifications[0].querySchema).toBe(
        "queryOne(param: String): [Result]"
      );
      expect(updatedDocument.state.global.querySpecifications[1].querySchema).toBe(
        "queryTwo(): [Result]"
      );
    });
  });

  describe("UPDATE_QUERY_EXAMPLE operation", () => {
    it("should update query example for existing specification", () => {
      // Add specification
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "getUsers(limit: Int): [User]",
        queryExample: "getUsers(limit: 10)"
      }));

      // Update example
      updatedDocument = reducer(updatedDocument, creators.updateQueryExample({
        id: "query-001",
        queryExample: "getUsers(limit: 100)"
      }));

      expect(updatedDocument.state.global.querySpecifications[0].queryExample).toBe(
        "getUsers(limit: 100)"
      );
    });
  });

  describe("DELETE_QUERY_SPECIFICATION operation", () => {
    it("should delete an existing query specification", () => {
      // Add specifications
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "queryOne(): [Result]"
      }));
      updatedDocument = reducer(updatedDocument, creators.addQuerySpecification({
        id: "query-002",
        querySchema: "queryTwo(): [Result]"
      }));

      // Delete first specification
      const deleteInput: DeleteQuerySpecificationInput = {
        id: "query-001"
      };
      updatedDocument = reducer(updatedDocument, creators.deleteQuerySpecification(deleteInput));

      expect(updatedDocument.state.global.querySpecifications).toHaveLength(1);
      expect(updatedDocument.state.global.querySpecifications[0].id).toBe("query-002");
    });

    it("should handle deleting non-existent specification gracefully", () => {
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "queryOne(): [Result]"
      }));

      updatedDocument = reducer(updatedDocument, creators.deleteQuerySpecification({
        id: "non-existent"
      }));

      expect(updatedDocument.state.global.querySpecifications).toHaveLength(1);
      expect(updatedDocument.state.global.querySpecifications[0].id).toBe("query-001");
    });
  });

  describe("ADD_QUERY_FILTER_PARAM operation", () => {
    it("should add filter parameter to query specification", () => {
      // Add query specification
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "getUsers(): [User]"
      }));

      // Add filter parameter
      const filterInput: AddQueryFilterParamInput = {
        querySpecId: "query-001",
        id: "filter-001",
        name: "startDate",
        type: "Date",
        optional: false
      };
      updatedDocument = reducer(updatedDocument, creators.addQueryFilterParam(filterInput));

      expect(updatedDocument.state.global.querySpecifications[0].filter).toHaveLength(1);
      expect(updatedDocument.state.global.querySpecifications[0].filter[0]).toEqual({
        id: "filter-001",
        name: "startDate",
        type: "Date",
        optional: false
      });
    });

    it("should add multiple filter parameters", () => {
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "getUserActivity(): [Activity]"
      }));

      // Add first filter
      updatedDocument = reducer(updatedDocument, creators.addQueryFilterParam({
        querySpecId: "query-001",
        id: "filter-001",
        name: "userId",
        type: "String",
        optional: false
      }));

      // Add second filter
      updatedDocument = reducer(updatedDocument, creators.addQueryFilterParam({
        querySpecId: "query-001",
        id: "filter-002",
        name: "activityType",
        type: "String",
        optional: true
      }));

      expect(updatedDocument.state.global.querySpecifications[0].filter).toHaveLength(2);
      expect(updatedDocument.state.global.querySpecifications[0].filter[1]).toEqual({
        id: "filter-002",
        name: "activityType",
        type: "String",
        optional: true
      });
    });
  });

  describe("UPDATE_FILTER_PARAM operation", () => {
    it("should update existing filter parameter", () => {
      // Setup: add query spec and filter
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "getUsers(): [User]"
      }));
      updatedDocument = reducer(updatedDocument, creators.addQueryFilterParam({
        querySpecId: "query-001",
        id: "filter-001",
        name: "date",
        type: "String",
        optional: true
      }));

      // Update filter
      const updateInput: UpdateFilterParamInput = {
        querySpecId: "query-001",
        id: "filter-001",
        name: "createdAt",
        type: "DateTime",
        optional: false
      };
      updatedDocument = reducer(updatedDocument, creators.updateFilterParam(updateInput));

      const filter = updatedDocument.state.global.querySpecifications[0].filter[0];
      expect(filter.name).toBe("createdAt");
      expect(filter.type).toBe("DateTime");
      expect(filter.optional).toBe(false);
    });

    it("should only update specified fields", () => {
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "getUsers(): [User]"
      }));
      updatedDocument = reducer(updatedDocument, creators.addQueryFilterParam({
        querySpecId: "query-001",
        id: "filter-001",
        name: "userId",
        type: "String",
        optional: false
      }));

      // Update only the name
      updatedDocument = reducer(updatedDocument, creators.updateFilterParam({
        querySpecId: "query-001",
        id: "filter-001",
        name: "customUserId"
      }));

      const filter = updatedDocument.state.global.querySpecifications[0].filter[0];
      expect(filter.name).toBe("customUserId");
      expect(filter.type).toBeNull();
      expect(filter.optional).toBe(false);
    });
  });

  describe("DELETE_FILTER_PARAM operation", () => {
    it("should delete filter parameter from query specification", () => {
      // Setup
      let updatedDocument = reducer(document, creators.addQuerySpecification({
        id: "query-001",
        querySchema: "getUsers(): [User]"
      }));
      updatedDocument = reducer(updatedDocument, creators.addQueryFilterParam({
        querySpecId: "query-001",
        id: "filter-001",
        name: "userId",
        type: "String",
        optional: false
      }));
      updatedDocument = reducer(updatedDocument, creators.addQueryFilterParam({
        querySpecId: "query-001",
        id: "filter-002",
        name: "status",
        type: "String",
        optional: true
      }));

      // Delete first filter
      const deleteInput: DeleteFilterParamInput = {
        querySpecId: "query-001",
        id: "filter-001"
      };
      updatedDocument = reducer(updatedDocument, creators.deleteFilterParam(deleteInput));

      expect(updatedDocument.state.global.querySpecifications[0].filter).toHaveLength(1);
      expect(updatedDocument.state.global.querySpecifications[0].filter[0].id).toBe("filter-002");
    });
  });

  describe("Complex workflow", () => {
    it("should handle complete query specification lifecycle", () => {
      // Add query specification
      let doc = reducer(document, creators.addQuerySpecification({
        id: "query-users",
        querySchema: "getUsers(): [User]",
        queryExample: "getUsers()"
      }));

      // Add filter parameters
      doc = reducer(doc, creators.addQueryFilterParam({
        querySpecId: "query-users",
        id: "filter-status",
        name: "status",
        type: "String",
        optional: true
      }));

      doc = reducer(doc, creators.addQueryFilterParam({
        querySpecId: "query-users",
        id: "filter-date",
        name: "createdAfter",
        type: "Date",
        optional: false
      }));

      // Update schema to reflect filters
      doc = reducer(doc, creators.updateQuerySchema({
        id: "query-users",
        querySchema: "getUsers(status: String, createdAfter: Date!): [User]"
      }));

      // Update example
      doc = reducer(doc, creators.updateQueryExample({
        id: "query-users",
        queryExample: "getUsers(status: 'active', createdAfter: '2024-01-01')"
      }));

      // Update a filter parameter
      doc = reducer(doc, creators.updateFilterParam({
        querySpecId: "query-users",
        id: "filter-status",
        name: "accountStatus",
        type: "Enum",
        optional: true
      }));

      // Verify final state
      const querySpec = doc.state.global.querySpecifications[0];
      expect(querySpec.id).toBe("query-users");
      expect(querySpec.querySchema).toBe("getUsers(status: String, createdAfter: Date!): [User]");
      expect(querySpec.queryExample).toBe("getUsers(status: 'active', createdAfter: '2024-01-01')");
      expect(querySpec.filter).toHaveLength(2);
      expect(querySpec.filter[0].name).toBe("accountStatus");
      expect(querySpec.filter[1].name).toBe("createdAfter");
    });
  });
});
