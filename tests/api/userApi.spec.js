const { test, expect } = require("@playwright/test");

test.describe("Backend API Automation", () => {
  test("GET - Fetch user details from API", async ({ request }) => {
    // Send a GET HTTP request to backend server
    const response = await request.get("https://reqres.in/api/users/2");

    // Assert server status code is 200 OK
    expect(response.status()).toBe(200);

    // Convert raw response into JSON object
    const body = await response.json();

    // Assert user email matches expected backend value
    expect(body.data.email).toBe("janet.weaver@reqres.in");
  });
});
