import React, { useState } from "react";
import "./AddVehicle.css";

export default function AddVehicle({ onClose, onAdd }) {
  const [vehicle, setVehicle] = useState({
    registrationNumber: "",
    vehicleType: "",
    make: "",
    model: "",
    year: "",
    fuelType: "",
    capacity: "",
    status: "Idle",
    driver: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVehicle((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !vehicle.registrationNumber ||
      !vehicle.vehicleType ||
      !vehicle.make ||
      !vehicle.model ||
      !vehicle.year ||
      !vehicle.capacity
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onAdd(vehicle);
  };

  return (
    <div className="vehicle-modal-overlay">

      <div className="vehicle-modal">

        {/* Header */}
        <div className="vehicle-modal-header">

          <div>
            <h2>Add Vehicle</h2>

            <p>
              Basic information for vehicle registration.
            </p>
          </div>

          <button
            type="button"
            className="vehicle-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="vehicle-form-body">

            <h3>Vehicle Information</h3>

            <div className="vehicle-form-grid">

              {/* Registration Number */}
              <div className="vehicle-form-group">

                <label>
                  Registration Number <span>*</span>
                </label>

                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="e.g. WP ABC-1234"
                  value={vehicle.registrationNumber}
                  onChange={handleChange}
                />

              </div>

              {/* Vehicle Type */}
              <div className="vehicle-form-group">

                <label>
                  Vehicle Type <span>*</span>
                </label>

                <select
                  name="vehicleType"
                  value={vehicle.vehicleType}
                  onChange={handleChange}
                >
                  <option value="">
                    Select vehicle type
                  </option>

                  <option value="Truck">
                    Truck
                  </option>

                  <option value="Van">
                    Van
                  </option>

                  <option value="Lorry">
                    Lorry
                  </option>

                  <option value="Car">
                    Car
                  </option>

                </select>

              </div>

              {/* Make */}
              <div className="vehicle-form-group">

                <label>
                  Make <span>*</span>
                </label>

                <input
                  type="text"
                  name="make"
                  placeholder="e.g. Toyota"
                  value={vehicle.make}
                  onChange={handleChange}
                />

              </div>

              {/* Model */}
              <div className="vehicle-form-group">

                <label>
                  Model <span>*</span>
                </label>

                <input
                  type="text"
                  name="model"
                  placeholder="e.g. Hilux"
                  value={vehicle.model}
                  onChange={handleChange}
                />

              </div>

              {/* Year */}
              <div className="vehicle-form-group">

                <label>
                  Manufacturing Year <span>*</span>
                </label>

                <input
                  type="number"
                  name="year"
                  placeholder="e.g. 2024"
                  min="1980"
                  max={new Date().getFullYear()}
                  value={vehicle.year}
                  onChange={handleChange}
                />

              </div>

              {/* Fuel Type */}
              <div className="vehicle-form-group">

                <label>
                  Fuel Type
                </label>

                <select
                  name="fuelType"
                  value={vehicle.fuelType}
                  onChange={handleChange}
                >

                  <option value="">
                    Select fuel type
                  </option>

                  <option value="Diesel">
                    Diesel
                  </option>

                  <option value="Petrol">
                    Petrol
                  </option>

                  <option value="Electric">
                    Electric
                  </option>

                  <option value="Hybrid">
                    Hybrid
                  </option>

                </select>

              </div>

              {/* Capacity */}
              <div className="vehicle-form-group">

                <label>
                  Capacity <span>*</span>
                </label>

                <input
                  type="text"
                  name="capacity"
                  placeholder="e.g. 2000 kg"
                  value={vehicle.capacity}
                  onChange={handleChange}
                />

              </div>

              {/* Status */}
              <div className="vehicle-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={vehicle.status}
                  onChange={handleChange}
                >

                  <option value="Idle">
                    Idle
                  </option>

                  <option value="In Transit">
                    In Transit
                  </option>

                  <option value="Maintenance">
                    Maintenance
                  </option>

                </select>

              </div>

              {/* Driver */}
              <div className="vehicle-form-group full-width">

                <label>
                  Assigned Driver
                </label>

                <select
                  name="driver"
                  value={vehicle.driver}
                  onChange={handleChange}
                >

                  <option value="">
                    Unassigned
                  </option>

                  <option value="John Doe">
                    W.D.Rathnayaka
                  </option>

                  <option value="Sarah Jenkins">
                    D.S.D.Liyanarachchi
                  </option>

                </select>

              </div>

              {/* Notes */}
              <div className="vehicle-form-group full-width">

                <label>
                  Notes
                </label>

                <textarea
                  name="notes"
                  placeholder="Additional information..."
                  rows="3"
                  value={vehicle.notes}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="vehicle-modal-footer">

            <button
              type="button"
              className="vehicle-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="vehicle-save-btn"
            >
              + Add Vehicle
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}