'use client';
import dynamic from 'next/dynamic';
const PVDiagram = dynamic(() => import('./PVDiagram'), { ssr: false });
export default PVDiagram;
