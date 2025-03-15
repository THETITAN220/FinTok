"use client";
import { OlaMaps } from "olamaps-web-sdk";
import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Maps() {
  const [address, setAddress] = useState('');
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const olaMapsRef = useRef(null);
  const markerInstancesRef = useRef([]);

  // Initialize the map once on mount
  useEffect(() => {
    const olaMaps = new OlaMaps({
      apiKey: "6GXTfQe5JMOgBRuO5I2xEDuvJL1CBeRTEpwPYj2h",
    });

    const myMap = olaMaps.init({
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: 'map',
      center: [77.61648476788898, 12.931423492103944],
      zoom: 15,
    });

    mapRef.current = myMap;
    olaMapsRef.current = olaMaps;

    return () => {
      myMap.remove();
    };
  }, []);

  // Update markers on the map whenever markers state changes
  useEffect(() => {
    if (!mapRef.current || !olaMapsRef.current) return;

    // Remove previous marker instances
    markerInstancesRef.current.forEach(marker => marker.remove());
    markerInstancesRef.current = [];

    // Add a red marker for each coordinate in the markers array
    markers.forEach(([lng, lat]) => {
      const markerInstance = olaMapsRef.current
        .addMarker({ color: 'red', offset: [0, -10], anchor: 'bottom' })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
      markerInstancesRef.current.push(markerInstance);
    });

    // Adjust map view based on the number of markers
    if (markers.length === 1) {
      mapRef.current.setCenter(markers[0]);
      mapRef.current.setZoom(15);
    } else if (markers.length > 1) {
      const bounds = markers.reduce(
        (acc, [lng, lat]) => [
          [Math.min(acc[0][0], lng), Math.min(acc[0][1], lat)],
          [Math.max(acc[1][0], lng), Math.max(acc[1][1], lat)],
        ],
        [
          [Infinity, Infinity],
          [-Infinity, -Infinity],
        ]
      );
      mapRef.current.fitBounds(bounds, { padding: 20, maxZoom: 15 });
    }
  }, [markers]);

  // Fetch coordinates from geocoding API based on the address and update markers
  const handleSearch = async () => {
    if (!address.trim()) return;

    try {
      const requestId = uuidv4();
      const encodedAddress = encodeURIComponent(address.trim());
      const response = await fetch(
        `https://api.olamaps.io/places/v1/geocode?address=${encodedAddress}&language=en&api_key=6GXTfQe5JMOgBRuO5I2xEDuvJL1CBeRTEpwPYj2h`,
        { headers: { "X-Request-Id": requestId } }
      );
      const data = await response.json();

      if (data.geocodingResults && data.geocodingResults.length > 0) {
        // Extract coordinates from all the returned results
        const newCoordinates = data.geocodingResults.map(result => {
          const { lng, lat } = result.geometry.location;
          return [lng, lat];
        });
        setMarkers(newCoordinates);
      } else {
        alert("Address not found.");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      alert("Error fetching geocoding data.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Search Address
        </button>
      </div>
      <div id="map" className="w-[500px] h-[500px]"></div>
    </div>
  );
}
