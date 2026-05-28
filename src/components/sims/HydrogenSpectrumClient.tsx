'use client';
import dynamic from 'next/dynamic';
const HydrogenSpectrum = dynamic(() => import('./HydrogenSpectrum'), { ssr: false });
export default HydrogenSpectrum;
