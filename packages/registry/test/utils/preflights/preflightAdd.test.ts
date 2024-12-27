import { existsSync } from "fs";
import path from "path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { addOptionsSchema } from "../../../src/commands/add";
import { logger } from "../../../src/utils/logging/logger";
import { preFlightAdd } from "../../../src/utils/preflights/preflightAdd";

vi.mock("fs");
vi.mock("path", () => ({
  default: {
    resolve: vi.fn(),
  },
}));
vi.mock("../../../src/utils/logging/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

const mockExit = vi
  .spyOn(process, "exit")
  .mockImplementation(() => undefined as never);

describe("preFlightAdd", () => {
  const addOptions: z.infer<typeof addOptionsSchema> = {
    components: ["test"],
    cwd: "/test/path",
    yes: true,
    overwrite: false,
    config: false,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(path.resolve).mockImplementation((...args) => args.join("/"));
  });

  it("should pass when project directory and package.json exist", () => {
    vi.mocked(existsSync)
      .mockReturnValueOnce(true) // project directory exists
      .mockReturnValueOnce(true); // package.json exists

    preFlightAdd(addOptions);

    expect(logger.error).not.toHaveBeenCalled();
    expect(mockExit).not.toHaveBeenCalled();
  });

  it("should exit when project directory does not exist", () => {
    vi.mocked(existsSync).mockReturnValue(false);

    preFlightAdd(addOptions);

    expect(logger.error).toHaveBeenCalledWith(
      "Target project does not exist or is not a valid Payload project",
    );
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("should exit when package.json does not exist", () => {
    vi.mocked(existsSync)
      .mockReturnValueOnce(true) // project directory exists
      .mockReturnValueOnce(false); // package.json doesn't exist

    preFlightAdd(addOptions);

    expect(logger.error).toHaveBeenCalledWith(
      "Target project does not exist or is not a valid Payload project",
    );
    expect(mockExit).toHaveBeenCalledWith(0);
  });
});
