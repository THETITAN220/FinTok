"use client"
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/Maps'), {
  ssr: false,
});
export default function MapPage() {

  return (
    <div>
      Hello
      <DynamicMap />
    </div>
  );
}
