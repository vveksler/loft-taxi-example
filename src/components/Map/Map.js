import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import mapboxgl from 'mapbox-gl'
import { getCoords, clearRoutes } from 'modules/route'
import { getIsCardFilled } from 'modules/profile'
import OrderPage from 'components/OrderPage'
import 'mapbox-gl/dist/mapbox-gl.css'

const useStyles = makeStyles(() => ({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  }
}))

const Map = () => {
  const classes = useStyles()
  const [map, setMap] = useState(null)
  const [mapState] = useState({
    lng: 30.27,
    lat: 60,
    zoom: 12
  })
  const mapContainer = useRef(null)
  const dispatch = useDispatch()
  const coords = useSelector(getCoords)
  const cardIsFilled = useSelector(getIsCardFilled)

  const renderRoute = useCallback(() => {
    if (map) {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {
              color: '#F7455D'
            },
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        },
        paint: {
          'line-width': 8,
          'line-color': ['get', 'color']
        }
      })

      map.flyTo({
        center: coords[0]
      })
    }
  }, [map, coords])

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [mapState.lng, mapState.lat],
        zoom: mapState.zoom
      })

      map.on('load', () => {
        setMap(map)
        map.resize()
      })
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [map, mapState])

  useEffect(() => {
    if (!coords && map && map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }

    if (coords && coords.length > 0) {
      renderRoute()
    }

    if (!cardIsFilled && coords) dispatch(clearRoutes())
  }, [renderRoute, map, coords, cardIsFilled, dispatch])

  return (
    <div ref={mapContainer} className={classes.container}>
      <OrderPage />
    </div>
  )
}

export default Map
