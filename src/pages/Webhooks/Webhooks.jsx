import React, { useState } from "react";
import "./Webhooks.css";
import { RiDeleteBinLine } from "react-icons/ri";
import EnvironmentSwitch from "../../components/ui/EnvironmentSwitch/EnvironmentSwitch";
import { LuTestTube } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import { HiMiniPlus } from "react-icons/hi2";
import Right_sidebutton from "../../components/ui/Right_sidebutton/Right_sidebutton";

const Webhooks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [environment, setEnvironment] = useState("test");
  const [selectedEvent, setSelectedEvent] = useState('');
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      url: "https://api.yourapp.com/webhooks/payments",
      status: "Disabled",
      eventCount: 2,
      events: ["payment.success", "user.created"],
      active: false,
    },
    {
      id: 2,
      url: "https://api.yourapp.com/webhooks/payments",
      status: "Disabled",
      eventCount: 2,
      events: ["payment.success", "user.created"],
      active: false,
    },
  ]);

  const availableEvents = [
    "payment.success",
    "payment.failed",
    "payment.refund",
    "transaction.completed",
    "transaction.pending",
    "user.created",
    "user.updated",
    "user.deleted",
    "subscription.created",
    "subscription.cancelled",
  ];
  const toggleWebhook = (id) => {
    setWebhooks((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              active: !w.active,
              status: w.active ? "Disabled" : "Enabled",
            }
          : w,
      ),
    );
  };
  return (
    <div className="webhooks-page-container">
      <div className="webhooks-content-scrollable">
        <div className="webhooks-header">
          <div>
            <h1 className="webhooks-title">Webhooks</h1>
            <p className="webhooks-subtitle">
              Manage webhook endpoints and event subscriptions
            </p>
          </div>
          <div className="webhooks-actions">
            <EnvironmentSwitch
              value={environment}
              onChange={setEnvironment}
              left={{ label: "Test", value: "sandbox", icon: <LuTestTube /> }}
              right={{ label: "Live", value: "prod", icon: <BsLightningCharge /> }}
            />
            <Right_sidebutton onClick={() => setIsModalOpen(true)} TextonButton={'Add Endpoint'}/>
          </div>
        </div>
        <div className="webhooks-list">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="webhook-card">
              <div className="webhook-card-header">
                <div className="webhook-info">
                  <div className="webhook-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.9353 16.9222H11.9666C10.8705 16.9222 10.0235 17.8588 9.49543 18.8154C9.07737 19.5999 8.40909 20.2221 7.59682 20.5831C6.78455 20.9441 5.8749 21.0233 5.01249 20.8079C4.15007 20.5926 3.38437 20.0952 2.83712 19.3947C2.28987 18.6943 1.99247 17.831 1.99219 16.9421C2.00215 16.2446 2.19148 15.5471 2.56016 14.9492"
                        stroke="#ffffff"
                        stroke-width="1.99289"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.97852 16.9425L9.09739 11.183C9.62551 10.2165 9.19704 9.01076 8.59917 8.09403C8.31699 7.64274 8.12805 7.13951 8.04351 6.61402C7.95897 6.08853 7.98052 5.55143 8.10691 5.03441C8.23331 4.51739 8.46197 4.03092 8.77941 3.6037C9.09685 3.17648 9.49665 2.81717 9.9552 2.54696C10.4138 2.27675 10.9218 2.10112 11.4493 2.03043C11.9769 1.95974 12.5132 1.99542 13.0267 2.13537C13.5402 2.27532 14.0205 2.5167 14.4392 2.84527C14.858 3.17385 15.2066 3.58296 15.4647 4.04846"
                        stroke="#ffffff"
                        stroke-width="1.99289"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.957 5.98047L15.0759 11.6901C15.604 12.6567 16.8396 12.9556 17.9357 12.9556C18.9928 12.9556 20.0066 13.3755 20.7541 14.123C21.5016 14.8705 21.9215 15.8843 21.9215 16.9414C21.9215 17.9985 21.5016 19.0123 20.7541 19.7598C20.0066 20.5072 18.9928 20.9272 17.9357 20.9272"
                        stroke="#ffffff"
                        stroke-width="1.99289"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="webhook-details">
                    <div className="webhook-url">{webhook.url}</div>
                    <div className="webhook-tags">
                      <span className="status-badge disabled">
                        ● {webhook.status}
                      </span>
                      <span className="events-badge">
                        {webhook.eventCount} events
                      </span>
                    </div>
                  </div>
                </div>
                <div className="webhook-toggle">
                  <div
                    className="switch"
                    onClick={() => toggleWebhook(webhook.id)}
                  >
                    <input
                      type="checkbox"
                      checked={webhook.active}
                      onChange={() => {}}
                    />
                    <span className="slider round"></span>
                  </div>
                </div>
              </div>
              <div className="webhook-subscribed-events">
                <p>Subscribed Events:</p>
                <div className="subscribed-events-list">
                  {webhook.events.map((event, index) => (
                    <span key={index} className="event-tag">
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              <div className="webhook-card-actions">
                <button className="btn-test-block">▶ Test</button>
                <button className="btn-delete-icon">
                  <RiDeleteBinLine color="var(--red)" size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="webhooks-events-section">
        <h3 className="events-section-title">Available Event Types</h3>
        {/* <div className="events-grid">
          {availableEvents.map((event, index) => (
            <div key={index} className="event-type-item">
              <span type="radio" className="radio-circle"></span>
              {event}
            </div>
          ))}
        </div> */}
         <div className="events-grid">
      {availableEvents.map((event, index) => (
        <div key={index} className="event-type-item">
          <input 
            type="radio" 
            name="event-type" 
            value={event}
            checked={selectedEvent === event}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="radio-circle"
            style={{ marginRight: '8px' }}
          />
          {event}
        </div>
      ))}
    </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-webhooks">
              <div className="modal-title-group">
                <div className="modal-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="modal-title">Add New Webhook</h2>
                  <p className="modal-subtitle">
                    Configure a callback URL for events
                  </p>
                </div>
              </div>
              <button
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <p className="webhook">
                  Callback URL <span className="text-red">*</span>
                </p>
                <input
                  type="text"
                  placeholder="https://api.yourapp.com/webhooks"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <p  className="webhook">
                  Description / Label <span className="text-red">*</span>{" "}
                  (optional)
                </p>
                <input
                  type="text"
                  placeholder="Production payment webhook"
                  className="form-input"
                />
              </div>

              <div className="security-note">
                <strong>Security Note:</strong>
                <p>
                  Webhooks must use HTTPS. You'll receive a secret key after
                  creation to validate webhook signatures.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel-webhook"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-add">Add Webhook</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webhooks;
