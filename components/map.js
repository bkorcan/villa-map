import {
  useMemo, useRef, useCallback, useState, useEffect
} from "react";
import {
  GoogleMap, useLoadScript, Marker, MarkerClusterer, OverlayView
} from "@react-google-maps/api"; "@react-google-maps/api";

function MapHome() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 36.2008559, lng: 29.6453682 }), []);

  const markerData = [{ position: { lat: 36.2008559, lng: 29.6453682 }, price: '100' }, { position: { lat: 36.205, lng: 29.6353682 }, price: '200' }];
  return (
    <GoogleMap zoom={14} center={center} mapContainerClassName="map-container">
      {/* Clustering Marker */}
      <MarkerClusterer>
        {() =>
          markerData.map(villas =>
            <Marker position={{ lat: villas.position.lat, lng: villas.position.lng }}
              label={villas.price}
              icon={{
                path:
                  "M-9,-5 l18,0 l0,9 l-18,0 l0,-9",
                fillColor: "white",
                fillOpacity: 1,
                scale: 3,
                strokeColor: "red",
                strokeWeight: 1.5,
              }}

            />
          )
        }
      </MarkerClusterer>
      {/* End Of Clustering Marker */}

    </GoogleMap>
  );
}

export { MapHome }
