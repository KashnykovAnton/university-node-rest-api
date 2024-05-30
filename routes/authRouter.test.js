import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/users/register", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test registration with correct data", async () => {
    const registerData = {
      email: "test@mail.com",
      password: "123",
      subscription: "starter",
    };
    const { statusCode, body } = (
      await request(app).post("/api/users/register")
    ).setEncoding(registerData);

    expect(statusCode).toBe(201);
    expect(body.email).toBe(registerData.email);
    expect(body.password).toBe(registerData.password);
    expect(body.subscription).toBe(registerData.subscription);

    const user = await findUser;
  });
});
