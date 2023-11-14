'use client'
import { useMemo, useState, useEffect } from 'react';
import { GoogleMap, MarkerF, Marker, useLoadScript } from '@react-google-maps/api';

function OfficeMap() {
  const office = useMemo(() => ({ lat: 33.659380, lng: -117.877340 }), []);
  const labelSize = { width: 200 }
  const labelPadding = 8;

  // const customIcon = {
  //   url: '/assets/images/chiropractor.png', // path to the icon
  //   scaledSize: new window.google.maps.Size(40, 40) // size of the icon, adjust as needed
  // };

  return (
    <GoogleMap zoom={13} center={office} mapContainerClassName="map-container h-[50vh] max-w-5xl mx-auto">
      <MarkerF position={office}/>      
    </GoogleMap>
  );
}

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
``
  if (!hasMounted) return null; // Return nothing until the component has mounted
  if (!isLoaded) return <div>Loading...</div>;

  return <OfficeMap />;
}