import { ENV } from "@/config/env";
import { rest } from "msw";

// Mock data
const users = [{ id: 1, email: "test@example.com", name: "Test User" }];

const authTokens = {
  access: "mock-jwt-token",
  refresh: "mock-refresh-token",
};

export const handlers = [
  // Auth endpoints
  rest.post(`${ENV.VITE_API_URL}/auth/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();

    const user = users.find((u) => u.email === email);
    if (!user || password !== "password") {
      return res(ctx.status(401), ctx.json({ message: "Invalid credentials" }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        user,
        tokens: authTokens,
      })
    );
  }),

  rest.post(`${ENV.VITE_API_URL}/auth/register`, async (req, res, ctx) => {
    const userData = await req.json();
    const newUser = {
      id: users.length + 1,
      ...userData,
    };
    users.push(newUser);

    return res(
      ctx.status(201),
      ctx.json({
        user: newUser,
        tokens: authTokens,
      })
    );
  }),

  rest.post(`${ENV.VITE_API_URL}/auth/refresh`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tokens: {
          access: "new-mock-jwt-token",
          refresh: "new-mock-refresh-token",
        },
      })
    );
  }),

  // User endpoints
  rest.get(`${ENV.VITE_API_URL}/users/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users[0]));
  }),
];
