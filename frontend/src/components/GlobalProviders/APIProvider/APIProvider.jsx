import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useSnackbar } from "@frontend-ui/components/Snackbar";

const APIContext = createContext({});

export const useAPI = () => useContext(APIContext);

const APIProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { setOpen } = useSnackbar();

  const get = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError({ message: error.message, code: error.response?.status });
      setData(null);
      setOpen(true);
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
      setOpen(true);
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
      setOpen(true);
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
      setOpen(true);
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
      setOpen(true);
    }
  };
  return (
    <APIContext.Provider value={{ data, error, get, post, del, put, patch }}>
      {children}
    </APIContext.Provider>
  );
};
export default APIProvider;
