'use client';
import dynamic from 'next/dynamic';
const RotatingBody = dynamic(() => import('./RotatingBody'), { ssr: false });
export default RotatingBody;
