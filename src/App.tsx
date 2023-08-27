import { Suspense } from 'react';
import styles from './App.module.scss';
import { Canvas } from '@react-three/fiber';
import { ShaderBackground, Shaders } from './components/ShaderBackground';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.canvas}>
        <Canvas shadows camera={{ position: [0.0, 0.0, 2.0] }}>
          <Suspense fallback={null}>
            <ShaderBackground shader={Shaders.water} />
            {/* <ShaderBackground shader={Shaders.lines} /> */}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
