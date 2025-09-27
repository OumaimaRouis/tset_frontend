import { useState } from "react";
import axios from "axios";

interface TripFormProps {
  onTripCreated: (trip: any) => void; // you can refine "any" later with a Trip type
}

export default function TripForm({ onTripCreated }: TripFormProps) {
  const [form, setForm] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    cycle_hours_used: 0
  });
  const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL =", API_URL);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:React.FormEvent) => {
  e.preventDefault();
  try {
    const payload = {
      ...form,
      current_cycle_hours: Number(form.cycle_hours_used)
    };
    console.log("Payload sent to backend:", payload);

    const res = await axios.post(`${API_URL}/api/trips/`, payload);
    onTripCreated(res.data);
  } catch (err) {
    console.error(err);
    alert("Trip creation failed");
  }
  
};

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input name="current_location" placeholder="Current Location" onChange={handleChange} />
      <input name="pickup_location" placeholder="Pickup Location" onChange={handleChange} />
      <input name="dropoff_location" placeholder="Dropoff Location" onChange={handleChange} />
      <input name="cycle_hours_used" type="number" placeholder="Cycle Hours Used" onChange={handleChange} />
      <button type="submit">Create Trip</button>
    </form>
  );
}
