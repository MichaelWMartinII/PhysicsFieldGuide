'use client';
import dynamic from 'next/dynamic';
const SpacetimeDiagram = dynamic(() => import('./SpacetimeDiagram'), { ssr: false });
export default SpacetimeDiagram;
