import axios from "axios";
import { expect, test, vi } from "vitest";
import { APIProvider, useAPI } from "@frontend-ui/components/GlobalProviders";
import { act, renderHook } from "@testing-library/react";

const mockData = { message: "Test" };
const mockSuccessResponse = { data: mockData };
const mockError = { message: "Error", response: { status: 500 } };

// Mocking axios globally
vi.mock("axios");

// Wrapper component for APIProvider
const wrapper = ({ children }) => <APIProvider>{children}</APIProvider>;

// Tests for GET method
test("APIProvider updates state on successful GET request", async () => {
  // Mocking successful axios.get request
  axios.get.mockResolvedValue({ data: mockData });

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the get method
  let resp = null;
  await act(async () => {
    resp = await result.current.get("https://test.com");
  });

  // Asserting the response and error state
  expect(resp).toEqual(mockSuccessResponse);
  expect(result.current.error).toBeNull();
});

test("APIProvider updates state on failed GET request", async () => {
  // Mocking failed axios.get request
  axios.get.mockRejectedValue(mockError);

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the get method
  let resp = null;
  await act(async () => {
    resp = await result.current.get("https://test.com");
  });

  // Asserting the response and error state
  expect(resp).toBeFalsy();
  expect(result.current.error).toEqual({ message: "Error", code: 500 });
});

// Tests for POST method
test("APIProvider updates state on successful POST request", async () => {
  // Mocking successful axios.post request
  axios.post.mockResolvedValue({ data: mockData });

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the post method
  let resp = null;
  await act(async () => {
    resp = await result.current.post("https://test.com", {});
  });

  // Asserting the response and error state
  expect(resp).toEqual(mockSuccessResponse);
  expect(result.current.error).toBeNull();
});

test("APIProvider updates state on failed POST request", async () => {
  // Mocking failed axios.post request
  axios.post.mockRejectedValue(mockError);

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the post method
  let resp = null;
  await act(async () => {
    resp = await result.current.post("https://test.com", {});
  });

  // Asserting the response and error state
  expect(resp).toBeFalsy();
  expect(result.current.error).toEqual({ message: "Error", code: 500 });
});

// Tests for DELETE method
test("APIProvider updates state on successful DELETE request", async () => {
  // Mocking successful axios.delete request
  axios.delete.mockResolvedValue({ data: mockData });

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the delete method
  let resp = null;
  await act(async () => {
    resp = await result.current.del("https://test.com");
  });

  // Asserting the response and error state
  expect(resp).toEqual(mockSuccessResponse);
  expect(result.current.error).toBeNull();
});

test("APIProvider updates state on failed DELETE request", async () => {
  // Mocking failed axios.delete request
  axios.delete.mockRejectedValue(mockError);

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the delete method
  let resp = null;
  await act(async () => {
    resp = await result.current.del("https://test.com");
  });

  // Asserting the response and error state
  expect(resp).toBeFalsy();
  expect(result.current.error).toEqual({ message: "Error", code: 500 });
});

// Tests for PUT method
test("APIProvider updates state on successful PUT request", async () => {
  // Mocking successful axios.put request
  axios.put.mockResolvedValue({ data: mockData });

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the put method
  let resp = null;
  await act(async () => {
    resp = await result.current.put("https://test.com", {});
  });

  // Asserting the response and error state
  expect(resp).toEqual(mockSuccessResponse);
  expect(result.current.error).toBeNull();
});

test("APIProvider updates state on failed PUT request", async () => {
  // Mocking failed axios.put request
  axios.put.mockRejectedValue(mockError);

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the put method
  let resp = null;
  await act(async () => {
    resp = await result.current.put("https://test.com", {});
  });

  // Asserting the response and error state
  expect(resp).toBeFalsy();
  expect(result.current.error).toEqual({ message: "Error", code: 500 });
});

// Tests for PATCH method
test("APIProvider updates state on successful PATCH request", async () => {
  // Mocking successful axios.patch request
  axios.patch.mockResolvedValue({ data: mockData });

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the patch method
  let resp = null;
  await act(async () => {
    resp = await result.current.patch("https://test.com", {});
  });

  // Asserting the response and error state
  expect(resp).toEqual(mockSuccessResponse);
  expect(result.current.error).toBeNull();
});

test("APIProvider updates state on failed PATCH request", async () => {
  // Mocking failed axios.patch request
  axios.patch.mockRejectedValue(mockError);

  // Rendering the hook with APIProvider wrapper
  const { result } = renderHook(() => useAPI(), { wrapper });

  // Triggering the patch method
  let resp = null;
  await act(async () => {
    resp = await result.current.patch("https://test.com", {});
  });

  // Asserting the response and error state
  expect(resp).toBeFalsy();
  expect(result.current.error).toEqual({ message: "Error", code: 500 });
});
