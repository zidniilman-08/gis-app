import React, { useEffect, useState } from 'react';
import ReactMapGL, {
  FullscreenControl,
  NavigationControl,
  Source,
  Layer,
} from 'react-map-gl';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TableBody
} from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import * as turf from '@turf/turf';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;

const layerLines = {
  id: 'lines',
  type: 'line',
  source: 'geojson-lines',
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
  },
  paint: {
    'line-color': ['get', 'color'],
    'line-width': 8,
  },
  filter: ['in', '$type', 'LineString'],
};

const layerSymbols = {
  id: 'symbols',
  type: 'symbol',
  source: 'route',
  layout: {
    'symbol-placement': 'line',
    'text-font': ['Open Sans Regular'],
    'text-field': '{title}', // part 2 of this is how to do it
    'text-size': 16,
  },
};

const navControlStyle = {
  right: 10,
  top: 50,
};

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const CardDetail = ({ data }) => {
  return (
    <Box
      sx={{ minWidth: 325 }}
      style={{ position: 'absolute', top: 10, left: 20, zIndex: 104 }}
    >
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Daftar Jalur Evakuasi
          </Typography>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 300 }}
              size='small'
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell align='right'>Warna</TableCell>
                  <TableCell align='right'>Jarak (Km)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length &&
                  data.map((d) => {
                    const distance = turf.length(d);
                    return (
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {d.properties.title}
                        </TableCell>
                        <TableCell align='right'>
                          {d.properties.color}
                        </TableCell>
                        <TableCell align='right'>{distance.toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

const MapBox = ({
  children,
  mapStyle = 'mapbox://styles/mapbox/streets-v11',
  height,
}) => {
  const [viewport, setViewport] = useState({
    height: 500,
    width: '100%',
    latitude: -6.8547344868726166,
    longitude: 106.97880824990715,
    zoom: 14.8,
  });

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
          properties: {
            color: d.warna,
            title: d.nama,
          },
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

  return (
    <ReactMapGL
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
      onZoom={(e) => setViewport({ ...viewport, zoom: e.viewState.zoom })}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {geoJson.features.length > 0 && (
        <Source id='geojson-lines' type='geojson' data={geoJson}>
          <Layer {...layerLines} />
          <Layer {...layerSymbols} />
        </Source>
      )}
      <FullscreenControl style={geolocateControlStyle} />
      <NavigationControl style={navControlStyle} />
      <CardDetail data={geoJson.features} />
    </ReactMapGL>
  );
};

export default MapBox;
