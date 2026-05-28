'use client';
import dynamic from 'next/dynamic';
const QuantumWell = dynamic(() => import('./QuantumWell'), { ssr: false });
export default QuantumWell;
