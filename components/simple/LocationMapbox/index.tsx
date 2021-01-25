import React, { ReactElement, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl';
import Title from '../Title';
import s from './style.module.css';
import SVGMarker from '@svg/marker.svg';

declare const MAPBOX_ACCESS_TOKEN: string;
interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

export default function index({ latitude, longitude, name }: Props): ReactElement {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude,
    longitude,
    zoom: 14,
  });
  return (
    <div className={s.location}>
      <Title size="h6">Location</Title>
      <div id="map-wrapper" className={s.mapWrapper}>
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/weymoze/ckcd9hb547uu41iozbxni99ul"
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        >
          <Marker latitude={latitude} longitude={longitude} offsetLeft={-43} offsetTop={-43}>
            <div className={s.markerWrapper}>
              <SVGMarker className={s.svgMarker} />
            </div>
          </Marker>
          <div className={s.navigationControl}>
            <NavigationControl />
          </div>
        </ReactMapGL>
      </div>
    </div>
  );
}
