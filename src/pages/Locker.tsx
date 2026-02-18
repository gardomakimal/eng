import React, { useEffect, useRef, useState } from "react";

interface LockerProps {
  onClose: () => void;
}

export default function Locker({ onClose }: LockerProps) {
  const [offers, setOffers] = useState<any[]>([]);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const REQUIRED = 3;

  // YOUR CPA INFO
  const USER_ID = "319070";
  const API_KEY = "3585ee70b06a7d74d5b8877f63d87db3";
  const BASE = "https://d1y3y09sav47f5.cloudfront.net";

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadOffers();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const loadOffers = async () => {
    try {
      const res = await fetch(
        `${BASE}/public/offers/feed.php?user_id=${USER_ID}&api_key=${API_KEY}&s1=test`,
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        setOffers(data.slice(0, 5));
      }
    } catch (err) {
      console.error("Offer fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = (offerId: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          `${BASE}/public/offers/check_status.php?user_id=${USER_ID}&offer_id=${offerId}`,
        );
        const result = await res.json();

        if (result.status === "completed" || result.success === true) {
          setCompleted((prev) => {
            const updated = new Set(prev);
            updated.add(offerId);

            if (updated.size >= REQUIRED) {
              clearInterval(intervalRef.current!);
              alert("Unlocked!");
              onClose();
            }

            return updated;
          });
        }
      } catch {}
    }, 5000);
  };

  const handleClick = (offer: any) => {
    window.open(offer.url, "_blank");
    checkStatus(offer.id);
  };

  return (
    <div style={overlay}>
      <div style={box}>
        <h2>Verification Required</h2>
        <p>Complete {REQUIRED} offers to unlock.</p>

        {loading ? (
          <p>Loading offers...</p>
        ) : (
          offers.map((offer) => (
            <button
              key={offer.id}
              onClick={() => handleClick(offer)}
              disabled={completed.has(offer.id)}
              style={btn}
            >
              {completed.has(offer.id) ? "✔ Completed" : offer.anchor}
            </button>
          ))
        )}

        <button onClick={onClose} style={{ marginTop: 20 }}>
          Close
        </button>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const box: React.CSSProperties = {
  background: "#fff",
  padding: 30,
  borderRadius: 10,
  width: 350,
  textAlign: "center",
};

const btn: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: 10,
  marginTop: 10,
  cursor: "pointer",
};
