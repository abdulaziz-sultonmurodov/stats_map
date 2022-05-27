/*eslint-disable*/
import L from "leaflet"
import "../pure/leaflet/leaflet.awesome-markers"
import "../pure/leaflet/leaflet.bounce"

export default function COUNTRY(map) {
  this._map = map
  this._fg = L.featureGroup().addTo(this._map)
  this._idList = []

  const getIcon = (cond) => {
    return L.AwesomeMarkers.icon({
      html: `<i class="bridge-icon"></i>`,
      markerColor: "white"
    })
  }

  this.addPoint = function (coordinates) {
    this._fg.clearLayers()
    console.log(coordinates)
    const geo = L.geoJSON(coordinates).addTo(this._fg)
    this._map.flyToBounds(geo.getBounds())
    // const marker = L.marker(coordinates, { icon: getIcon(highlight) })
    //   .addTo(this._fg)
    //   .bindPopup(`${intl.formatMessage({ id: "NavMOST" })} - ${title}`)
    // this._idList.push({ id: id, leaflet: marker._leaflet_id })
  }
  this.removePoints = function () {
    this._idList.length = 0
    this._fg.clearLayers()
  }

  this.bounceMarker = function (id) {
    const [marker] = this._idList.filter((i) => i.id === id)
    if (marker) this._fg.getLayer(marker.leaflet)?.bounce(1)
  }
}
