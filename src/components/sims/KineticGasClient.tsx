'use client';
import dynamic from 'next/dynamic';
const KineticGas = dynamic(() => import('./KineticGas'), { ssr: false });
export default KineticGas;
