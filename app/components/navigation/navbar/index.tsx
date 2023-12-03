import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import Head from 'next/head';
import Script from 'next/script';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import { useRouter } from 'next/navigation';


interface Coordinates {
lat: number;
lng: number;
}

const Navbar = ({ toggle }: { toggle: () => void }) => {
    const [address, setAddress] = React.useState<string>('');
    const [coordinates, setCoordinates] = React.useState<Coordinates>({
      lat: -12.1219,
      lng: -77.0305,
    });
    const router = useRouter();

    const handleSelect = async (value: string) => {
      const results = await geocodeByAddress(value);

      const firstResult = results[0];
      if (firstResult)
      {
        const ll = await getLatLng(firstResult);
        console.log(ll);
        setAddress(value);
        setCoordinates(ll);
      }
      else {
        console.error("No results found for the selected address");
      }
    };

    const onClick = () => {
      console.log(address);
      console.log(coordinates);

      if (coordinates) 
      router.push(`/search?lat=${coordinates['lat']}&lng=${coordinates['lng']}`);
    }


  return (
    <>
        <Head>
            <title>¡Regístrate en Quadra!</title>
            <meta name="description" content="¡Regístrate en Quadra!" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDDBAtdvQGBSWWQmYzNuNCwMXPao-bZ8uY&libraries=places,geometry`}
            strategy="beforeInteractive"
        />
      <div className="w-full h-20 sticky top-0" style={{ backgroundColor: '#0047ab' }}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
            <ul className="hidden md:flex gap-x-6 ">
              <li>
                <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div className="mapa">
                        <input
                          {...getInputProps({
                            placeholder: 'Buscar dirección ...',
                            className: 'location-search-input',
                          })}
                          required
                        />
                        <div className="autocomplete-dropdown-container" style={{ position: 'absolute', top: '100%', width: 'auto', zIndex: 2 }}>
                          {loading && <div>Cargando...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#0047ab', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>

              </li>
              <li>
                <Button text="Buscar" onClick={() => router.push(`/search?lat=${coordinates['lat']}&lng=${coordinates['lng']}`)}/>;
              </li>
            </ul>
            <div className="hidden md:block">
              <Button text="Sign In" onClick={() => router.push("https://quadra-registros.vercel.app/get_started")}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;