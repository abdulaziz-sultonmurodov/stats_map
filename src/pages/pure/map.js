import L from "leaflet"

/* Leaflet modules */
import "./leaflet/leaflet.ruler"
import "./leaflet/leaflet.geometryutil"
import "./leaflet/leaflet.zoomlabel"
import "./leaflet/leaflet.loader"
import "./leaflet/leaflet.search"
import "./leaflet/leaflet.buttons"

/* Leaflet CSS */
import "leaflet/dist/leaflet.css"
import "./styles/leaflet/leaflet.css"
import "./styles/leaflet/leaflet.ruler.css"
import "./styles/leaflet/leaflet.zoomlabel.css"
import "./styles/leaflet/leaflet.search.css"
import "./styles/leaflet/leaflet.buttons.css"
import "./styles/leaflet/leaflet.contextmenu.css"
import "./styles/leaflet/leaflet.awesome-markers.css"
import "./styles/leaflet/leaflet.loader.css"
import "./styles/leaflet/leaflet.markercluster.css"
import "./styles/leaflet/leaflet.markercluster.default.css"

const initMap = (map) => {
  const attr = {
    maxZoom: 18,
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
  }

  const google = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", L.Util.extend({}, attr, { subdomains: ["a", "b", "c"] }))

  const baseMaps = {
    Satellite: google
  }

  function addControlPlaceholders(map) {
    const corners = map._controlCorners,
      l = "leaflet-",
      container = map._controlContainer

    function createCorner(vSide, hSide) {
      const className = `${l + vSide} ${l + hSide}`

      corners[vSide + hSide] = L.DomUtil.create("div", className, container)
    }

    createCorner("verticalcenter", "left")
    createCorner("verticalcenter", "right")
  }
  addControlPlaceholders(map)

  map.removeControl(map.zoomControl)
  map.fitWorld({ animate: false }).zoomIn()

  L.control.scale({ imperial: false }).setPosition("bottomright").addTo(map)
  L.control.layers(baseMaps).addTo(map)

  L.control
    .buttons([
      [
        {
          id: 0,
          title: "Харитани кайтариш",
          iconCls: "fa fa-crosshairs",
          callback: (e) => {
            e.target.click()
            map.flyTo([0, 0], 2.5)
          }
        }
      ]
    ])
    .setPosition("topright")
    .addTo(map)
  L.control.zoom({ position: "verticalcenterright" }).addTo(map)
  map.doubleClickZoom.disable()

  return {
    google
  }
}

export default initMap
