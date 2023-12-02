import { test, expect } from "@playwright/test";

const cookies = [
  {
    name: "next-auth.session-token",
    value: "d2727680-593a-4c47-b8d7-544a50817a45",
    path: "/",
    domain: "localhost",
  },
  {
    name: "next-auth.callback-url",
    value: "http%3A%2F%2Flocalhost%3A3000%2Fsign-in",
    path: "/",
    domain: "localhost",
  },
  {
    name: "sb-localhost-auth-token",
    value:
      "%5B%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzAwMzQ5ODYxLCJpYXQiOjE3MDAzNDYyNjEsInN1YiI6ImY2ZjRiYmYzLWQ0ZGEtNDFhNS1iOGI4LTJmZGMxN2RiOWM1NSIsImVtYWlsIjoiZGV2Lm9za2FyLmVyaWtzc29uQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSVZfWnZjN2pxejVvVFAxcXlFdmRwd19ocUFwRV9EcDNySWM3TV9yamN1X3c9czk2LWMiLCJlbWFpbCI6ImRldi5vc2thci5lcmlrc3NvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiT3NrYXIgRXJpa3Nzb24iLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoiT3NrYXIgRXJpa3Nzb24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSVZfWnZjN2pxejVvVFAxcXlFdmRwd19ocUFwRV9EcDNySWM3TV9yamN1X3c9czk2LWMiLCJwcm92aWRlcl9pZCI6IjEwOTE4ODAxMjA5NjY3MDQ3MTMwNiIsInN1YiI6IjEwOTE4ODAxMjA5NjY3MDQ3MTMwNiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzAwMjk3NjUyfV0sInNlc3Npb25faWQiOiJmMzc3NzQzMS05ZTEwLTQ1OTktYWNjZC0yODUwMTYzNWMxOWMifQ.Ommw8tWnGxwQehL9ZESvqbhAuy_EaCYQw_ns13MpX-o%22%2C%22yj-laDxTA8ogyLstnHEoVQ%22%2Cnull%2Cnull%2Cnull%5D",
    path: "/",
    domain: "localhost",
  },
  {
    name: "next-auth.csrf-token",
    value:
      "ede81c3063c3932d112e2f1cfc75279f863e309b58051828e9af9747ec2e92ec%7Ce9e3a029346ffb15e5f82061ed56d5c6e290bd608ed97caa3afb59fe4f67f244",
    path: "/",
    domain: "localhost",
  },
];

test("has title", async ({ browser }) => {
  const browserContext = await browser.newContext();

  await browserContext.addCookies(cookies);

  const page = await browserContext.newPage();

  await page.goto("http://localhost:3000");

  await page.goto("http://localhost:3000/coaching/data/foods");

  await -page.waitForTimeout(5000);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
