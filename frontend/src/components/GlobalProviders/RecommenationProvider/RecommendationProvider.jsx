import { createContext, useContext, useState } from "react";
import { useAPI } from "../APIProvider";

const RecommendationContext = createContext({});

export const useRecommendation = () => useContext(RecommendationContext);

const RecommendationProvider = ({ children }) => {
  const { get, data, error } = useAPI();

  const getRecommendations = async (location) => {
    // 你这里不用await 直接从useAPI()里面拿data和error就行
    // 同时useAPI还和useSnackbar() 产生交互 如果有error会把error display到snackbar上
    const recommendations = data.recommendations;
    const recommendationErrors = error.message;
    return recommendations;
  };

  return (
    <RecommendationContext.Provider value={{ getRecommendations }}>
      {children}
    </RecommendationContext.Provider>
  );
}

export default RecommendationProvider;