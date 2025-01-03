import prompts from "prompts";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {init} from "../../src/commands/init";
import {createConfig, defaultConfig,} from "../../src/utils/config/configHandler";
import {getPackageManager} from "../../src/utils/getPackageManager";
import {initShadcn} from "../../src/utils/initShadcn";
import {checkProjectSetUp, checkShadcnPresents, getPayloadAppDetails,} from "../../src/utils/preflights/preflightInit";
import {logger} from "../../src/utils/logging/logger";

vi.mock("prompts");
vi.mock("../../src/utils/config/configHandler");
vi.mock("../../src/utils/getPackageManager");
vi.mock("../../src/utils/preflights/preflightInit");
vi.mock("../../src/utils/initShadcn");
vi.mock("ora");
vi.mock("../../src/utils/logging/logger", () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    break: vi.fn(),
  },
  loggingColor: {
    success: vi.fn((str) => str),
    info: vi.fn((str) => str),
  },
}));
vi.mock("../../src/utils/spinner", () => ({
  spinner: vi.fn().mockReturnValue({
    start: vi.fn().mockReturnThis(),
    fail: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
  }),
}));

describe("init command", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createConfig).mockResolvedValue(undefined);
    vi.mocked(getPackageManager).mockResolvedValue("npm");
    vi.mocked(checkProjectSetUp).mockResolvedValue(true);
    vi.mocked(getPayloadAppDetails).mockResolvedValue({
      isSupportedPayloadVersion: true,
      isSrcDir: true,
      payloadVersion: "3.9.0",
    });
    vi.mocked(initShadcn).mockResolvedValue(undefined);
    vi.mocked(prompts).mockResolvedValue({proceed: true});
  });

  it("should successfully initialize with default options", async () => {
    await init.parseAsync(["node", "test", "init", "--cwd", "/test/path"]);

    expect(checkProjectSetUp).toHaveBeenCalledWith("/test/path");
    expect(createConfig).toHaveBeenCalledWith("/test/path", {
      ...defaultConfig,
      shadcnInstalled: true,
    });
  });

  it("should exit when Payload is not present", async () => {
    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never);
    vi.mocked(checkProjectSetUp).mockResolvedValue(false);

    await init.parseAsync(["node", "test", "init", "--cwd", "/test/path"]);

    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("should skip Shadcn installation in config-only mode", async () => {
    await init.parseAsync([
      "node",
      "test",
      "init",
      "--cwd",
      "/test/path",
      "--config",
    ]);

    expect(getPackageManager).not.toHaveBeenCalled();
    expect(initShadcn).not.toHaveBeenCalled();
  });

  it("should prompt for confirmation when --yes is false", async () => {
    await init.parseAsync([
      "node",
      "test",
      "init",
      "--cwd",
      "/test/path",
      "--yes",
      "false",
    ]);

    expect(prompts).toHaveBeenCalledWith({
      type: "confirm",
      name: "proceed",
      message: expect.any(String),
      initial: true,
    });
  });

  it("should handle unsupported Payload version", async () => {
    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never);
    vi.mocked(getPayloadAppDetails).mockResolvedValue({
      isSupportedPayloadVersion: false,
      isSrcDir: true,
      payloadVersion: "2.9.0",
    });

    await init.parseAsync(["node", "test", "init", "--cwd", "/test/path"]);

    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("should handle errors gracefully", async () => {
    const testError = new Error("Test error");
    vi.mocked(checkProjectSetUp).mockRejectedValue(testError);

    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never);

    await init.parseAsync(["node", "test", "init", "--cwd", "/test/path"]);

    // Verify error handling
    expect(vi.mocked(logger.break)).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
  });
});
