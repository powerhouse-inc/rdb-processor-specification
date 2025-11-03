/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import utils from "../../gen/utils.js";
import { type SetSpecInput } from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/specification-metadata/creators.js";
import type { RdbProcessorSpecificationDocument } from "../../gen/types.js";

describe("SpecificationMetadata Operations", () => {
  let document: RdbProcessorSpecificationDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  describe("SET_SPEC operation", () => {
    it("should set specification name and description", () => {
      const input: SetSpecInput = {
        name: "User Analytics Processor",
        description: "Processes user activity data and generates analytics tables"
      };

      const updatedDocument = reducer(document, creators.setSpec(input));

      expect(updatedDocument.operations.global).toHaveLength(1);
      expect(updatedDocument.operations.global[0].action.type).toBe("SET_SPEC");
      expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
      expect(updatedDocument.operations.global[0].index).toEqual(0);

      // Verify state changes
      expect(updatedDocument.state.global.name).toBe("User Analytics Processor");
      expect(updatedDocument.state.global.description).toBe("Processes user activity data and generates analytics tables");
    });

    it("should set only name when description is not provided", () => {
      const input: SetSpecInput = {
        name: "Simple Processor"
      };

      const updatedDocument = reducer(document, creators.setSpec(input));

      expect(updatedDocument.state.global.name).toBe("Simple Processor");
      expect(updatedDocument.state.global.description).toBeNull();
    });

    it("should set only description when name is not provided", () => {
      const input: SetSpecInput = {
        description: "A comprehensive data processing specification"
      };

      const updatedDocument = reducer(document, creators.setSpec(input));

      expect(updatedDocument.state.global.name).toBeNull();
      expect(updatedDocument.state.global.description).toBe("A comprehensive data processing specification");
    });

    it("should update existing specification metadata", () => {
      // Set initial metadata
      const initialInput: SetSpecInput = {
        name: "Initial Name",
        description: "Initial Description"
      };
      let updatedDocument = reducer(document, creators.setSpec(initialInput));

      // Update metadata
      const updateInput: SetSpecInput = {
        name: "Updated Processor Name",
        description: "Updated comprehensive description"
      };
      updatedDocument = reducer(updatedDocument, creators.setSpec(updateInput));

      expect(updatedDocument.operations.global).toHaveLength(2);
      expect(updatedDocument.state.global.name).toBe("Updated Processor Name");
      expect(updatedDocument.state.global.description).toBe("Updated comprehensive description");
    });

    it("should handle empty input object", () => {
      const input: SetSpecInput = {};

      const updatedDocument = reducer(document, creators.setSpec(input));

      expect(updatedDocument.state.global.name).toBeNull();
      expect(updatedDocument.state.global.description).toBeNull();
    });
  });
});
