'use client';
import dynamic from 'next/dynamic';
const PhasePlot = dynamic(() => import('./PhasePlot'), { ssr: false });
export default PhasePlot;
