import React, { useState, useEffect } from "react"
import { MapContainer } from "react-leaflet"
import initMap from "./pure/map"
import Sidebar from "./sidebar"

export let mapInstance
export let lfMapInstance
const zoom = 2.5
const center = [0, 0]
const BasicMap = () => {
  const [map, setMap] = useState(null)
  const [lfMap, setLFMap] = useState(null)

  useEffect(() => {
    if (!map) return
    setTimeout(() => {
      map?.target?.invalidateSize()
    }, 300)
  }, [map])
  useEffect(() => {
    if (map && !lfMap) {
      setLFMap(initMap(map?.target))
    }
  }, [map, lfMap])

  useEffect(() => {
    if (!map || !lfMap) return
    lfMap.google.addTo(map?.target)
  }, [map, lfMap])

  useEffect(() => {
    if (!lfMap) return
    mapInstance = { map: map?.target, defaultZoom: zoom, defaultCenter: center }
    console.log(mapInstance.map)
    lfMapInstance = { lfMap }
  }, [lfMap])

  // //SKIN CHANGES
  useEffect(() => {
    if (!map || !lfMap) return
    setTimeout(() => map.target.invalidateSize(), 300)
    lfMap.google.addTo(map?.target)
  }, [map, lfMap])

  return (
    <div
      style={{
        width: "100%",
        height: "100vh"
      }}
    >
      <Sidebar />
      <MapContainer zoomDelta={0.5} zoomSnap={0.5} wheelPxPerZoomLevel={120} trackResize={true} whenReady={setMap} style={{ width: "100%", height: "100%" }} center={center} zoom={zoom}></MapContainer>
    </div>
  )
}

export default BasicMap
