'use client';
import dynamic from 'next/dynamic';
const InductionSim = dynamic(() => import('./InductionSim'), { ssr: false });
export default InductionSim;
