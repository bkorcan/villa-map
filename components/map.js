import {
  useMemo, useRef, useCallback, useState, useEffect
} from "react";
import {
  GoogleMap, useLoadScript, Marker, MarkerClusterer, OverlayView
} from "@react-google-maps/api"; "@react-google-maps/api";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Style from '../styles/home.module.css'


function MapHome() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  // Map OnLoad
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const options = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: false,
  }), []);
  // End Of Map OnLoad

  // States
  const center = useMemo(() => ({ lat: 36.2008559, lng: 29.6453682 }), []);
  const [markersData, setMarkersData] = useState([])
  const [page, setPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  // End Of States

  // Get Dimensions Of Map
  const node = useRef()
  useEffect(
    () => {
      document.addEventListener("mousedown", getDimensions);
      return () => {
        document.removeEventListener("mousedown", getDimensions);
      };
    }, []);

  const getDimensions = useCallback(
    (e) => {
      setScreenWidth(node.current.clientWidth)
      setScreenHeight(node.current.clientHeight)
      mapRef.current.addListener("zoom_changed", () => {
      })
      // if( node.current.contains(e.target) ) console.log(e.target)
      return;
    }, []
  );
  // Get Dimensions Of Map

  // Page Change
  const pageChange = (event, value) => { setPage(value); };
  //  End Of Page Change

  // Get Markers
  useEffect(
    async () => {
      let drop = 0
      if (page !== 5) drop = 10 * (page - 1)
      if (page === 5) drop = 0
      const res = await fetch(`/api/get_items?d=${drop}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) { setMarkersData(await res.json()); }
      if (res.status === 500) { console.log('There is an error') }
    }, [page]
  )
  // End Of Get Markers

  return (
    <div className={Style.containerMapPage} >

      {/* Left Side */}
      <div className={Style.leftMapPage}>
        <Stack spacing={2} style={{ marginTop: 40 }} >
          <Pagination count={10} color="primary" size='large' onChange={pageChange} />
        </Stack>
      </div>
      {/* End Of Left Side */}

      {/* Right Side */}
      <div ref={node} className={Style.rightMapPage} >

        <GoogleMap zoom={15} center={center} mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}>
          {/* Clustering Marker */}
          <MarkerClusterer>
            {() =>
              markersData.map((marker, key) =>
                <Marker position={{ lat: marker.listing.lat, lng: marker.listing.lng }}
                  key={key}
                  label={marker.pricingQuote.priceString}
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
      </div>
      {/*End Of Right Side */}

    </div>
  );
}

export { MapHome }
