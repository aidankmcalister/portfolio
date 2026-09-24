import { expect, test } from "@playwright/test";

const pages = ["/", "/work", "/about", "/blog/your-docs-are-invisible-to-ai", "/404"];

test.use({ viewport: { width: 375, height: 812 } });

for (const path of pages) {
  test(`${path} has no horizontal scroll at 375px`, async ({ page }) => {
    await page.goto(path);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });

  test(`${path} tap targets are at least 44px tall`, async ({ page }) => {
    await page.goto(path);
    // Links set inline within a sentence are exempt (WCAG 2.5.8 inline exception).
    const small = await page.$$eval("a, button", (els) =>
      els
        .filter((el) => getComputedStyle(el).display !== "inline")
        .map((el) => ({ text: el.textContent?.trim().slice(0, 30), h: el.getBoundingClientRect().height }))
        .filter((e) => e.h > 0 && e.h < 44),
    );
    expect(small).toEqual([]);
  });
}
