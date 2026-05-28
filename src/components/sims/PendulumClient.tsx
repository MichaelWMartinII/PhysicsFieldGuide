'use client';
import dynamic from 'next/dynamic';
const Pendulum = dynamic(() => import('./Pendulum'), { ssr: false });
export default Pendulum;
