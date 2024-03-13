import tailtrack from "../index";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        error: true,
        message: "fail",
      }),
    ok: true,
  })
) as jest.Mock;

describe("core tests", () => {
  beforeEach(() => {
    process.env.TAILTRACK_API_KEY = "API-KEY";
  });
  afterAll(() => {
    delete process.env.TAILTRACK_API_KEY;
  });
  test("env not set", async () => {
    delete process.env.TAILTRACK_API_KEY;
    const res = await tailtrack({
      namespace: "",
    });
    expect(res).toEqual({
      error: true,
      message: "Please set TAILTRACK_API_KEY in your .env file",
    });
  });
  test("empty namespace", async () => {
    const res = await tailtrack({
      namespace: "",
    });
    expect(res).toEqual({
      error: true,
      message: "namespace can't be empty",
    });
  });
  test("API throws error", async () => {
    const res = await tailtrack({
      namespace: "test",
    });
    expect(res).toEqual({
      error: true,
      message: "fail",
    });
  });
  test("API works", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: false,
            message: "success",
          }),
        ok: true,
      })
    ) as jest.Mock;
    const res = await tailtrack({
      namespace: "test",
    });
    expect(res).toEqual({
      error: false,
      message: "success",
    });
  });
});
