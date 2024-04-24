import { createContext, useContext, useState } from "react";
import axios from "axios";

/**
 * It is a snackbar and it is an error handler for api calls.
 */
const APIContext = createContext({});

export const useAPI = () => useContext(APIContext);

const APIProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const get = async (url) => {
    try {
      const response = await axios.get(url);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
    }
  };
  const post = async (url, body) => {
    try {
      const response = await axios.post(url, body);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
    }
  };
  const del = async (url) => {
    try {
      const response = await axios.delete(url);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
    }
  };
  const put = async (url, body) => {
    try {
      const response = await axios.put(url, body);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
    }
  };
  const patch = async (url, body) => {
    try {
      const response = await axios.patch(url, body);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
    }
  };
  return (
    <APIContext.Provider
      value={{ error, get, post, del, put, patch, setError }}
    >
      {children}
    </APIContext.Provider>
  );
};
export default APIProvider;
