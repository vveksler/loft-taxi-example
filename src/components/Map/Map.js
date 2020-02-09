import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import mapboxgl from 'mapbox-gl'
import { getCoords, getIsOrderMade } from 'modules/route'
import OrderPage from 'components/OrderPage'

const useStyles = makeStyles(() => ({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  }
}))

mapboxgl.accessToken =
  'pk.eyJ1IjoidnZla3NsZXIiLCJhIjoiY2swNDIyY3k5MjBodzNjcHJwYXdiYnA1OSJ9.f_ikZnTIAUm1k_WEuudyCg'
let map = null

const Map = () => {
  const classes = useStyles()
  const coords = useSelector(getCoords, shallowEqual)
  const isOrderMade = useSelector(getIsOrderMade, shallowEqual)
  const [mapState] = useState({
    lng: 30.27,
    lat: 60,
    zoom: 12
  })
  const mapContainerRef = useRef(null)

  const renderRoute = useMemo(
    () => () => {
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
    },
    [coords]
  )

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom
    })
    return () => {
      map.remove()
    }
  }, [mapState])

  useEffect(() => {
    if (isOrderMade && map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }

    if (isOrderMade && coords && coords.length > 0) {
      renderRoute()
    }
  }, [isOrderMade, coords, renderRoute])

  return (
    <div ref={mapContainerRef} className={classes.container}>
      <OrderPage />
    </div>
  )
}

export default Map
