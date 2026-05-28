'use client';
import dynamic from 'next/dynamic';
const DopplerWave = dynamic(() => import('./DopplerWave'), { ssr: false });
export default DopplerWave;
