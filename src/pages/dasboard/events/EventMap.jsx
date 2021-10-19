import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';

function MapContainer({ latitude, longitude }) {
    return (
        <div
            className="map-area"
            style={{
                width: '250px',
                height: '200px',
            }}
        >
            <LoadScript
                libraries={['places']}
                googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
            >
                <GoogleMap
                    mapContainerStyle={{
                        //position: 'relative',
                        width: '250px',
                        height: '200px',
                    }}
                    center={{
                        lat: Number(latitude),
                        lng: Number(longitude),
                    }}
                    zoom={14}
                >
                    <Marker
                        position={{
                            lat: Number(latitude),
                            lng: Number(longitude),
                        }}
                    />
                    {/* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default React.memo(MapContainer);

//import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
/* 
export class MapContainer extends Component {
  render() {
    return (
      <div
        className='map-area'
        style={{
          width: '250px',
          height: '200px',
        }}
      >
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: this.props.latitude,
            lng: this.props.longitude,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          rotateControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          panControl={false}
          containerStyle={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <Marker
            key='marker_1'
            position={{
              lat: this.props.latitude,
              lng: this.props.longitude,
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_KEY,
})(MapContainer);
 */
