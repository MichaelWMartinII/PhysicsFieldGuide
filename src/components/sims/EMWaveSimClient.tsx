'use client';
import dynamic from 'next/dynamic';
const EMWaveSim = dynamic(() => import('./EMWaveSim'), { ssr: false });
export default EMWaveSim;
