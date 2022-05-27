/*eslint-disable*/

L.Control.Search = L.Control.extend({
  options: {
    placeholder: "Излаш...",
    searchValue: "",
    position: "topright",
    searchCallback: (val) => {},
  },
  initialize: function (options) {
    L.setOptions(this, options);
    this._filled = 0;
    this._max = 7;
  },
  onAdd: function (map) {
    this._map = map;
    this._fg = L.featureGroup().addTo(this._map);
    this._Content = L.DomUtil.create("div", "search-bar");
    this._searchContainer = L.DomUtil.create(
      "div",
      "search-box",
      this._Content
    );
    this._btn = L.DomUtil.create("button", "btn", this._searchContainer);
    this._coordsIcon = L.DomUtil.create("i", "fa fa-map-marked", this._btn);
    this._coordsIcon.style.cssText = `
    margin: 0px 10px 0px 0px;

    `;
    this._btn.style.cssText = `
    position: absolute;
    padding: 10px 8px 11px 15px;
    right: 5px;
    border-radius: 0px 20px 20px 0px;
    background-color: rgb(169,204,82);;
    border: none;
    color: black;
    `;
    this._dropDown = L.DomUtil.create(
      "div",
      "drop-down-content",
      this._Content
    );
    this._dropDown.style.display = "none";

    L.DomUtil.create("i", "search-icon fa fa-search", this._searchContainer);
    this._inputSearch = L.DomUtil.create(
      "input",
      "input-search",
      this._searchContainer
    );
    this._inputSearch.style.outline = "none";
    this._inputSearch.setAttribute("placeholder", this.options.placeholder);

    ////////Events
    L.DomEvent.on(this._searchContainer, "keyup", this._setFounds, this);
    L.DomEvent.on(this._btn, "click", this.checkForCoords, this);
    L.DomEvent.disableScrollPropagation(this._Content);
    L.DomEvent.disableClickPropagation(this._Content);

    return this._Content;
  },
  checkForCoords: function (e) {
    const value = this._inputSearch.value;
    let coordsArr = value.split(" ");
    if (coordsArr.length !== 2) {
      coordsArr = value.split(",");
      if (coordsArr.length !== 2) return;
    }
    const firstVal = parseFloat(coordsArr[0]);
    const secondVal = parseFloat(coordsArr[1]);
    if (isNaN(firstVal) && isNaN(secondVal)) return;
    this.circle?.removeFrom(this._map);
    this.circle = L.circle([firstVal, secondVal], 10).addTo(this._map);
    this._map.flyTo([firstVal, secondVal], 18);
    return;
  },
  _setFounds: async function (e) {
    // if (this.checkForCoords(e.target.value)) return
    if (e.target.value.trim() === "") {
      this._fg.clearLayers();
      this._dropDown.style.display = "none";
      return;
    }
    this._dropDown.style.display = "block";
    const founds = (await this.options.searchCallback(e.target.value)) || {};
    this._dropDown.innerHTML = "";
    let item;
    founds.streets?.forEach((content) => {
      item = L.DomUtil.create("div", "dropdown-item", this._dropDown);
      item.innerHTML = content.name_ru;
      item.geometry = content.geometry;
      L.DomUtil.create("i", " search-icon fa fa-wave-square", item);
      L.DomEvent.on(item, "click", this._foundItemClciked, this);
    });
    founds.mahallas?.forEach((content) => {
      item = L.DomUtil.create("div", "dropdown-item", this._dropDown);
      item.innerHTML = content.name;
      item.geometry = content.geometry;
      L.DomUtil.create("i", " search-icon fa fa-draw-polygon", item);
      L.DomEvent.on(item, "click", this._foundItemClciked, this);
    });
    founds.objects?.forEach((content) => {
      item = L.DomUtil.create("div", "dropdown-item", this._dropDown);
      item.innerHTML = content.name_ru;
      item.geometry = content.geometry;
      L.DomUtil.create("i", " search-icon fa fa-map-marker-alt", item);
      L.DomEvent.on(item, "click", this._foundItemClciked, this);
    });
  },

  _foundItemClciked: function (e) {
    this._inputSearch.value = e.target.innerText;
    this._fg.clearLayers();
    const geometry = L.geoJSON(e.target.geometry, {
      style: function () {
        return { color: "#7367F0" };
      },
    })
      .bindPopup(e.target.innerText)
      .addTo(this._fg);
    this._map.flyToBounds(geometry.getBounds());
  },
});
L.control.search = function (options) {
  return new L.Control.Search(options);
};
