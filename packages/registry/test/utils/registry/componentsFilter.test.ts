import { describe, expect, it } from "vitest";
import { filterRequestedComponents } from "../../../src/utils/registry/componentsFilter";
import { z } from "zod";
import { registryIndexSchema } from "../../../src/utils/registry/schema";

describe("filterRequestedComponents", () => {
  const mockRegistry: z.infer<typeof registryIndexSchema> = [
    {
      name: "Button",
      dependencies: [],
      files: [],
      type: "templates/fields",
      registryDependencies: [],
    },
    {
      name: "Card",
      dependencies: [],
      files: [],
      type: "templates/blocks",
      registryDependencies: [],
    },
  ];

  it("should find requested components that exist in registry", () => {
    const result = filterRequestedComponents(mockRegistry, ["Button"]);
    expect(result.found).toHaveLength(1);
    expect(result.found[0].name).toBe("Button");
    expect(result.notFound).toHaveLength(0);
  });

  it("should handle case-insensitive component names", () => {
    const result = filterRequestedComponents(mockRegistry, ["button"]);
    expect(result.found).toHaveLength(1);
    expect(result.found[0].name).toBe("Button");
    expect(result.notFound).toHaveLength(0);
  });

  it("should track components not found in registry", () => {
    const result = filterRequestedComponents(mockRegistry, ["NonExistent"]);
    expect(result.found).toHaveLength(0);
    expect(result.notFound).toHaveLength(1);
    expect(result.notFound[0]).toBe("NonExistent");
  });

  it("should handle mixed found and not found components", () => {
    const result = filterRequestedComponents(mockRegistry, [
      "Button",
      "NonExistent",
    ]);
    expect(result.found).toHaveLength(1);
    expect(result.found[0].name).toBe("Button");
    expect(result.notFound).toHaveLength(1);
    expect(result.notFound[0]).toBe("NonExistent");
  });

  it("should handle empty registry", () => {
    const result = filterRequestedComponents([], ["Button"]);
    expect(result.found).toHaveLength(0);
    expect(result.notFound).toHaveLength(1);
  });

  it("should handle empty requested components array", () => {
    const result = filterRequestedComponents(mockRegistry, []);
    expect(result.found).toHaveLength(0);
    expect(result.notFound).toHaveLength(0);
  });
});
