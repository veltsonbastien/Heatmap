/* polls the DB once every minute or every pause if visible */
import { useEffect } from "react";
import { useHeatmapContext } from "../context/HeatmapLayer";
import { getDbMap } from "../utils/getDbMap";
import { updateDbMap } from "../utils/updateDbMap";
import { useEnvironment } from "spacesvr";

export const PollDb = () => {
  const {
    arraySize,
    ENABLED,
    UID,
    GRID,
    heatvals,
    visitorMap,
    uv,
    setHeatvals,
    setUv,
  } = useHeatmapContext();

  const { paused } = useEnvironment();

  useEffect(() => {
    const getDbParams = {
      UID,
      arraySize,
    };

    const updateDbParams = {
      UID,
      GRID,
      heatvals,
      visitorMap,
      uv,
    };

    const getDb = async () => {
      const res = await getDbMap(getDbParams);
      setUv(res.uv);
      setHeatvals(res.vals);
    };

    getDb();
    if (ENABLED) updateDbMap(updateDbParams);

    //continuously run every minute
    const interval = setInterval(() => {
      getDb();
      if (ENABLED) updateDbMap(updateDbParams);
    }, 60000);

    return () => clearInterval(interval);
  }, [visitorMap, paused, ENABLED]);

  return null;
};
