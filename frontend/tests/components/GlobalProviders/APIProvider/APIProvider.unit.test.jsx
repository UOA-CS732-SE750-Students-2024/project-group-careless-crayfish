import axios from "axios";
import { expect, test, vi } from "vitest";
import { APIProvider, useAPI } from "@frontend-ui/components/GlobalProviders";
import { act, renderHook, waitFor } from "@testing-library/react";
const mockData = { message: "Test" };
const mockError = { message: "Error", response: { status: 500 } };
const wrapper = ({ children }) => <APIProvider>{children}</APIProvider>;

vi.mock("axios");
// Tests for GET method
test("APIProvider updates state on successful GET request", async () => {
  // Given
  axios.get.mockResolvedValue({ data: mockData });
  const { result } = renderHook(() => useAPI(), { wrapper });
  // When
  act(() => {
    result.current.get("https://test.com");
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
test("APIProvider updates state on failed GET request", async () => {
  // Given
  axios.get.mockRejectedValue(mockError);
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.get("https://test.com");
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual({ message: "Error", code: 500 });
  });
});

// Tests for POST method
test("APIProvider updates state on successful POST request", async () => {
  // Given
  axios.post.mockResolvedValue({ data: mockData });
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.post("https://test.com", {});
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
test("APIProvider updates state on failed POST request", async () => {
  // Given
  axios.post.mockRejectedValue(mockError);
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.post("https://test.com", {});
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual({ message: "Error", code: 500 });
  });
});

// Tests for DELETE method
test("APIProvider updates state on successful DELETE request", async () => {
  // Given
  axios.delete.mockResolvedValue({ data: mockData });
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.del("https://test.com");
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
test("APIProvider updates state on failed DELETE request", async () => {
  // Given
  axios.delete.mockRejectedValue(mockError);
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.del("https://test.com");
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual({ message: "Error", code: 500 });
  });
});

// Tests for PUT method
test("APIProvider updates state on successful PUT request", async () => {
  // Given
  axios.put.mockResolvedValue({ data: mockData });
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.put("https://test.com", {});
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
test("APIProvider updates state on failed PUT request", async () => {
  // Given
  axios.put.mockRejectedValue(mockError);
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.put("https://test.com", {});
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual({ message: "Error", code: 500 });
  });
});

// Tests for PATCH method
test("APIProvider updates state on successful PATCH request", async () => {
  // Given
  axios.patch.mockResolvedValue({ data: mockData });
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.patch("https://test.com", {});
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
test("APIProvider updates state on failed PATCH request", async () => {
  // Given
  axios.patch.mockRejectedValue(mockError);
  const { result } = renderHook(() => useAPI(), { wrapper });

  // When
  act(() => {
    result.current.patch("https://test.com", {});
  });

  // Then
  await waitFor(() => {
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual({ message: "Error", code: 500 });
  });
});
