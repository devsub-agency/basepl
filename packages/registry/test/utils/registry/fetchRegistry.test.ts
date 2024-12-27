import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import {
  fetchRegistry,
  getRegistryIndex,
} from "../../../src/utils/registry/fetchRegistry";
import { registryIndexSchema } from "../../../src/utils/registry/schema";

vi.mock("../error/handle-error", () => ({
  default: vi.fn(),
}));

vi.mock("../logging/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

vi.mock("./schema", () => ({
  registryIndexSchema: {
    parse: vi.fn((data) => data),
  },
}));

describe("Registry Fetch Functions", () => {
  const mockRegistryUrl = "https://basepl.com/registry";
  const mockFetchResponse: z.infer<typeof registryIndexSchema> = [
    {
      name: "test-package",
      type: "templates/blocks",
      dependencies: [],
      files: [
        {
          type: "templates/blocks",
          path: "src/test",
        },
      ],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.REGISTRY_URL = mockRegistryUrl;
    global.fetch = vi.fn();
  });

  describe("getRegistryIndex", () => {
    it("should fetch and parse registry index successfully", async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockFetchResponse),
      } as Response);

      const result = await getRegistryIndex();

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockRegistryUrl}/index.json`,
      );
      expect(result).toEqual(mockFetchResponse);
    });
  });

  describe("fetchRegistry", () => {
    it("should fetch registry data successfully", async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockFetchResponse),
      } as Response);

      const result = await fetchRegistry("test.json");

      expect(global.fetch).toHaveBeenCalledWith(`${mockRegistryUrl}/test.json`);
      expect(result).toEqual(mockFetchResponse);
    });

    it("should add .json extension if missing", async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockFetchResponse),
      } as Response);

      await fetchRegistry("test");

      expect(global.fetch).toHaveBeenCalledWith(`${mockRegistryUrl}/test.json`);
    });
  });
});
