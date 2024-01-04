import { test, expect } from '@playwright/test';
type HashTab = Record<string,string>;
test('test example', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState();
  const menuArray = page.getByRole("menuitem");
  const menuCount = await menuArray.count();
  for (let i = 0;i < menuCount;i++) {
    await expect(menuArray.nth(i)).toBeVisible();
    await menuArray.nth(i).click();
    await expect(page.getByTestId("tableArea")).toBeVisible();
    const addBtn = page.getByRole("button",{name: "添 加"});
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    const submitBtn = page.getByRole("button",{name: "Submit"});
    await expect(submitBtn).toBeVisible();
    const okBtn = page.getByRole("button",{name: "OK"});
    await expect(okBtn).toBeVisible();
    const cancelBtn = page.getByRole("button",{name: "Cancel"});
    await expect(cancelBtn).toBeVisible();
    await cancelBtn.click();
    const delBtn = page.getByRole("button",{name: "删 除"});
    const delBtnCount = await delBtn.count();
    const changeBtn = page.getByRole("button",{name: "修 改"});
    const changeBtnCount = await changeBtn.count();
    expect(changeBtnCount).toEqual(delBtnCount);
  }
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
