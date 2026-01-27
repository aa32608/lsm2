"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { ref as dbRef, push, set } from "firebase/database";

const ReportModal = () => {
  const { 
    t, 
    showReportModal, 
    setShowReportModal, 
    reportingListingId, 
    setReportingListingId,
    user,
    db,
    showMessage
  } = useApp();

  const [reportReason, setReportReason] = useState("spam");
  const [reportDescription, setReportDescription] = useState("");

  const handleReportSubmit = async () => {
    if (!reportingListingId) return;
    
    try {
      const reportRef = push(dbRef(db, "reports"));
      await set(reportRef, {
        listingId: reportingListingId,
        reason: reportReason,
        description: reportDescription,
        reporterId: user ? user.uid : "anonymous",
        createdAt: Date.now()
      });
      
      showMessage(t("reportSuccess"), "success");
      setShowReportModal(false);
      setReportReason("spam");
      setReportDescription("");
      setReportingListingId(null);
    } catch (err) {
      console.error(err);
      showMessage(t("error") + ": " + err.message, "error");
    }
  };

  return (
    <AnimatePresence>
      {showReportModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowReportModal(false)}
        >
          <motion.div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="modal-header">
              <h3 className="modal-title">{t("reportListing")}</h3>
              <button className="icon-btn" onClick={() => setShowReportModal(false)} aria-label={t("close")}>✕</button>
            </div>
            <div className="modal-body">
              <div className="field-group">
                <label className="field-label">{t("reportReason")}</label>
                <select
                  className="select"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  <option value="spam">{t("spam")}</option>
                  <option value="inappropriate">{t("inappropriate")}</option>
                  <option value="other">{t("other")}</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">{t("description")}</label>
                <textarea
                  className="textarea"
                  rows="4"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder={t("reportReason")}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowReportModal(false)}>
                {t("cancel")}
              </button>
              <button className="btn btn-primary" onClick={handleReportSubmit}>
                {t("sendReport")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
