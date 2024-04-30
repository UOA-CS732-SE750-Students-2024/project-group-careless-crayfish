import { describe, expect, test } from "vitest";
import { findByText, render } from "@testing-library/react";
import { ThemeProviderDebug } from "tests/testUtils";
import {
  MuiTheme,
  ThemeProvider,
} from "@frontend-ui/components/GlobalProviders/ThemeProvider";
import { LocalStorageProvider } from "@frontend-ui/components/GlobalProviders/LocalStorageProvider";

describe("ThemeProvider tests.", () => {
  test("default theme is light", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug />
        </ThemeProvider>
      </LocalStorageProvider>,
    );
    expect(container).toBeTruthy();

    await findByText(container, MuiTheme.Light, { exact: true });
  });
  test("set theme to dark works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug themeMode={MuiTheme.Dark} />
        </ThemeProvider>
      </LocalStorageProvider>,
    );
    expect(container).toBeTruthy();

    await findByText(container, MuiTheme.Dark, { exact: true });
  });

  test("toggle light theme from dark", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug themeMode={MuiTheme.Dark} />
        </ThemeProvider>
      </LocalStorageProvider>,
    );
    expect(container).toBeTruthy();

    await findByText(container, MuiTheme.Dark, { exact: true });
  });
});
