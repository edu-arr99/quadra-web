"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface Listing {
  address: string;
  cant_vehiculos: number;
  lat: number;
  lon: number;
  // Add more properties as needed
}

interface PageProps {
    lat: number;
    lng: number;
}

const Page: React.FC<PageProps> = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const [listings, setListings] = useState<Listing[]>([]);
    console.log(lat, lng);

    useEffect(() => {
        fetch(`http://localhost:5000/cocheras?lat=${lat}&lng=${lng}`)
          .then(response => response.json())
          .then(data => {
            const listings = data.map((item: any[]) => ({
              address: item[0],
              cant_vehiculos: item[1],
              lat: item[2],
              lon: item[3],
            }));
            console.log(listings);
            setListings(listings);
          })
          .catch(error => console.error(error));
      }, [lat, lng]);
    
      return (
        <div>
          <h1>Listings</h1>
          {listings.map((listing, index) => (
            <div key={index}>
              <h2>{listing.address}</h2>
              <p>Number of vehicles: {listing.cant_vehiculos}</p>
              <p>Latitude: {listing.lat}</p>
              <p>Longitude: {listing.lon}</p>
            </div>
          ))}
        </div>
      );
};

export default Page;
