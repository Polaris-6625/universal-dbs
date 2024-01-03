import { test, expect } from '@playwright/test';
type HashTab = Record<string,string>;
test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState();
  const menuArray = page.getByRole("menuitem");
  const menuCount = await menuArray.count();
  for (let i = 0;i < menuCount;i++) {
    await expect(menuArray.nth(i)).toBeVisible();
    await menuArray.nth(i).click();
    await expect(page.getByTestId("tableArea")).toBeVisible();
    const addBtn = page.getByRole("button",{name: "添加"});
    await addBtn.click();
  }
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
