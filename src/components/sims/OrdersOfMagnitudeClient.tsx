'use client';
import dynamic from 'next/dynamic';
const OrdersOfMagnitude = dynamic(() => import('./OrdersOfMagnitude'), { ssr: false });
export default OrdersOfMagnitude;
