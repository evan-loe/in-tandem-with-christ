import { useState, useEffect } from "react";
import AnimatedSliding from "../components/AnimatedSliding";
import Page from "../components/Page";
import ParkingLocation from "../components/checkin_views/ParkingLocation";
import ParkingInfo from "../components/checkin_views/ParkingInfo";
import PersonInfo from "../components/checkin_views/PersonInfo";
import CheckedIn from "../components/checkin_views/CheckedIn";

function getCurrentSession() {
  const session_id = localStorage.getItem("session_id");
  const expires_at = localStorage.getItem("expires_at");

  if (expires_at < Date.now() / 1000) {
    localStorage.removeItem("session_id");
    localStorage.removeItem("expires_at");
    return;
  }
  return session_id;
}

function Home() {
  const [view, setView] = useState("parking-location");
  const [direction, setDirection] = useState(1);
  const [parkingInfo, setParkingInfo] = useState({});

  useEffect(() => {
    const session_id = getCurrentSession();
    if (session_id) {
      fetch(
        "/api/session?" +
          new URLSearchParams({
            session_id,
          })
      )
        .then((response) => response.json())
        .then((parkingInfo) => {
          setParkingInfo(parkingInfo);
          setView("checkedin");
        });
    }
  }, []);

  const handleViewSubmit = ({ direction, view, data }) => {
    setDirection(direction);
    setView(view);

    if (view === "submit") {
      fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify({
          ...parkingInfo,
          ...data,
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            localStorage.setItem("session_id", data.session_id);
            localStorage.setItem("expires_at", data.expires_at);
            setView("checkedin");
            setParkingInfo({
              ...parkingInfo,
              ...data,
            });
          } else {
            console.log(data.errors);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setParkingInfo({
        ...parkingInfo,
        ...data,
      });
    }
  };

  return (
    <Page>
      <div className="flex flex-col w-full items-center h-full">
        <h1 className="font-semibold text-2xl my-4 self-start">
          {view === "parking-location"
            ? "Welcome to NYCBC Tandem Parking"
            : "NYCBC Tandem Parking"}
        </h1>
        <AnimatedSliding
          key={view}
          direction={direction}
          className="w-full h-full"
        >
          {view === "parking-location" && (
            <ParkingLocation handleViewSubmit={handleViewSubmit} />
          )}
          {view === "parking-info" && (
            <ParkingInfo handleViewSubmit={handleViewSubmit} />
          )}
          {view === "person-info" && (
            <PersonInfo
              handleViewSubmit={handleViewSubmit}
              parkingLocation={parkingInfo.parkingLocation}
            />
          )}
          {view === "submit" && <div>Submitting...</div>}
          {view === "checkedin" && <CheckedIn info={parkingInfo} />}
        </AnimatedSliding>
      </div>
    </Page>
  );
}

export default Home;
