// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { RdbProcessorSpecificationPHState } from "./types.js";
import { z } from "./types.js";

import { reducer as SpecificationMetadataReducer } from "../src/reducers/specification-metadata.js";
import { reducer as QuerySpecificationReducer } from "../src/reducers/query-specification.js";
import { reducer as RdbSpecificationReducer } from "../src/reducers/rdb-specification.js";

export const stateReducer: StateReducer<RdbProcessorSpecificationPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "SET_SPEC":
      z.SetSpecInputSchema().parse(action.input);
      SpecificationMetadataReducer.setSpecOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_QUERY_SPECIFICATION":
      z.AddQuerySpecificationInputSchema().parse(action.input);
      QuerySpecificationReducer.addQuerySpecificationOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_QUERY_SCHEMA":
      z.UpdateQuerySchemaInputSchema().parse(action.input);
      QuerySpecificationReducer.updateQuerySchemaOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_QUERY_EXAMPLE":
      z.UpdateQueryExampleInputSchema().parse(action.input);
      QuerySpecificationReducer.updateQueryExampleOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_QUERY_SPECIFICATION":
      z.DeleteQuerySpecificationInputSchema().parse(action.input);
      QuerySpecificationReducer.deleteQuerySpecificationOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_QUERY_FILTER_PARAM":
      z.AddQueryFilterParamInputSchema().parse(action.input);
      QuerySpecificationReducer.addQueryFilterParamOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_FILTER_PARAM":
      z.UpdateFilterParamInputSchema().parse(action.input);
      QuerySpecificationReducer.updateFilterParamOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_FILTER_PARAM":
      z.DeleteFilterParamInputSchema().parse(action.input);
      QuerySpecificationReducer.deleteFilterParamOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_QUERY_SPEC_NAME":
      z.SetQuerySpecNameInputSchema().parse(action.input);
      QuerySpecificationReducer.setQuerySpecNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_RDB_TABLE":
      z.AddRdbTableInputSchema().parse(action.input);
      RdbSpecificationReducer.addRdbTableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_TABLE_NAME":
      z.UpdateTableNameInputSchema().parse(action.input);
      RdbSpecificationReducer.updateTableNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_RDB_TABLE":
      z.DeleteRdbTableInputSchema().parse(action.input);
      RdbSpecificationReducer.deleteRdbTableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_RDB_COLUMN":
      z.AddRdbColumnInputSchema().parse(action.input);
      RdbSpecificationReducer.addRdbColumnOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_RDB_COLUMN":
      z.UpdateRdbColumnInputSchema().parse(action.input);
      RdbSpecificationReducer.updateRdbColumnOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_RDB_COLUMN":
      z.DeleteRdbColumnInputSchema().parse(action.input);
      RdbSpecificationReducer.deleteRdbColumnOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer =
  createReducer<RdbProcessorSpecificationPHState>(stateReducer);
