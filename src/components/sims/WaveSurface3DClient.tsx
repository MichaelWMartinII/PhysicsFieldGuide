'use client';

import dynamic from 'next/dynamic';

const WaveSurface3D = dynamic(() => import('./WaveSurface3D'), { ssr: false, loading: () => (
  <div style={{ height: 440, background: '#070b14', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155', fontSize: 14 }}>
    Loading 3D simulation…
  </div>
) });

export default function WaveSurface3DClient() {
  return <WaveSurface3D />;
}
