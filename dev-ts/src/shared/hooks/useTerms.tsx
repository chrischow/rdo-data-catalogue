import { useQuery } from "react-query";
import { config } from "../../config";
import { constructUrl, constructQueryFn, BusinessTermSchema } from "../utils";

// Get all terms
/**
 * 
 * @returns Array of business term objects
 */
export const useTerms = () => {
  const url: string = constructUrl(config.businessTermListId, 'Id,Title,definition,businessRules,Source');
  return useQuery(['businessTerms'], constructQueryFn(url), {
    staleTime: 2 * 60 * 1000
  });
};

export const useTerm = (termId: number) => {
  const allTerms = useTerms();
  return allTerms.isSuccess ? allTerms.data.find((term: BusinessTermSchema) => {
    return term.Id === termId;
  }) : null;
};