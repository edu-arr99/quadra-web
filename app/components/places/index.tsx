import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

interface Coordinates {
  lat: number;
  lng: number;
}

const PlacesField: React.FC = () => {
  const [address, setAddress] = useState<string>();
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: -12.1219,
    lng: -77.0305,
  });

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

  const mapContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '300px',
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDBAtdvQGBSWWQmYzNuNCwMXPao-bZ8uY&libraries=places,geometry`;
    script.async = true;
    script.onload = () => {
      initializeMap();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      initializeMap();
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: coordinates }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const newAddress = results[0]?.formatted_address || '';
        setAddress(newAddress);
      } else {
        console.error('Error reverse geocoding:', status);
      }
    });
  }, [coordinates]);

  let map: google.maps.Map | undefined;
  let marker: google.maps.Marker | undefined;

  async function initializeMap() {
    const position = new window.google.maps.LatLng(
      coordinates.lat,
      coordinates.lng
    );

    map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 15,
      center: position,
      mapId: 'Cochera',
    });

    marker = new window.google.maps.Marker({
      map: map,
      position: position,
      title: 'Position',
      draggable: true,
    });

    marker.addListener('dragend', onMarkerDragEnd);
  }

  function onMarkerDragEnd(event: google.maps.MapMouseEvent) {
    const newCoordinates = {
      lat: event.latLng?.lat() || 0,
      lng: event.latLng?.lng() || 0,
    };
    setCoordinates(newCoordinates);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newCoordinates }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const newAddress = results[0]?.formatted_address || '';
        setAddress(newAddress);
      } else {
        console.error('Error reverse geocoding:', status);
      }
    });
  }

  return (
    <>
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
            <div className="autocomplete-dropdown-container">
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
      <br />
      <div id="map" style={mapContainerStyle}></div>
    </>
  );
};

export default PlacesField;
