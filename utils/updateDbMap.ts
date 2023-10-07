//gets any changes from current visitor session, and pushes it
import { setHeatMapVal } from "../logic/heatmap";

export type UpdateDbMapParams = {
  UID: string;
  heatvals: number[];
  visitorMap: number[];
  uv: number | undefined;
};

export const updateDbMap = async (params: UpdateDbMapParams) => {
  const { UID, heatvals, visitorMap, uv } = params;

  //if uv isn't defined yet, heatvals isn't updated yet, so do not update yet
  if (uv === undefined) return;

  const storageKey = "heatmap-" + UID + "-unique-visits-set";
  const updatedUnique = localStorage.getItem(storageKey);
  let updateUnique = false;

  const updateChanged = () => {
    for (let i = 0; i < visitorMap.length; i++) {
      const element = visitorMap[i];
      if (element) {
        heatvals[i] = heatvals[i] + element;
        if (!updatedUnique) {
          updateUnique = true;
          localStorage.setItem(storageKey, "done");
        }
      }
      visitorMap[i] = 0;
    }
  };

  updateChanged();

  if (updateUnique) await setHeatMapVal(UID, heatvals, uv + 1);
  else await setHeatMapVal(UID, heatvals, uv);
};
