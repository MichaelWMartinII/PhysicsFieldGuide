'use client';
import dynamic from 'next/dynamic';
const CircuitBuilder = dynamic(() => import('./CircuitBuilder'), { ssr: false });
export default CircuitBuilder;
