import { useMemo, useRef } from 'react';
import { Mesh, ShaderMaterial } from 'three';
import { fragmentShader as linesShader } from '../shaders/linesShader';
import { fragmentShader as waterShader } from '../shaders/waterFragment';
import { vertexShader } from '../shaders/vertexDefaultShader';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export enum Shaders {
  lines,
  water,
}

const shaders = {
  [Shaders.lines]: linesShader,
  [Shaders.water]: waterShader,
}

export const ShaderBackground = ({shader}: {shader: Shaders}) => {
  const texture = useLoader(TextureLoader, 'public/water.png');
  texture.flipY = false;
  const mesh = useRef<Mesh>(null);

  const fragmentShader = shaders[shader];

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      texture2: {
        value: texture,
      }
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (!mesh.current) {
      return;
    }
    (mesh.current!.material as ShaderMaterial).uniforms.u_time.value = 0.4 * clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}
