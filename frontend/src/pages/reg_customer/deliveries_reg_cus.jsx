import React from 'react';
import {  Truck, Package, Check, ArrowRight, CalendarDays,Droplets } from "lucide-react";
import "./portal.css";
export default function DeliveriesRegCus() {
  const deliveries = [
    {
      id: "TRK-9021-X",
      status: "IN TRANSIT",
      statusClass: "status-transit",
      eta: "Today, 3:00 PM",
      items: "50x 5-Gallon Jugs",

      steps: [
        {
          name: "Ordered",
          date: "Oct 22, 2026",
          time: "10:15 AM",
          completed: true,
          icon: <Check size={22} />,
        },
        {
          name: "Dispatched",
          date: "Oct 23, 2026",
          time: "08:40 AM",
          completed: true,
          icon: <Check size={22} />,
        },
        {
          name: "In Transit",
          date: "Oct 24, 2026",
          time: "01:20 PM",
          active: true,
          icon: <Truck size={21} />,
        },
        {
          name: "Delivered",
          date: "—",
          time: "",
          completed: false,
          icon: null,
        },
      ],

      productType: "jug",
    },

    {
      id: "TRK-8842-Y",
      status: "DISPATCHED",
      statusClass: "status-dispatched",
      eta: "Tomorrow, 10:00 AM",
      items: "2x Industrial Dispensers",

      steps: [
        {
          name: "Ordered",
          date: "Oct 20, 2026",
          time: "09:30 AM",
          completed: true,
          icon: <Check size={22} />,
        },
        {
          name: "Dispatched",
          date: "Oct 21, 2026",
          time: "04:15 PM",
          active: true,
          icon: <Package size={20} />,
        },
        {
          name: "In Transit",
          date: "—",
          time: "",
          completed: false,
          icon: null,
        },
        {
          name: "Delivered",
          date: "—",
          time: "",
          completed: false,
          icon: null,
        },
      ],

      productType: "dispenser",
    },
  ];

  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Active Deliveries</h1>
          <p className="portal-subtitle">Track your ongoing wholesale shipments.</p>
        </div>
      </div>

      <section className="delivery-list">

        {deliveries.map((delivery) => (

          <div
            className="delivery-card"
            key={delivery.id}
          >

            {/* ---------------------------------
                  PRODUCT INFORMATION
              --------------------------------- */}

            <div className="delivery-info">

              {/* PRODUCT IMAGE / ICON */}
              <div
                className={`product-image ${delivery.productType}`}
              >

                {delivery.productType === "jug" ? (
                  <div className="water-jug">
                    <Droplets size={45} />
                  </div>
                ) : (
                  <div className="dispensers">
                    <div className="dispenser black"></div>
                    <div className="dispenser white"></div>
                  </div>
                )}

              </div>


              {/* TEXT */}
              <div className="delivery-details">

                <span
                  className={`delivery-status ${delivery.statusClass}`}
                >
                  {delivery.status}
                </span>

                <h2>
                  {delivery.id}
                </h2>

                <div className="eta">

                  <CalendarDays size={17} />

                  <span>
                    ETA: {delivery.eta}
                  </span>

                </div>

                <p className="delivery-items">
                  {delivery.items}
                </p>

              </div>

            </div>


            {/* ---------------------------------
                  PROGRESS TRACKER
              --------------------------------- */}

            <div className="progress-section">

              <div className="progress-line">

                {delivery.steps.map((step, index) => (

                  <React.Fragment key={step.name}>

                    <div
                      className={`
                          progress-step
                          ${step.completed ? "completed" : ""}
                          ${step.active ? "active" : ""}
                        `}
                    >

                      <div className="step-circle">

                        {step.icon}

                      </div>

                      <strong>
                        {step.name}
                      </strong>

                      <span className="step-date">
                        {step.date}
                      </span>

                      {step.time && (
                        <span className="step-time">
                          {step.time}
                        </span>
                      )}

                    </div>


                    {/* LINE BETWEEN STEPS */}
                    {index < delivery.steps.length - 1 && (

                      <div
                        className={`
                            progress-connector
                            ${delivery.steps[index + 1].completed ||
                            delivery.steps[index + 1].active
                            ? "connector-active"
                            : ""
                          }
                          `}
                      />

                    )}

                  </React.Fragment>

                ))}

              </div>

            </div>


            <div className="delivery-actions">

              <button className="details-button">

                <span>
                  View Details
                </span>

                <ArrowRight size={19} />

              </button>


             

            </div>

          </div>

        ))}

      </section>
    </div>
  );
} 