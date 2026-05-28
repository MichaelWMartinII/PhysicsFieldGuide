'use client';

import dynamic from 'next/dynamic';

const Orbit3D = dynamic(() => import('./Orbit3D'), { ssr: false, loading: () => (
  <div style={{ height: 440, background: '#070b14', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155', fontSize: 14 }}>
    Loading 3D simulation…
  </div>
) });

export default function Orbit3DClient() {
  return <Orbit3D />;
}
