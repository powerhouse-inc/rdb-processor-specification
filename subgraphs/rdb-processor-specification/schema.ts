import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Queries: RdbProcessorSpecification Document
  """
  type RdbProcessorSpecificationQueries {
    getDocument(docId: PHID!, driveId: PHID): RdbProcessorSpecification
    getDocuments(driveId: String!): [RdbProcessorSpecification!]
  }

  type Query {
    RdbProcessorSpecification: RdbProcessorSpecificationQueries
  }

  """
  Mutations: RdbProcessorSpecification
  """
  type Mutation {
    RdbProcessorSpecification_createDocument(
      name: String!
      driveId: String
    ): String

    RdbProcessorSpecification_setSpec(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_SetSpecInput
    ): Int
    RdbProcessorSpecification_addQuerySpecification(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_AddQuerySpecificationInput
    ): Int
    RdbProcessorSpecification_updateQuerySchema(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_UpdateQuerySchemaInput
    ): Int
    RdbProcessorSpecification_updateQueryExample(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_UpdateQueryExampleInput
    ): Int
    RdbProcessorSpecification_deleteQuerySpecification(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_DeleteQuerySpecificationInput
    ): Int
    RdbProcessorSpecification_addQueryFilterParam(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_AddQueryFilterParamInput
    ): Int
    RdbProcessorSpecification_updateFilterParam(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_UpdateFilterParamInput
    ): Int
    RdbProcessorSpecification_deleteFilterParam(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_DeleteFilterParamInput
    ): Int
    RdbProcessorSpecification_setQuerySpecName(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_SetQuerySpecNameInput
    ): Int
    RdbProcessorSpecification_addRdbTable(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_AddRdbTableInput
    ): Int
    RdbProcessorSpecification_updateTableName(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_UpdateTableNameInput
    ): Int
    RdbProcessorSpecification_deleteRdbTable(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_DeleteRdbTableInput
    ): Int
    RdbProcessorSpecification_addRdbColumn(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_AddRdbColumnInput
    ): Int
    RdbProcessorSpecification_updateRdbColumn(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_UpdateRdbColumnInput
    ): Int
    RdbProcessorSpecification_deleteRdbColumn(
      driveId: String
      docId: PHID
      input: RdbProcessorSpecification_DeleteRdbColumnInput
    ): Int
  }

  """
  Module: SpecificationMetadata
  """
  input RdbProcessorSpecification_SetSpecInput {
    name: String
    description: String
  }

  """
  Module: QuerySpecification
  """
  input RdbProcessorSpecification_AddQuerySpecificationInput {
    id: OID!
    querySchema: String
    queryExample: String
  }
  input RdbProcessorSpecification_UpdateQuerySchemaInput {
    id: OID!
    querySchema: String
  }
  input RdbProcessorSpecification_UpdateQueryExampleInput {
    id: OID!
    queryExample: String
  }
  input RdbProcessorSpecification_DeleteQuerySpecificationInput {
    id: OID!
  }
  input RdbProcessorSpecification_AddQueryFilterParamInput {
    querySpecId: OID!
    id: OID!
    name: String
    type: String
    optional: Boolean!
  }
  input RdbProcessorSpecification_UpdateFilterParamInput {
    querySpecId: OID!
    id: OID!
    name: String
    type: String
    optional: Boolean
  }
  input RdbProcessorSpecification_DeleteFilterParamInput {
    querySpecId: OID!
    id: OID!
  }
  input RdbProcessorSpecification_SetQuerySpecNameInput {
    querySpecId: OID!
    name: String
  }

  """
  Module: RdbSpecification
  """
  input RdbProcessorSpecification_AddRdbTableInput {
    id: OID!
    name: String
  }
  input RdbProcessorSpecification_UpdateTableNameInput {
    id: OID!
    name: String
  }
  input RdbProcessorSpecification_DeleteRdbTableInput {
    id: OID!
  }
  input RdbProcessorSpecification_AddRdbColumnInput {
    tableId: OID!
    id: OID!
    name: String
    type: RdbColumnType!
    description: String
    sourceDocModel: String
    sourceProperty: String
    primaryKey: Boolean!
  }
  input RdbProcessorSpecification_UpdateRdbColumnInput {
    tableId: OID!
    id: OID!
    name: String
    type: RdbColumnTypeInput
    description: String
    sourceDocModel: String
    sourceProperty: String
    primaryKey: Boolean
  }

  enum RdbColumnTypeInput {
    String
    Int
    Float
    Boolean
    Date
    DateTime
    Text
  }
  input RdbProcessorSpecification_DeleteRdbColumnInput {
    tableId: OID!
    id: OID!
  }
`;
