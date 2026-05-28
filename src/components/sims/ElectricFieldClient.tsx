'use client';
import dynamic from 'next/dynamic';
const ElectricField = dynamic(() => import('./ElectricField'), { ssr: false });
export default ElectricField;
