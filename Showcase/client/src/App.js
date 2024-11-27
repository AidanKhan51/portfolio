import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/Fafnir.glb");
  return <primitive object={scene} {...props} />
}

function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ "position": "absolute", height: "500px", width: "500px" }}>
      <color attach="background" args={["#101010"]} />
      <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
        <Stage environment={"dawn"}>
          <Model scale={0.2} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default App;