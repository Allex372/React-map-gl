import React, {useRef, useState} from "react";
import ReactMapGL, {Marker, Popup, Source, Layer} from 'react-map-gl';
import * as parkData from './data/Public_Drinking_Water_Fountains.json';
import './App.css';
import marker_img from './img/map_marker.png';
import ControlPanel from './control-panels';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';

function App() {
    const token = 'pk.eyJ1IjoiYWxsZXgzNzIiLCJhIjoiY2t0OXRtYzlyMGJ1YzJ3bXdvN2c0Nmk2aiJ9.Z6G1NqH0YDqKwlBY11HzEA'

    const [viewport, setViewport] = useState({
        latitude: 45.4211435,
        longitude: -75.6900574,
        width: '100vw',
        height: '100vh',
        zoom: 10
    })

    const [selectedPark, setSelectedPark] = useState(null)


    return <div>
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={token}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            onViewportChange={viewport => {
                setViewport(viewport)
            }}>

            {
                parkData.features.map(water => (
                    <Marker longitude={water.geometry.coordinates[0]} latitude={water.geometry.coordinates[1]}>
                        <button className='marker-btn'
                                onClick={event => {
                                    event.preventDefault()
                                    setSelectedPark(water)
                                }}>
                            <img src={marker_img} alt='marker-of-water'/>
                        </button>
                    </Marker>
                ))
            }

            {selectedPark ? (
                <Popup longitude={selectedPark.geometry.coordinates[0]}
                       latitude={selectedPark.geometry.coordinates[1]}
                       onClose={() => {
                           setSelectedPark(null)
                       }}
                >
                    <div>
                        <h2>{selectedPark.properties.ADDRESS}</h2>
                        <p>{selectedPark.properties.ADDRESS_FR}</p>
                    </div>
                </Popup>
            ) : null}

            {/*<Source*/}
            {/*    id="earthquakes"*/}
            {/*    type="geojson"*/}
            {/*    data="https://opendata.arcgis.com/datasets/0ea2af5b110045a28f500a0ba6a1b4a0_0.geojson"*/}
            {/*    cluster={true}*/}
            {/*    clusterMaxZoom={15}*/}
            {/*    clusterRadius={50}*/}
            {/*>*/}
            {/*    <Layer {...clusterLayer} />*/}
            {/*    <Layer {...clusterCountLayer} />*/}
            {/*    <Layer {...unclusteredPointLayer} />*/}
            {/*</Source>*/}
        </ReactMapGL>
        <ControlPanel/>
    </div>
}

export default App;
