import { useQuery } from "react-query";
import { config } from "../config";
import { constructUrl, constructQueryFn, DatasetSchema } from "../utils/utils";

// Get all datasets
/**
 * 
 * @returns Array of dataset objects
 */
export const useDatasets = () => {
  const url: string = constructUrl(config.datasetListId, 'Id,Title,useCases,owner,pointOfContact,dataDomain');
  return useQuery(['datasets'], constructQueryFn(url), {
    staleTime: 2 * 60 * 1000
  });
};

// Get dataset by ID
/**
 * 
 * @param datasetId SharePoint-assigned ID for dataset List
 * @returns Single dataset object if it exists, null otherwise
 */
export const useDataset = (datasetId: number) => {
  const allDatasets = useDatasets();
  return allDatasets.isSuccess ? allDatasets.data.find((dataset: DatasetSchema) => {
    return dataset.Id === datasetId;
  }) : null;
};

// Get dataset by data domain
/**
 * 
 * @param dataDomain Data domain
 * @returns Object: with (1) array of dataset objects belonging to the provided data domain
 *                       (2) boolean indicating whether query was successful
 */
export const useDatasetByDomain = (dataDomain: string) => {
  const allDatasets = useDatasets();
  const datasets: DatasetSchema[] = allDatasets.isSuccess ? allDatasets.data.filter((dataset: DatasetSchema) => {
    return dataset.dataDomain === dataDomain;
  }) : [];
  return {datasets: datasets, datasetsIsSuccess: allDatasets.isSuccess};
}