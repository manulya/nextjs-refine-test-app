"use client";

import { HttpError, type AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";

import { IAuth } from "@interfaces/interfaces";

const mockUsers = [
  {
    email: "demo@refine.dev",
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    roles: ["user"],
  },
];

const authProvider: AuthBindings = {
  login: async ({ email }) => {
    await Promise.resolve();

    const user = mockUsers.find((item) => item.email === email);

    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  register: async (params: { email: string }) => {
    await Promise.resolve();

    const user = mockUsers.find((item: IAuth) => item.email === params.email);

    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async (params: { email: string }) => {
    await Promise.resolve();

    const user = mockUsers.find((item) => item.email === params.email);

    if (user) {
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },

  logout: async () => {
    await Promise.resolve();

    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    await Promise.resolve();
    const auth = Cookies.get("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },

  getIdentity: async () => {
    await Promise.resolve();
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth) as IAuth;

      return parsedUser;
    }
    return null;
  },
  onError: async (error: HttpError | Error) => {
    await Promise.resolve();

    if (
      "response" in error &&
      (error.response as { status?: number })?.status === 401
    ) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};

export default authProvider;
