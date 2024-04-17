import { createContext, useContext, useState } from "react";
import { useAPI } from "../APIProvider";

const RecommendationContext = createContext({});

export const useRecommendation = () => useContext(RecommendationContext);

const RecommendationProvider = ({ children }) => {
  const { get } = useAPI();

  const getRecommendations = async (location) => {
    const recommendations = await get(`http://localhost:3000/api/recommendations/${location}`);
    return recommendations;
  };

  return (
    <RecommendationContext.Provider value={{ getRecommendations }}>
      {children}
    </RecommendationContext.Provider>
  );
}

export default RecommendationProvider;