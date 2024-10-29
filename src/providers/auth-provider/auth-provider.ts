"use client";

import type { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";

const mockUsers = [
  {
    email: "demo@refine.dev",
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    roles: ["user"],
  },
];

export const authProvider: AuthBindings = {
  login: async ({ email }) => {

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
  register: async (params) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.email === params.email);

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
  forgotPassword: async (params) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.email === params.email);

    if (user) {
      //we can send email with reset password link here
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
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
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
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
