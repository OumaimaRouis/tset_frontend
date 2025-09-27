interface Trip {
  id: number;
  current_location: string;
  pickup_location: string;
  dropoff_location: string;
  current_cycle_hours: number;
}

interface RouteData {
  start: string;
  pickup: string;
  dropoff: string;
  distance_km: number;
  duration_hours: number;
  geometry: [number, number][];
}

interface LogData {
  logs: {
    date: string;
    entries: { time: string; status: string }[];
  }[];
}

import { useState } from "react";
import axios from "axios";
import TripForm from "./components/TripForm";
import MapWithRoute from "./components/TripMap";

export default function App() {
  const [, setTrip] = useState<Trip | null>(null);
  const [route, setRoute] = useState<RouteData | null>(null);
  const [logs, setLogs] = useState<LogData | null>(null);

  // ✅ Use the environment variable
  const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL =", API_URL);
console.log("ENV:", import.meta.env);


  const handleTripCreated = async (tripData: Trip) => {
    setTrip(tripData);

    const r = await axios.get<RouteData>(
      `${API_URL}/api/trips/${tripData.id}/route/`
    );
    console.log("Route response:", r.data);
    setRoute(r.data);

    const l = await axios.get<LogData>(
      `${API_URL}/api/trips/${tripData.id}/logs/`
    );
    setLogs(l.data);
  };

  return (
    <div>
      <h1>Trip Planner</h1>
      <TripForm onTripCreated={handleTripCreated} />

      {route && (
        <>
          <h2>Route Info</h2>
          <p>Distance: {route.distance_km} km</p>
          <p>Duration: {route.duration_hours} hrs</p>
          {route && <MapWithRoute route={route} />}
        </>
      )}

      {logs && (
        <>
          <h2>HOS Logs</h2>
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
