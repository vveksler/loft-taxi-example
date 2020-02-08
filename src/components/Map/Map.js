import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

const mapContainer = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0
}

mapboxgl.accessToken =
  'pk.eyJ1IjoiZXNnb2x1YiIsImEiOiJjazJicXRoN3AwN2NnM21tZjd5aWNmeHVnIn0.-V1DvjvU7qGcA9fzZIEF8g'

const Map = () => {
  const [mapState] = useState({
    lng: 5,
    lat: 34,
    zoom: 2
  })
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom
    })
    return () => {
      map.remove()
    }
  }, [mapState])

  return <div ref={mapContainerRef} style={mapContainer} />
}

export default Map
