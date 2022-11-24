import LoadingSpinner from "../global/LoadingSpinner";
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";

const google_maps_API_key = 'AIzaSyDcRUvSzsdjDreBAv0IIV83LlyIMoa2pyY';
let callCount = 0;

function Map(props) {

    // Reference for google map marker functionality
    // https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
    const renderMarkers = (map, maps, latitude, longitude) => {
        let marker = new maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: 'Hello World!'
        });
        return marker;
       };

    const [mapCoordinates, setMapCoordinates] = useState({
            center: {
            lat: 49.2827,
            lng: -123.1207
            },
            zoom: 15
        });
    
    const [isLoading, setIsLoading] = useState(false);
    
    // Nest Geocode inside useEffect and utilize isLoading to prevent infinite Geocode calls
    useEffect(() => {
        setIsLoading(true)
        Geocode.setApiKey(google_maps_API_key);
        Geocode.fromAddress(props.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                callCount = callCount + 1;
                console.log(callCount);
                
                setMapCoordinates({center: {
                    lat: lat,
                    lng: lng
                    },
                    zoom: 15
                });
                setIsLoading(false);
            },
            (error) => {
                console.error(error);
            
            }
        );
        
    }, []);
    

    return(
        <>  
            
            {isLoading ? <LoadingSpinner/> :
            <div className="h-96 w-1/2">
                <div class="widget-header"><h2>{props.title}</h2></div>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: google_maps_API_key }}
                    center={mapCoordinates.center}
                    defaultZoom={mapCoordinates.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps, mapCoordinates.center.lat, mapCoordinates.center.lng)}
                >

                </GoogleMapReact>
            </div>
            }
        </>  
        );

        
}

export default Map;