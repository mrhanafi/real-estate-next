'use client'
import { MapPin } from 'lucide-react'
import React from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

const GoogleAddressSearch = ({selectedAddress,setCoordinates}) => {
  return (
    <div className='flex items-center w-full'>
        <MapPin className='h-10 w-10 p-2 mr-2 rounded-lg text-primary bg-purple-200' />
      <GooglePlacesAutocomplete
        id='searchTextField'
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API}
        selectProps={{ 
            placeholder:'Search Property Address',
            isClearable: true,
            className:'w-full',
            onChange:(place) => {
                // console.log(place);
                selectedAddress(place);
                geocodeByAddress(place.label)
                .then(result => getLatLng(result[0]))
                .then(({lat,lng})=>{
                  // console.log(lat,lng)
                  setCoordinates({lat,lng})
                })
            }
         }}
        />
    </div>
  )
}

export default GoogleAddressSearch
