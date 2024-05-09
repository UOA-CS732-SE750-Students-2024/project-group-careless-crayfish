import axios from "axios";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  APIProvider,
  AuthProvider,
  LocalStorageProvider,
  useAPI,
  useAuth,
} from "@frontend-ui/components/GlobalProviders";
import { act, renderHook } from "@testing-library/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Mocking axios globally
vi.mock("axios");
describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("login sets isAuthenticated to true", async () => {
    // given
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <GoogleOAuthProvider clientId="1083292527788-2ehr1pss5tjac6156qk7likrbu4eps58.apps.googleusercontent.com">
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
      ),
    });

    //when
    act(() => {
      result.current.login();
    });

    //then

    expect(result.current.isAuthenticated).toBe(true);
  });

  test("logout sets isAuthenticated to false", async () => {
    //given
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <GoogleOAuthProvider clientId="1083292527788-2ehr1pss5tjac6156qk7likrbu4eps58.apps.googleusercontent.com">
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
      ),
    });

    //when

    act(() => {
      result.current.logout();
    });

    //then
    expect(result.current.isAuthenticated).toBe(false);
  });

  test("getUserById calls API and returns user data", async () => {
    //given
    const mockUserData = { userId: "123", userName: "Test User" };
    axios.get.mockResolvedValue({ data: mockUserData });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <APIProvider>
          <GoogleOAuthProvider clientId="1083292527788-2ehr1pss5tjac6156qk7likrbu4eps58.apps.googleusercontent.com">
            <AuthProvider>{children}</AuthProvider>
          </GoogleOAuthProvider>
        </APIProvider>
      ),
    });

    // when
    const userData = await result.current.getUserById("123");

    //then
    expect(userData).toEqual({
      data: { userId: "123", userName: "Test User" },
    });
  });

  test("createUser calls API to create user", async () => {
    //given
    const mockUserData = { userId: "123", userName: "Test User" };
    axios.post.mockResolvedValue({ data: mockUserData });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <APIProvider>
          <GoogleOAuthProvider clientId="1083292527788-2ehr1pss5tjac6156qk7likrbu4eps58.apps.googleusercontent.com">
            <AuthProvider>{children}</AuthProvider>
          </GoogleOAuthProvider>
        </APIProvider>
      ),
    });

    //when
    const newUser = await result.current.createUser({
      email: "test@example.com",
      userName: "Test User",
    });

    //then
    expect(newUser).toEqual({
      data: { userId: "123", userName: "Test User" },
    });
  });
});
