import { createAction } from "document-model/core";
import { z, type SetSpecInput } from "../types.js";
import { type SetSpecAction } from "./actions.js";

export const setSpec = (input: SetSpecInput) =>
  createAction<SetSpecAction>(
    "SET_SPEC",
    { ...input },
    undefined,
    z.SetSpecInputSchema,
    "global",
  );
