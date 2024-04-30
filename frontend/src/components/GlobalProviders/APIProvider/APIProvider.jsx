import { createContext, useContext, useState } from "react";
import axios from "axios";

const APIContext = createContext({});

export const useAPI = () => useContext(APIContext);

/**
 * The APIProvider handles errors from apis. Displays error message on a snackbar.
 * @returns
 */
const APIProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const get = async (url) => {
    try {
      const response = await axios.get(url);
      setError(null);
      return response;
    } catch (error) {
      console.log(error);
      setError({ message: error.message, code: error.response?.status });
      return null;
    }
  };
  const post = async (url, body) => {
    try {
      const response = await axios.post(url, body);
      setError(null);
      return response;
    } catch (error) {
      console.log(error);
      setError({ message: error.message, code: error.response?.status });
      return null;
    }
  };
  const del = async (url) => {
    try {
      const response = await axios.delete(url);
      setError(null);
      return response;
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      return null;
    }
  };
  const put = async (url, body) => {
    try {
      const response = await axios.put(url, body);
      setError(null);
      return response;
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      return null;
    }
  };
  const patch = async (url, body) => {
    try {
      const response = await axios.patch(url, body);
      setError(null);
      return response;
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      return null;
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
