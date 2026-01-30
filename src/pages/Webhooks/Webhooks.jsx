import React, { useState } from "react";
import "./Webhooks.css";

const Webhooks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <button className="btn-secondary">
              <span className="icon-test">⚡</span> Test
            </button>
            <button className="btn-secondary">
              <span className="icon-live">⚡</span> Live
            </button>
            <button
              className="btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Endpoint
            </button>
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
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="#A855F7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="#A855F7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="#A855F7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 6H5H21"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="webhooks-events-section">
        <h3 className="events-section-title">Available Event Types</h3>
        <div className="events-grid">
          {availableEvents.map((event, index) => (
            <div key={index} className="event-type-item">
              <span className="radio-circle"></span>
              {event}
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
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
                <label>
                  Callback URL <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="https://api.yourapp.com/webhooks"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  Description / Label <span className="text-red">*</span>{" "}
                  (optional)
                </label>
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
                className="btn-cancel"
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
