//generate the heatmap
import HeatCube from "./HeatCube";
import { useMemo } from "react";
import { useHeatmapContext } from "../context/HeatmapLayer";

export default function GenerateMap() {
  const {
    GRID,
    SIZE,
    uv,
    VISIBLE,
    ENABLED,
    heatvals,
    visitorMap,
    setVisitorMap,
  } = useHeatmapContext();

  const cubes = useMemo(() => {
    return heatvals.map((item: number, i: number) => (
      <HeatCube
        position={[(i % GRID) * SIZE, 0, Math.floor(i / GRID) * SIZE]}
        key={i}
        index={i}
        heatVal={uv && uv > 0 ? item / uv : item}
        size={SIZE}
        visible={VISIBLE}
        enabled={ENABLED}
        visitorMap={visitorMap}
        setVisitorMap={setVisitorMap}
      />
    ));
  }, [heatvals, visitorMap, GRID, SIZE, VISIBLE, ENABLED]);

  return <> {cubes} </>;
}
