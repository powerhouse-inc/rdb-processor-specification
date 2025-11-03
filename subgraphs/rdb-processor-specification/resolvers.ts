import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import {
  actions,
  type SetSpecInput,
  type AddQuerySpecificationInput,
  type UpdateQuerySchemaInput,
  type UpdateQueryExampleInput,
  type DeleteQuerySpecificationInput,
  type AddQueryFilterParamInput,
  type UpdateFilterParamInput,
  type DeleteFilterParamInput,
  type SetQuerySpecNameInput,
  type AddRdbTableInput,
  type UpdateTableNameInput,
  type DeleteRdbTableInput,
  type AddRdbColumnInput,
  type UpdateRdbColumnInput,
  type DeleteRdbColumnInput,
  type RdbProcessorSpecificationDocument,
} from "../../document-models/rdb-processor-specification/index.js";
import { setName } from "document-model";

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      RdbProcessorSpecification: async () => {
        return {
          getDocument: async (args: { docId: string; driveId: string }) => {
            const { docId, driveId } = args;

            if (!docId) {
              throw new Error("Document id is required");
            }

            if (driveId) {
              const docIds = await reactor.getDocuments(driveId);
              if (!docIds.includes(docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc =
              await reactor.getDocument<RdbProcessorSpecificationDocument>(
                docId,
              );
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              created: doc.header.createdAtUtcIso,
              lastModified: doc.header.lastModifiedAtUtcIso,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc =
                  await reactor.getDocument<RdbProcessorSpecificationDocument>(
                    docId,
                  );
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  created: doc.header.createdAtUtcIso,
                  lastModified: doc.header.lastModifiedAtUtcIso,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.header?.revision?.global ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) =>
                doc.header.documentType ===
                "powerhouse/rdb-processor-specification",
            );
          },
        };
      },
    },
    Mutation: {
      RdbProcessorSpecification_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument(
          "powerhouse/rdb-processor-specification",
        );

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: "powerhouse/rdb-processor-specification",
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      RdbProcessorSpecification_setSpec: async (
        _: unknown,
        args: { docId: string; input: SetSpecInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.setSpec(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setSpec");
        }

        return true;
      },

      RdbProcessorSpecification_addQuerySpecification: async (
        _: unknown,
        args: { docId: string; input: AddQuerySpecificationInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addQuerySpecification(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addQuerySpecification",
          );
        }

        return true;
      },

      RdbProcessorSpecification_updateQuerySchema: async (
        _: unknown,
        args: { docId: string; input: UpdateQuerySchemaInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateQuerySchema(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to updateQuerySchema",
          );
        }

        return true;
      },

      RdbProcessorSpecification_updateQueryExample: async (
        _: unknown,
        args: { docId: string; input: UpdateQueryExampleInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateQueryExample(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to updateQueryExample",
          );
        }

        return true;
      },

      RdbProcessorSpecification_deleteQuerySpecification: async (
        _: unknown,
        args: { docId: string; input: DeleteQuerySpecificationInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteQuerySpecification(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to deleteQuerySpecification",
          );
        }

        return true;
      },

      RdbProcessorSpecification_addQueryFilterParam: async (
        _: unknown,
        args: { docId: string; input: AddQueryFilterParamInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addQueryFilterParam(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addQueryFilterParam",
          );
        }

        return true;
      },

      RdbProcessorSpecification_updateFilterParam: async (
        _: unknown,
        args: { docId: string; input: UpdateFilterParamInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateFilterParam(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to updateFilterParam",
          );
        }

        return true;
      },

      RdbProcessorSpecification_deleteFilterParam: async (
        _: unknown,
        args: { docId: string; input: DeleteFilterParamInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteFilterParam(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to deleteFilterParam",
          );
        }

        return true;
      },

      RdbProcessorSpecification_setQuerySpecName: async (
        _: unknown,
        args: { docId: string; input: SetQuerySpecNameInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setQuerySpecName(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setQuerySpecName",
          );
        }

        return true;
      },

      RdbProcessorSpecification_addRdbTable: async (
        _: unknown,
        args: { docId: string; input: AddRdbTableInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addRdbTable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addRdbTable");
        }

        return true;
      },

      RdbProcessorSpecification_updateTableName: async (
        _: unknown,
        args: { docId: string; input: UpdateTableNameInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateTableName(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateTableName");
        }

        return true;
      },

      RdbProcessorSpecification_deleteRdbTable: async (
        _: unknown,
        args: { docId: string; input: DeleteRdbTableInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteRdbTable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteRdbTable");
        }

        return true;
      },

      RdbProcessorSpecification_addRdbColumn: async (
        _: unknown,
        args: { docId: string; input: AddRdbColumnInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addRdbColumn(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addRdbColumn");
        }

        return true;
      },

      RdbProcessorSpecification_updateRdbColumn: async (
        _: unknown,
        args: { docId: string; input: UpdateRdbColumnInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateRdbColumn(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateRdbColumn");
        }

        return true;
      },

      RdbProcessorSpecification_deleteRdbColumn: async (
        _: unknown,
        args: { docId: string; input: DeleteRdbColumnInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<RdbProcessorSpecificationDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteRdbColumn(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteRdbColumn");
        }

        return true;
      },
    },
  };
};
