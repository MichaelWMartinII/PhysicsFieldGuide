'use client';
import dynamic from 'next/dynamic';
const Projectile3D = dynamic(() => import('./Projectile3D'), { ssr: false });
export default Projectile3D;
