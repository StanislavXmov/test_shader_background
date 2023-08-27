import { Suspense } from 'react';
import styles from './App.module.scss';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.canvas}>
        <Canvas shadows camera={{ position: [0.0, 0.0, 6.0] }}>
          <Suspense fallback={null}>
            
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
