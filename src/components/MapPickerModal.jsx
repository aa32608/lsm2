import React from 'react';
import { motion as Motion } from 'framer-motion';
import NorthMacedoniaMap from '../NorthMacedoniaMap';

const MapPickerModal = ({ show, onClose, selectedCity, onSelectCity, t, showMessage }) => {
  if (!show) return null;

  return (
    <Motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Motion.div
        className="modal map-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="modal-header">
          <h3 className="modal-title">{t("chooseOnMap")}</h3>
          <button className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: "70vh", overflow: "hidden" }}>
          <NorthMacedoniaMap
            selectedCity={selectedCity}
            onSelectCity={(cityName) => {
              onSelectCity(cityName);
              showMessage(`${t("locationSetTo")} ${cityName}`, "success");
              onClose();
            }}
          />
        </div>
      </Motion.div>
    </Motion.div>
  );
};

export default MapPickerModal;
