import { useState } from "react";
import axios from "axios";
import TripForm from "./components/TripForm";
import MapWithRoute from "./components/TripMap";

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

export default function App() {
  const [, setTrip] = useState<Trip | null>(null);
  const [route, setRoute] = useState<RouteData | null>(null);
  const [logs, setLogs] = useState<LogData | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleTripCreated = async (tripData: Trip) => {
    setTrip(tripData);

    const r = await axios.get<RouteData>(
      `${API_URL}/api/trips/${tripData.id}/route/`
    );
    setRoute(r.data);

    const l = await axios.get<LogData>(
      `${API_URL}/api/trips/${tripData.id}/logs/`
    );
    setLogs(l.data);
  };

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center mb-6">🚚 Trip Planner</h1>

        <div className="card shadow-lg bg-base-100 p-6">
          <TripForm onTripCreated={handleTripCreated} />
        </div>

        {route && (
          <div className="card shadow-lg bg-base-100 p-6 space-y-4">
            <h2 className="text-2xl font-semibold">📍 Route Info</h2>
            <p className="text-lg">Distance: <span className="font-bold">{route.distance_km.toFixed(2)} km</span></p>
            <p className="text-lg">Duration: <span className="font-bold">{route.duration_hours.toFixed(2)} hrs</span></p>
            <MapWithRoute route={route} />
          </div>
        )}

        {logs && (
          <div className="card shadow-lg bg-base-100 p-6">
            <h2 className="text-2xl font-semibold mb-2">📝 HOS Logs</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(logs, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
