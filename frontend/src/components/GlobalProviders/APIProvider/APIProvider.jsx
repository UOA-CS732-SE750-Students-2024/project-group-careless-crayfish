import { createContext, useContext, useState } from "react";
import axios from "axios";

const APIContext = createContext({});

export const useAPI = () => useContext(APIContext);

const APIProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const get = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      setData(null);
    }
  };
  const post = async (url, body) => {
    try {
      const response = await axios.post(url, body);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      setData(null);
    }
  };
  const del = async (url) => {
    try {
      const response = await axios.delete(url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      setData(null);
    }
  };
  const put = async (url, body) => {
    try {
      const response = await axios.put(url, body);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      setData(null);
    }
  };
  const patch = async (url, body) => {
    try {
      const response = await axios.patch(url, body);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      setData(null);
    }
  };
  return (
    <APIContext.Provider
      value={{ data, error, get, post, del, put, patch, setError }}
    >
      {children}
    </APIContext.Provider>
  );
};
export default APIProvider;
