import { ENV } from "@/config/env";
import { http, HttpResponse } from "msw";

// Type definitions
interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface LoginResponse {
  data?: {
    user: User;
    tokens: AuthTokens;
  };
  errors?: {
    message: string;
  }[];
}

interface RegisterResponse {
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

interface RefreshResponse {
  data: {
    tokens: AuthTokens;
  };
}

// Mock data
const users: User[] = [{ id: 1, email: "test@example.com", name: "Test User" }];

const authTokens: AuthTokens = {
  access: "mock-jwt-token",
  refresh: "mock-refresh-token",
};

export const handlers = [
  http.post<never, { email: string; password: string }, LoginResponse>(
    `${ENV.VITE_API_URL}/auth/login`,
    async ({ request }) => {
      const { email, password } = await request.json();

      const user = users.find((u) => u.email === email);
      if (!user || password !== "password") {
        return HttpResponse.json(
          {
            errors: [{ message: "Invalid credentials" }],
          },
          { status: 401 }
        );
      }

      return HttpResponse.json({
        data: {
          user,
          tokens: authTokens,
        },
      });
    }
  ),

  http.post<never, Omit<User, "id">, RegisterResponse>(
    `${ENV.VITE_API_URL}/auth/register`,
    async ({ request }) => {
      const userData = await request.json();
      const newUser = {
        id: users.length + 1,
        ...userData,
      };
      users.push(newUser);

      return HttpResponse.json(
        {
          data: {
            user: newUser,
            tokens: authTokens,
          },
        },
        { status: 201 }
      );
    }
  ),

  http.post<never, never, RefreshResponse>(
    `${ENV.VITE_API_URL}/auth/refresh`,
    async () => {
      return HttpResponse.json({
        data: {
          tokens: {
            access: "new-mock-jwt-token",
            refresh: "new-mock-refresh-token",
          },
        },
      });
    }
  ),

  http.get<never, never, { data: User }>(`${ENV.VITE_API_URL}/users/me`, () => {
    return HttpResponse.json({
      data: users[0],
    });
  }),
];
