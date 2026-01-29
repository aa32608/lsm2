"use client";
import React, { useState, useEffect } from "react";

const FREE_TRIAL_DEADLINE_MS = new Date('2026-02-23T23:59:59.999Z').getTime();

function getTimeLeft() {
  const now = Date.now();
  if (now >= FREE_TRIAL_DEADLINE_MS) return null;
  const diff = FREE_TRIAL_DEADLINE_MS - now;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds };
}

export default function FreeTrialCountdown({ t }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeLeft();
      setTimeLeft(next);
      if (!next) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="free-trial-countdown" role="timer" aria-label={t("freeTrialCountdown") || "Time left for free offer"}>
      <span className="free-trial-countdown-label">{t("freeTrialEndsIn") || "Offer ends in"}:</span>
      <div className="free-trial-countdown-units">
        <span className="free-trial-countdown-unit">
          <strong>{timeLeft.days}</strong>
          <span>{t("days") || "d"}</span>
        </span>
        <span className="free-trial-countdown-unit">
          <strong>{String(timeLeft.hours).padStart(2, '0')}</strong>
          <span>{"h"}</span>
        </span>
        <span className="free-trial-countdown-unit">
          <strong>{String(timeLeft.minutes).padStart(2, '0')}</strong>
          <span>{t("minutes") || "m"}</span>
        </span>
        <span className="free-trial-countdown-unit">
          <strong>{String(timeLeft.seconds).padStart(2, '0')}</strong>
          <span>{t("seconds") || "s"}</span>
        </span>
      </div>
    </div>
  );
}
