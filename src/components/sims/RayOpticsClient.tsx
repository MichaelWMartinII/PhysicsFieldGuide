'use client';
import dynamic from 'next/dynamic';
const RayOptics = dynamic(() => import('./RayOptics'), { ssr: false });
export default RayOptics;
