'use client';
import dynamic from 'next/dynamic';
const DoubleSlitSim = dynamic(() => import('./DoubleSlitSim'), { ssr: false });
export default DoubleSlitSim;
