import React, { useEffect, useState } from 'react'
import MarkerItem from './MarkerItem'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: 10
  };
  
//   const center = {
//     lat: -3.745,
//     lng: -38.523
//   };



const GoogleMapSection = ({coordinates,listing}) => {
    const [center,setCenter] = useState({
        lat: -3.745,
    lng: -38.523
    })
    const [map, setMap] = React.useState(null)

      useEffect(() => {
        coordinates && setCenter(coordinates)
      },[coordinates])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API
      })
    
      const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

      if (!isLoaded) {
        return null;
      }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        {listing.map((item,index) => (
            <MarkerItem 
                key={index}
                item={item}
            />
        ))}
        </>
      </GoogleMap>
    </div>
  )
}

export default GoogleMapSection
