import { useLimiter, usePlayer } from "spacesvr";
import { Group, Vector3 } from "three";
import { useMemo, useRef } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import { HSLToRGB } from "../utils/HSLToRGB";

export type HeatCubeProps = {
  index: number; //an index keeping track of which cube this is in a heatmap
  heatVal: number; //value keeping track of hits
  size?: number; //size of each heatcube
  visible: boolean; // is heatcube visible or not
  enabled: boolean; // is heatcube generating data or not
  visitorMap: number[]; //current users' session map
  setVisitorMap: (visitorMap: number[]) => number[] | void; //set visitor map
} & GroupProps;

export default function HeatCube(props: HeatCubeProps) {
  const {
    size = 1,
    heatVal,
    index,
    visible,
    enabled,
    visitorMap,
    setVisitorMap,
    ...rest
  } = props;

  const SIZE = Math.max(size, 1);

  const ref = useRef<Group>(null);
  const { position } = usePlayer();
  const dummy = useMemo(() => new Vector3(), []);

  const freq = 10;
  const limiter = useLimiter(freq);

  const currentHeatVal = heatVal > 250 ? 250 : heatVal;
  const hue = 250 - currentHeatVal;
  const tempColor = HSLToRGB(hue, 100, 50);
  const opacity = visible ? 0.5 : 0;
  const hits = useRef(0);

  //faster color changes for localhost for better testing
  const amountToAdd = window.location.href.includes("localhost:3")
    ? 25
    : 0.02 / SIZE;

  useFrame(({ clock }) => {
    if (!limiter.isReady(clock) || !ref.current) return;

    ref.current.getWorldPosition(dummy);
    const dist = Math.max(dummy.distanceTo(position.get()), 0.25);
    const threshold = SIZE >= 2 ? SIZE / 2 : 1;
    if (dist < threshold && hits.current <= 250 && enabled) {
      hits.current = hits.current + amountToAdd;
      visitorMap[index] = hits.current;
      setVisitorMap(visitorMap);
    }
  });

  return (
    <group name="heatcube" ref={ref} {...rest}>
      <mesh>
        <boxBufferGeometry args={[SIZE, 0.05, SIZE]} attach="geometry" />
        <meshBasicMaterial
          color={tempColor}
          transparent={true}
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}
