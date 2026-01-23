import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { C as CITIES_WITH_COORDS } from "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "firebase/app";
import "firebase/auth";
import "firebase/database";
import "framer-motion";
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (!onMapClick) return;
      onMapClick(e.latlng);
    }
  });
  return null;
}
function NorthMacedoniaMap({ onSelectCity }) {
  const defaultCenter = [41.6, 21.7];
  const zoom = 8;
  const handleMapClick = (latlng) => {
    if (!onSelectCity) return;
    let nearest = null;
    let bestDist = Infinity;
    CITIES_WITH_COORDS.forEach((c) => {
      const dLat = c.lat - latlng.lat;
      const dLng = c.lng - latlng.lng;
      const dist = dLat * dLat + dLng * dLng;
      if (dist < bestDist) {
        bestDist = dist;
        nearest = c;
      }
    });
    if (nearest) onSelectCity(nearest.name);
  };
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", height: "350px" }, children: /* @__PURE__ */ jsxs(
    MapContainer,
    {
      center: defaultCenter,
      zoom,
      style: { width: "100%", height: "100%", borderRadius: 12, overflow: "hidden" },
      scrollWheelZoom: false,
      children: [
        /* @__PURE__ */ jsx(
          TileLayer,
          {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: "© OpenStreetMap contributors"
          }
        ),
        /* @__PURE__ */ jsx(ClickHandler, { onMapClick: handleMapClick }),
        CITIES_WITH_COORDS.map((city) => /* @__PURE__ */ jsx(
          Marker,
          {
            position: [city.lat, city.lng],
            eventHandlers: {
              click: () => onSelectCity && onSelectCity(city.name)
            },
            children: /* @__PURE__ */ jsxs(Popup, { children: [
              /* @__PURE__ */ jsx("strong", { children: city.name }),
              /* @__PURE__ */ jsx("br", {}),
              "Click to use this city"
            ] })
          },
          city.name
        ))
      ]
    }
  ) });
}
export {
  NorthMacedoniaMap as default
};
