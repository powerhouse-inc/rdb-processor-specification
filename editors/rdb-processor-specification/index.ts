import type { EditorModule } from "document-model";
import { Editor } from "./editor.js";

export const module: EditorModule = {
  Component: Editor,
  documentTypes: ["powerhouse/rdb-processor-specification"],
  config: {
    id: "rdb-processor-specification-editor",
    name: "rdb-processor-specification",
  },

};
