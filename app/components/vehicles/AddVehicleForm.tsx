import { useState } from "react";

export default function AddVehicleForm() {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      alert(`Vehicle added:\n ${JSON.stringify(result)}`);
      form.reset();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form className="w-100" onSubmit={handleSubmit}>
        <label className="row mb-2">
          <span className="col-md-2 px-2">Name:</span>
          <input
            className="col-md-10"
            type="text"
            name="name"
            required
            pattern="[A-Za-z\s]+"
          />
        </label>
        <label className="row mb-2">
          <span className="col-md-2 px-2">Capacity (kg):</span>
          <input
            className="col-md-10"
            type="number"
            name="capacityKg"
            min={0}
            max={10000}
            step={10}
            required
          />
        </label>
        <label className="row mb-2">
          <span className="col-md-2 px-2">Tyres ?</span>
          <input
            className="col-md-10"
            type="number"
            name="tyres"
            min={2}
            max={500}
            required
          />
        </label>
        <div className="row">
          <div className="col-md-6 text-center">
            <input
              className="w-50 rounded-pill m-1"
              type="submit"
              value={loading ? "Adding..." : "Add Vehicle"}
              disabled={loading}
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
    </>
  );
}
