import React from 'react'

import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%'
}

const center = {
    lat: 38.115086,
    lng: 20.521711
}



export const Map = () => {
    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Marker position={center}/>
            </GoogleMap>
        </LoadScript>
    )
}
