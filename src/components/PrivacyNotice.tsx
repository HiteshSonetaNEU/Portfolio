import React, { useState, useEffect } from 'react';
import './PrivacyNotice.scss';

interface PrivacyNoticeProps {
  onConsent: (consent: boolean) => void;
}

function PrivacyNotice({ onConsent }: PrivacyNoticeProps) {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('tracking_consent');
    if (consent === null) {
      setShowNotice(true);
    } else {
      onConsent(consent === 'true');
    }
  }, [onConsent]);

  const handleAccept = () => {
    localStorage.setItem('tracking_consent', 'true');
    setShowNotice(false);
    onConsent(true);
  };

  const handleDecline = () => {
    localStorage.setItem('tracking_consent', 'false');
    setShowNotice(false);
    onConsent(false);
  };

  if (!showNotice) return null;

  return (
    <div className="privacy-notice">
      <div className="privacy-notice-content">
        <div className="privacy-text">
          <h4>🍪 Privacy Notice</h4>
          <p>
            This website uses analytics to track visitor statistics (location, browser, visit time) 
            to help improve the user experience. No personal information is collected.
          </p>
        </div>
        <div className="privacy-buttons">
          <button className="accept-btn" onClick={handleAccept}>
            Accept
          </button>
          <button className="decline-btn" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyNotice;
