'use client';
import dynamic from 'next/dynamic';
const FourierSim = dynamic(() => import('./FourierSim'), { ssr: false });
export default FourierSim;
