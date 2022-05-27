import React, { useEffect, useState } from "react"
import COUNTRY from "./map"
import { mapInstance } from "../BasicMap"
import UzbGeo from "../../data/UZB.geo.json"

const Sidebar = () => {
  const [tableData, setTableData] = useState([])
  const [zoom, setzoom] = useState(null)
  const [excludedIds, setExcludedIds] = useState([])
  const [onMapView, setOnMapView] = useState(null)
  const [condition, setCondition] = useState(false)
  //   useEffect(async () => {
  //     if (on) {
  //       try {
  //       } catch (error) {}
  //     } else {
  //       if (onMapView) onMapView.removePoints()
  //       setTableData([])
  //       setExcludedIds([])
  //       setzoom(null)
  //     }
  //   }, [on])
  console.log(condition)
  useEffect(() => {
    if (!mapInstance) return
    setOnMapView(new COUNTRY(mapInstance.map))
  }, [mapInstance])

  useEffect(() => {
    if (!onMapView) return
    if (condition) onMapView.addPoint(UzbGeo)
    else {
      mapInstance.map.flyTo(mapInstance.defaultCenter, mapInstance.defaultZoom)
      onMapView.removePoints()
    }
  }, [tableData, excludedIds, zoom, condition])

  const handleSelectCountry = () => {
    setCondition(!condition)
  }

  return (
    <main style={{ position: "absolute", left: 0, top: 0, height: "100vh", width: "20%", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.5)" }}>
      <h1 className="text-center text-white text-4xl">Sidebar</h1>
      <h3 onClick={handleSelectCountry}>Hello</h3>
    </main>
  )
}

export default Sidebar
