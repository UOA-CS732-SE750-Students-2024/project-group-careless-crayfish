import { createContext, useContext, useState } from "react";
import { useAPI } from "../APIProvider";

const RecommendationContext = createContext({});

export const useRecommendation = () => useContext(RecommendationContext);

const RecommendationProvider = ({ children }) => {
  const { get, data, error } = useAPI();

  const getRecommendations = async (location) => {
    // 你这里不需要用他的return value.  直接从useAPI()里面拿data和error就行
    // 同时useAPI还和useSnackbar() 产生交互 如果有error会把error display到snackbar上
    await get(`http://localhost:3000/api/recommendations/${location}`);
    
  };

  

  return (
    <RecommendationContext.Provider value={{ getRecommendations }}>
      {children}
    </RecommendationContext.Provider>
  );
}

export default RecommendationProvider;