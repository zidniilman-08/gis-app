import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactMapGL, {
  FullscreenControl,
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
} from 'react-map-gl';
import axios from 'axios';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.workerClass = MapboxWorker;

const navControlStyle = {
  right: 10,
  top: 50,
};

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const layerPoints = {
  id: 'measure-points',
  type: 'circle',
  source: 'geojson',
  paint: {
    'circle-radius': 5,
    'circle-color': '#000',
  },
  filter: ['in', '$type', 'Point'],
};

const layerLines = {
  id: 'measure-lines',
  type: 'line',
  source: 'geojson',
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
  },
  paint: {
    'line-color': '#000',
    'line-width': 2.5,
  },
  filter: ['in', '$type', 'LineString'],
};

const linestring = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [],
  },
};

const geojson = {
  type: 'FeatureCollection',
  features: [],
};

const MapBox = ({
  children,
  mapStyle = 'mapbox://styles/mapbox/streets-v11',
  height,
  onSet,
}) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    height: 500,
    width: '100%',
    latitude: -6.8547344868726166,
    longitude: 106.97880824990715,
    zoom: 13.8,
  });

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const [geoJson, setGeoJson] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  useEffect(() => {
    getRutes();
  }, []);

  const getRutes = async () => {
    try {
      const newFeatures = [];
      const url = 'http://localhost:8080/api/lines/';
      const { data } = await axios.get(url);
      data.map((d) => {
        newFeatures.push({
          type: 'Feature',
          geometry: {
            ...d.rute,
          },
        });
      });

      setGeoJson({
        ...geoJson,
        features: newFeatures,
      });
    } catch (err) {}
  };

  function onClick(e) {
    const map = mapRef.current;
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points'],
    });

    // Remove the linestring from the group
    // so we can redraw it based on the points collection.
    if (geojson.features.length > 1) geojson.features.pop();

    // If a feature was clicked, remove it from the map.
    if (features.length) {
      const id = features[0].properties.id;
      geojson.features = geojson.features.filter(
        (point) => point.properties.id !== id
      );
    } else {
      const point = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [e.lngLat.lng, e.lngLat.lat],
        },
        properties: {
          id: String(new Date().getTime()),
        },
      };

      onSet([e.lngLat.lng, e.lngLat.lat]);

      geojson.features.push(point);
    }

    if (geojson.features.length > 1) {
      linestring.geometry.coordinates = geojson.features.map(
        (point) => point.geometry.coordinates
      );

      geojson.features.push(linestring);

      // Populate the distanceContainer with total distance
      // const distance = turf.length(linestring);
    }

    map.getSource('geojson').setData(geojson);
  }

  const onMouseMove = (e) => {
    const map = mapRef.current;
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points'],
    });
    // Change the cursor to a pointer when hovering over a point on the map.
    // Otherwise cursor is a crosshair.
    map.getCanvas().style.cursor = features.length ? 'pointer' : 'crosshair';
  };

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      height={height}
      mapboxAccessToken={
        'pk.eyJ1Ijoidm9uaXNzYWMiLCJhIjoiY2w1MHVqZzlvMDh0bjNsb2hyZTBoenE1aSJ9.j-_W1GMSLdpsBj7MJ9_JhA'
      }
      mapStyle={mapStyle}
      onDrag={(e) =>
        setViewport({
          ...viewport,
          longitude: e.viewState.longitude,
          latitude: e.viewState.latitude,
        })
      }
      onClick={onClick}
      onZoom={(e) => setViewport({ ...viewport, zoom: e.viewState.zoom })}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onMouseMove={onMouseMove}
    >
      <Source id='geojson' type='geojson' data={geojson}>
        <Layer {...layerPoints} />
        <Layer {...layerLines} />
      </Source>
      <FullscreenControl style={geolocateControlStyle} />
      <NavigationControl style={navControlStyle} />
      <GeolocateControl
        style={{ right: 10, top: 150 }}
        ref={geolocateControlRef}
      />
    </ReactMapGL>
  );
};

export default MapBox;
