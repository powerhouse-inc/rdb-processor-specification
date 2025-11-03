/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import utils from "../../gen/utils.js";
import {
  type AddRdbTableInput,
  type UpdateTableNameInput,
  type DeleteRdbTableInput,
  type AddRdbColumnInput,
  type UpdateRdbColumnInput,
  type DeleteRdbColumnInput
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/rdb-specification/creators.js";
import type { RdbProcessorSpecificationDocument } from "../../gen/types.js";

describe("RdbSpecification Operations", () => {
  let document: RdbProcessorSpecificationDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  describe("ADD_RDB_TABLE operation", () => {
    it("should add a table to the RDB specification", () => {
      const input: AddRdbTableInput = {
        id: "table-users",
        name: "users"
      };

      const updatedDocument = reducer(document, creators.addRdbTable(input));

      expect(updatedDocument.operations.global).toHaveLength(1);
      expect(updatedDocument.operations.global[0].action.type).toBe("ADD_RDB_TABLE");
      expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
      expect(updatedDocument.operations.global[0].index).toEqual(0);

      // Verify state
      expect(updatedDocument.state.global.rdbSpecification).toHaveLength(1);
      expect(updatedDocument.state.global.rdbSpecification[0]).toEqual({
        id: "table-users",
        name: "users",
        columns: []
      });
    });

    it("should add multiple tables", () => {
      const input1: AddRdbTableInput = {
        id: "table-users",
        name: "users"
      };

      const input2: AddRdbTableInput = {
        id: "table-transactions",
        name: "transactions"
      };

      let updatedDocument = reducer(document, creators.addRdbTable(input1));
      updatedDocument = reducer(updatedDocument, creators.addRdbTable(input2));

      expect(updatedDocument.state.global.rdbSpecification).toHaveLength(2);
      expect(updatedDocument.state.global.rdbSpecification[0].name).toBe("users");
      expect(updatedDocument.state.global.rdbSpecification[1].name).toBe("transactions");
    });
  });

  describe("UPDATE_TABLE_NAME operation", () => {
    it("should update table name", () => {
      // Add a table first
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-001",
        name: "old_name"
      }));

      // Update the name
      const updateInput: UpdateTableNameInput = {
        id: "table-001",
        name: "new_name"
      };
      updatedDocument = reducer(updatedDocument, creators.updateTableName(updateInput));

      expect(updatedDocument.state.global.rdbSpecification[0].name).toBe("new_name");
    });

    it("should not affect other tables when updating name", () => {
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-001",
        name: "users"
      }));
      updatedDocument = reducer(updatedDocument, creators.addRdbTable({
        id: "table-002",
        name: "products"
      }));

      updatedDocument = reducer(updatedDocument, creators.updateTableName({
        id: "table-001",
        name: "customers"
      }));

      expect(updatedDocument.state.global.rdbSpecification[0].name).toBe("customers");
      expect(updatedDocument.state.global.rdbSpecification[1].name).toBe("products");
    });
  });

  describe("DELETE_RDB_TABLE operation", () => {
    it("should delete an existing table", () => {
      // Add tables
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-001",
        name: "users"
      }));
      updatedDocument = reducer(updatedDocument, creators.addRdbTable({
        id: "table-002",
        name: "products"
      }));

      // Delete first table
      const deleteInput: DeleteRdbTableInput = {
        id: "table-001"
      };
      updatedDocument = reducer(updatedDocument, creators.deleteRdbTable(deleteInput));

      expect(updatedDocument.state.global.rdbSpecification).toHaveLength(1);
      expect(updatedDocument.state.global.rdbSpecification[0].id).toBe("table-002");
    });

    it("should handle deleting non-existent table gracefully", () => {
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-001",
        name: "users"
      }));

      updatedDocument = reducer(updatedDocument, creators.deleteRdbTable({
        id: "non-existent"
      }));

      expect(updatedDocument.state.global.rdbSpecification).toHaveLength(1);
      expect(updatedDocument.state.global.rdbSpecification[0].id).toBe("table-001");
    });
  });

  describe("ADD_RDB_COLUMN operation", () => {
    it("should add a column to a table", () => {
      // Add table first
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-users",
        name: "users"
      }));

      // Add column
      const columnInput: AddRdbColumnInput = {
        tableId: "table-users",
        id: "col-user-id",
        name: "user_id",
        type: "String",
        description: "Primary key for user",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "id",
        primaryKey: true
      };
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn(columnInput));

      expect(updatedDocument.state.global.rdbSpecification[0].columns).toHaveLength(1);
      expect(updatedDocument.state.global.rdbSpecification[0].columns[0]).toEqual({
        id: "col-user-id",
        name: "user_id",
        type: "String",
        description: "Primary key for user",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "id",
        primaryKey: true
      });
    });

    it("should add multiple columns to a table", () => {
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-users",
        name: "users"
      }));

      // Add first column
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-id",
        name: "id",
        type: "String",
        description: "User ID",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "id",
        primaryKey: true
      }));

      // Add second column
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-email",
        name: "email",
        type: "String",
        description: "User email address",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "email",
        primaryKey: false
      }));

      // Add third column
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-created-at",
        name: "created_at",
        type: "DateTime",
        description: "Account creation timestamp",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "createdAt",
        primaryKey: false
      }));

      expect(updatedDocument.state.global.rdbSpecification[0].columns).toHaveLength(3);
      expect(updatedDocument.state.global.rdbSpecification[0].columns[0].name).toBe("id");
      expect(updatedDocument.state.global.rdbSpecification[0].columns[1].name).toBe("email");
      expect(updatedDocument.state.global.rdbSpecification[0].columns[2].name).toBe("created_at");
    });

    it("should handle all column types", () => {
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-types",
        name: "type_examples"
      }));

      const columnTypes = [
        { id: "col-string", name: "string_col", type: "String" as const },
        { id: "col-int", name: "int_col", type: "Int" as const },
        { id: "col-float", name: "float_col", type: "Float" as const },
        { id: "col-bool", name: "boolean_col", type: "Boolean" as const },
        { id: "col-date", name: "date_col", type: "Date" as const },
        { id: "col-datetime", name: "datetime_col", type: "DateTime" as const },
        { id: "col-text", name: "text_col", type: "Text" as const }
      ];

      for (const col of columnTypes) {
        updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
          tableId: "table-types",
          id: col.id,
          name: col.name,
          type: col.type,
          description: `Column of type ${col.type}`,
          sourceDocModel: null,
          sourceProperty: null,
          primaryKey: false
        }));
      }

      expect(updatedDocument.state.global.rdbSpecification[0].columns).toHaveLength(7);
      expect(updatedDocument.state.global.rdbSpecification[0].columns[0].type).toBe("String");
      expect(updatedDocument.state.global.rdbSpecification[0].columns[6].type).toBe("Text");
    });
  });

  describe("UPDATE_RDB_COLUMN operation", () => {
    it("should update column properties", () => {
      // Setup: add table and column
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-users",
        name: "users"
      }));
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-001",
        name: "old_name",
        type: "String",
        description: "Old description",
        sourceDocModel: "old/model",
        sourceProperty: "oldProp",
        primaryKey: false
      }));

      // Update column
      const updateInput: UpdateRdbColumnInput = {
        tableId: "table-users",
        id: "col-001",
        name: "new_name",
        type: "Int",
        description: "Updated description",
        sourceDocModel: "new/model",
        sourceProperty: "newProp",
        primaryKey: true
      };
      updatedDocument = reducer(updatedDocument, creators.updateRdbColumn(updateInput));

      const column = updatedDocument.state.global.rdbSpecification[0].columns[0];
      expect(column.name).toBe("new_name");
      expect(column.type).toBe("Int");
      expect(column.description).toBe("Updated description");
      expect(column.sourceDocModel).toBe("new/model");
      expect(column.sourceProperty).toBe("newProp");
      expect(column.primaryKey).toBe(true);
    });

    it("should update only specified fields", () => {
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-users",
        name: "users"
      }));
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-001",
        name: "email",
        type: "String",
        description: "User email",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "email",
        primaryKey: false
      }));

      // Update only name and description
      updatedDocument = reducer(updatedDocument, creators.updateRdbColumn({
        tableId: "table-users",
        id: "col-001",
        name: "email_address",
        description: "User primary email address"
      }));

      const column = updatedDocument.state.global.rdbSpecification[0].columns[0];
      expect(column.name).toBe("email_address");
      expect(column.description).toBe("User primary email address");
      expect(column.type).toBe("String"); // Should remain unchanged
      expect(column.sourceDocModel).toBeNull(); // Should be null based on reducer logic
      expect(column.primaryKey).toBe(false);
    });

    it("should not affect other columns when updating", () => {
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-users",
        name: "users"
      }));
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-001",
        name: "id",
        type: "String",
        description: null,
        sourceDocModel: null,
        sourceProperty: null,
        primaryKey: true
      }));
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-002",
        name: "email",
        type: "String",
        description: null,
        sourceDocModel: null,
        sourceProperty: null,
        primaryKey: false
      }));

      // Update only first column
      updatedDocument = reducer(updatedDocument, creators.updateRdbColumn({
        tableId: "table-users",
        id: "col-001",
        name: "user_id"
      }));

      expect(updatedDocument.state.global.rdbSpecification[0].columns[0].name).toBe("user_id");
      expect(updatedDocument.state.global.rdbSpecification[0].columns[1].name).toBe("email");
    });
  });

  describe("DELETE_RDB_COLUMN operation", () => {
    it("should delete a column from a table", () => {
      // Setup
      let updatedDocument = reducer(document, creators.addRdbTable({
        id: "table-users",
        name: "users"
      }));
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-001",
        name: "id",
        type: "String",
        description: null,
        sourceDocModel: null,
        sourceProperty: null,
        primaryKey: true
      }));
      updatedDocument = reducer(updatedDocument, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-002",
        name: "email",
        type: "String",
        description: null,
        sourceDocModel: null,
        sourceProperty: null,
        primaryKey: false
      }));

      // Delete first column
      const deleteInput: DeleteRdbColumnInput = {
        tableId: "table-users",
        id: "col-001"
      };
      updatedDocument = reducer(updatedDocument, creators.deleteRdbColumn(deleteInput));

      expect(updatedDocument.state.global.rdbSpecification[0].columns).toHaveLength(1);
      expect(updatedDocument.state.global.rdbSpecification[0].columns[0].id).toBe("col-002");
    });
  });

  describe("Complex workflow", () => {
    it("should handle complete RDB specification lifecycle", () => {
      // Create users table
      let doc = reducer(document, creators.addRdbTable({
        id: "table-users",
        name: "users"
      }));

      // Add columns to users table
      doc = reducer(doc, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-user-id",
        name: "id",
        type: "String",
        description: "Primary key",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "id",
        primaryKey: true
      }));

      doc = reducer(doc, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-email",
        name: "email",
        type: "String",
        description: "User email",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "email",
        primaryKey: false
      }));

      doc = reducer(doc, creators.addRdbColumn({
        tableId: "table-users",
        id: "col-age",
        name: "age",
        type: "Int",
        description: "User age",
        sourceDocModel: "powerhouse/user",
        sourceProperty: "age",
        primaryKey: false
      }));

      // Create transactions table
      doc = reducer(doc, creators.addRdbTable({
        id: "table-transactions",
        name: "transactions"
      }));

      // Add columns to transactions table
      doc = reducer(doc, creators.addRdbColumn({
        tableId: "table-transactions",
        id: "col-tx-id",
        name: "id",
        type: "String",
        description: "Transaction ID",
        sourceDocModel: "powerhouse/transaction",
        sourceProperty: "id",
        primaryKey: true
      }));

      doc = reducer(doc, creators.addRdbColumn({
        tableId: "table-transactions",
        id: "col-user-id",
        name: "user_id",
        type: "String",
        description: "Foreign key to users",
        sourceDocModel: "powerhouse/transaction",
        sourceProperty: "userId",
        primaryKey: false
      }));

      doc = reducer(doc, creators.addRdbColumn({
        tableId: "table-transactions",
        id: "col-amount",
        name: "amount",
        type: "Float",
        description: "Transaction amount",
        sourceDocModel: "powerhouse/transaction",
        sourceProperty: "amount",
        primaryKey: false
      }));

      // Update a column
      doc = reducer(doc, creators.updateRdbColumn({
        tableId: "table-users",
        id: "col-email",
        name: "email_address",
        description: "Primary email address"
      }));

      // Rename a table
      doc = reducer(doc, creators.updateTableName({
        id: "table-users",
        name: "app_users"
      }));

      // Verify final state
      expect(doc.state.global.rdbSpecification).toHaveLength(2);

      const usersTable = doc.state.global.rdbSpecification[0];
      expect(usersTable.name).toBe("app_users");
      expect(usersTable.columns).toHaveLength(3);
      expect(usersTable.columns[1].name).toBe("email_address");
      expect(usersTable.columns[1].description).toBe("Primary email address");

      const transactionsTable = doc.state.global.rdbSpecification[1];
      expect(transactionsTable.name).toBe("transactions");
      expect(transactionsTable.columns).toHaveLength(3);
      expect(transactionsTable.columns[2].type).toBe("Float");
    });

    it("should handle table and column deletions", () => {
      // Create tables with columns
      let doc = reducer(document, creators.addRdbTable({
        id: "table-001",
        name: "table_one"
      }));

      doc = reducer(doc, creators.addRdbColumn({
        tableId: "table-001",
        id: "col-001",
        name: "column_one",
        type: "String",
        description: null,
        sourceDocModel: null,
        sourceProperty: null,
        primaryKey: false
      }));

      doc = reducer(doc, creators.addRdbColumn({
        tableId: "table-001",
        id: "col-002",
        name: "column_two",
        type: "Int",
        description: null,
        sourceDocModel: null,
        sourceProperty: null,
        primaryKey: false
      }));

      doc = reducer(doc, creators.addRdbTable({
        id: "table-002",
        name: "table_two"
      }));

      // Delete a column
      doc = reducer(doc, creators.deleteRdbColumn({
        tableId: "table-001",
        id: "col-001"
      }));

      expect(doc.state.global.rdbSpecification[0].columns).toHaveLength(1);
      expect(doc.state.global.rdbSpecification[0].columns[0].name).toBe("column_two");

      // Delete a table
      doc = reducer(doc, creators.deleteRdbTable({
        id: "table-002"
      }));

      expect(doc.state.global.rdbSpecification).toHaveLength(1);
      expect(doc.state.global.rdbSpecification[0].name).toBe("table_one");
    });
  });
});
