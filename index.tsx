import { GroupProps } from "@react-three/fiber";
import GenerateMap from "./components/GenerateMap";
import HeatmapLayer from "./context/HeatmapLayer";
import HeatObject from "./components/HeatObject";

export type HeatmapProps = {
  name?: string; //used for analytics name and document uid in firebase
  size?: number; //the size of each heatcube
  visible?: boolean; // if the creator wants to see heatmap or not
  enabled?: boolean; // if the creator wants to see heatmap or not
  grid?: number; //gets squared to make a grid
} & GroupProps;

export default function HeatMap(props: HeatmapProps) {
  const {
    name = "map",
    grid = 5,
    size = 1,
    visible = true,
    enabled = true,
    ...rest
  } = props;

  return (
    <group name="heatmap" {...rest}>
      <HeatmapLayer
        name={name}
        grid={grid}
        size={size}
        visible={visible}
        enabled={enabled}
      >
        {!visible && <HeatObject />}
        <GenerateMap />
      </HeatmapLayer>
    </group>
  );
}
