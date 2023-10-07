/* context information for Heatmap */
import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { HeatmapProps } from "../index";
import { PollDb } from "../components/PollDb";

export type HeatmapContextProps = {
  children: ReactNode | ReactNode[];
} & HeatmapProps;

export type HeatmapState = {
  SIZE: number;
  GRID: number;
  VISIBLE: boolean;
  ENABLED: boolean;
  arraySize: number;
  UID: string;
  heatvals: number[];
  setHeatvals: (heatvals: number[]) => number[] | void;
  visitorMap: number[];
  setVisitorMap: (visitorMap: number[]) => number[] | void;
  uv: number | undefined;
  setUv: (uv: number) => number | void;
} & HeatmapProps;

export const HeatmapContext = createContext({} as HeatmapState);
export const useHeatmapContext = () => useContext(HeatmapContext);

export default function HeatmapLayer(props: HeatmapContextProps) {
  const { name, grid, size, visible, enabled, children } = props;

  const SIZE = size ? Math.max(size, 0.25) : 1;
  const GRID = grid || 1;

  const SLUG = window.location.pathname.replace("/", "");
  const HOST = window.location.hostname.replaceAll(".", "");
  const PATH = HOST + "-" + SLUG;
  const TEMP_UID = `heatmap-${PATH}-${name}`;
  const UID = TEMP_UID.replaceAll("/", "");

  const ENABLED = enabled || false;
  const VISIBLE = visible || false;

  const arraySize = GRID * GRID;

  const allZeros = useMemo(() => {
    return new Array(arraySize).fill(0);
  }, [arraySize]);

  const [heatvals, setHeatvals] = useState(allZeros);
  const [uv, setUv] = useState<number>();
  const [visitorMap, setVisitorMap] = useState(allZeros);

  const heatmapState = {
    ENABLED,
    VISIBLE,
    UID,
    SIZE,
    GRID,
    arraySize,
    heatvals,
    setHeatvals,
    visitorMap,
    setVisitorMap,
    uv,
    setUv,
  };

  return (
    <HeatmapContext.Provider value={heatmapState}>
      <PollDb />
      {children}
    </HeatmapContext.Provider>
  );
}
