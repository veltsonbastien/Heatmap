export default function HeatObject() {
  return (
    <group>
      <mesh>
        <boxBufferGeometry args={[1, 0.1, 1]} attach="geometry" />
        <meshBasicMaterial color={"red"} transparent={true} opacity={0.5} />
      </mesh>
    </group>
  );
}
