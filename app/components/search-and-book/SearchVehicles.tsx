import { useState } from "react";
import AvailableVehiclesForBooking from "./AvailableVehiclesForBooking";

export default function SearchVehicles() {
  const [availableVehicles, setAvailableVehicles] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/vehicles/available?${new URLSearchParams(
          data as any
        ).toString()}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      const { capacityRequired, ...booking } = data;
      setAvailableVehicles({ ...result, booking });
      // form.reset();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setAvailableVehicles([]);
  }

  return (
    <>
      <form className="w-100" onSubmit={handleSubmit} onReset={handleReset}>
        <label className="row mb-2">
          <span className="col-md-2 px-2">Capacity Required:</span>
          <div className="col-md-10">
            <input
              className="w-100 px-1"
              type="number"
              name="capacityRequired"
              required
              min={0}
              max={10000}
              step={10}
            />
          </div>
        </label>
        <label className="row mb-2">
          <span className="col-md-2 px-2">From Pincode:</span>
          <div className="col-md-10">
            <input
              className="w-100 px-1"
              type="text"
              name="fromPincode"
              pattern="\d{6}"
              required
            />
          </div>
        </label>
        <label className="row mb-2">
          <span className="col-md-2 px-2">To Pincode:</span>
          <div className="col-md-10">
            <input
              className="w-100 px-1"
              type="text"
              name="toPincode"
              pattern="\d{6}"
              required
            />
          </div>
        </label>
        <label className="row mb-2">
          <span className="col-md-2 px-2">Start Date &amp; Time:</span>
          <div className="col-md-10">
            <input
              className="w-100 px-1"
              type="datetime-local"
              name="startTime"
              required
            />
          </div>
        </label>
        <div className="row">
          <div className="col-md-6 text-center">
            <input
              className="w-50 rounded-pill m-1"
              type="submit"
              disabled={loading}
              value={loading ? "Searching..." : "Search Availability"}
            />
          </div>
          <div className="col-md-6 text-center">
            <input
              className="w-50 rounded-pill m-1"
              type="reset"
              value="Reset"
            />
          </div>
        </div>
      </form>
      <hr />
      <AvailableVehiclesForBooking results={availableVehicles} />
    </>
  );
}
