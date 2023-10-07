/* returns true once we properly got the database */
import { retrieveHeatMapVal, setHeatMapVal } from "../logic/heatmap";

export type GetDbMapParams = {
  arraySize: number;
  UID: string;
};

export const getDbMap = async (params: GetDbMapParams) => {
  const { arraySize, UID } = params;

  const result = await retrieveHeatMapVal(UID);

  //if it doesn't exist, create the entry
  if (!result) {
    const allZeros = new Array(arraySize).fill(0);
    console.log("didn't find DbMap, creating...");
    await setHeatMapVal(UID, allZeros, 0);
    return { uv: 0, vals: allZeros };
  }

  return { uv: result.uniqueVisits, vals: result.heatmapVals };
};
