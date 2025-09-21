/**
 * display a list of available vehicles
 * each list item contain
 * Vehicle Name, Capacity, Tyres, Estimated Ride Duration, Book Now button
 * on clicking book now button,
 * get respective vehicle details from list item/table row
 * call the book api endpoint
 * display response message as alert
 */

import React, { useState } from "react";

export default function AvailableVehiclesForBooking({
  results,
}: {
  results: any;
}) {
  const [loading, setLoading] = useState(false);
  async function bookAVehicle(payload: any) {
    const { _id, ...rest } = payload;
    const newPayload = {
      vehicleId: _id,
      customerId: Math.random().toString(36).slice(2, 8),
      ...rest,
    };
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newPayload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} ${result?.error || response.statusText}`
        );
      }
      alert(`Booked:\n ${result?.message}
        `);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const sampleData = results?.vehicles || [];
  return (
    <div>
      <h3 className="text-center border border-4 border-danger bg-warning">
        Available Vehicles
      </h3>
      {sampleData.length === 0 ? (
        <p className="text-center">
          No vehicles available for the selected criteria.
        </p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="text-center">
            <tr>
              <th>Name</th>
              <th>Capacity</th>
              <th>Tyres</th>
              <th>Estimated Ride Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sampleData?.map((vehicle: any, index: number) => (
              <tr key={index}>
                <td>{vehicle.name}</td>
                <td>{`${vehicle.capacityKg} Kg`}</td>
                <td>{vehicle.tyres}</td>
                <td>
                  {results?.estimatedRideDurationHours
                    ? `${results?.estimatedRideDurationHours} hours`
                    : "---"}
                </td>
                <td>
                  <button
                    className="rounded-pill px-2"
                    disabled={loading}
                    onClick={async () => {
                      await bookAVehicle({ ...vehicle, ...results?.booking });
                    }}
                  >
                    {loading ? "Booking...": "Book Now"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
