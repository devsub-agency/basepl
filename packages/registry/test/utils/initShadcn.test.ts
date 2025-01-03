import { describe, it, vi, expect, beforeEach } from "vitest";
import { execa } from "execa";
import { initShadcn } from "../../src/utils/initShadcn";
import handleError from "../../src/utils/error/handle-error";

vi.mock("execa", () => ({
  execa: vi.fn(),
}));

vi.mock("../../src/utils/error/handle-error", () => ({
  default: vi.fn(),
}));

describe("initShadcn", () => {
  const mockCwd = "/test/path";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should execute npm command correctly", async () => {
    await initShadcn({ cwd: mockCwd, packageManager: "npm" });

    expect(execa).toHaveBeenCalledWith("npx", ["shadcn@latest", "init"], {
      cwd: mockCwd,
      stdio: "inherit",
      shell: true,
    });
  });

  it("should execute pnpm command correctly", async () => {
    await initShadcn({ cwd: mockCwd, packageManager: "pnpm" });

    expect(execa).toHaveBeenCalledWith(
      "pnpm",
      ["dlx", "shadcn@latest", "init"],
      {
        cwd: mockCwd,
        stdio: "inherit",
        shell: true,
      },
    );
  });

  it("should execute yarn command correctly", async () => {
    await initShadcn({ cwd: mockCwd, packageManager: "yarn" });

    expect(execa).toHaveBeenCalledWith(
      "yarn",
      ["dlx", "shadcn@latest", "init"],
      {
        cwd: mockCwd,
        stdio: "inherit",
        shell: true,
      },
    );
  });

  it("should work with empty cwd", async () => {
    await initShadcn({ cwd: "", packageManager: "npm" });

    expect(execa).toHaveBeenCalledWith("npx", ["shadcn@latest", "init"], {
      cwd: "",
      stdio: "inherit",
      shell: true,
    });
  });

  it("should not call handleError on successful execution", async () => {
    await initShadcn({ cwd: mockCwd, packageManager: "npm" });

    expect(handleError).not.toHaveBeenCalled();
  });

  it("should handle execution errors", async () => {
    const mockError = new Error("Command failed");
    vi.mocked(execa).mockRejectedValueOnce(mockError);

    await initShadcn({ cwd: mockCwd, packageManager: "npm" });

    expect(handleError).toHaveBeenCalledWith(mockError);
  });
});
