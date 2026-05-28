'use client';
import dynamic from 'next/dynamic';
const MagneticField = dynamic(() => import('./MagneticField'), { ssr: false });
export default MagneticField;
