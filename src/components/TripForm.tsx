import { useState } from "react";
import axios from "axios";

interface TripFormProps {
  onTripCreated: (trip: any) => void; 
}

export default function TripForm({ onTripCreated }: TripFormProps) {
  const [form, setForm] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    cycle_hours_used: 0,
  });

  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API_URL =", API_URL);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        current_cycle_hours: Number(form.cycle_hours_used), 
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
    <section className="bg-gray-100 py-10  items-center justify-center" >
      <div className="container mx-auto px-25">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 ">
          {/* Left Form */}
          <div className="lg:col-span-2 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Plan Your Trip
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Current Location
                </label>
                <input
                  type="text"
                  name="current_location"
                  value={form.current_location}
                  onChange={handleChange}
                  placeholder="Enter current location"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickup_location"
                  value={form.pickup_location}
                  onChange={handleChange}
                  placeholder="Enter pickup location"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Dropoff Location
                </label>
                <input
                  type="text"
                  name="dropoff_location"
                  value={form.dropoff_location}
                  onChange={handleChange}
                  placeholder="Enter dropoff location"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Cycle Hours Used
                </label>
                <input
                  type="number"
                  name="cycle_hours_used"
                  value={form.cycle_hours_used}
                  onChange={handleChange}
                  placeholder="Enter cycle hours"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                 className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 
               hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 
               dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 
               text-center me-2 mb-2"
                >
                  ➤ Create Trip
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Info Box */}
          <div className="bg-green-600 text-white p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-4">Trip Information</h3>
              <p className="mb-2">• Enter your trip details</p>
              <p className="mb-2">• We’ll calculate the route</p>
              <p className="mb-2">• Map will be shown below</p>
            </div>
            <div className="mt-6 space-y-2">
              <p className="flex items-center gap-2">📍 Location Details</p>
              <p className="flex items-center gap-2">⏱️ Cycle Hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
