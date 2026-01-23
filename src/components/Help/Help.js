import React, { useState } from "react";
import {
  X,
  Plus,
  Play,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  User,
  Mail,
  Phone,
  Home,
  MessageCircle,
  Send,
  ArrowRight,
} from "lucide-react";
import "./Help.css";
import { MdSend } from "react-icons/md";
import Images from "../../Images/Images";
import { CiCirclePlus } from "react-icons/ci";

const Help = ({ onClose }) => {
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [message, setMessage] = useState("");

  const faqData = [
    {
      question: "How to add funds to your flowpipe API wallet ?",
      answer:
        "We have a Prepaid recharge model and you will be charged on each API call basis for the successful transaction. Per transaction cost of each service depends on the plan you avail.\n\nTo know more, log-in to the platform and you can check it under the 'Billing section",
    },
    {
      question:
        "How long it take for the amount to reflect in my business wallet",
      answer:
        "Usually, it's instant. However, in some rare cases involving bank downtimes, it might take up to 24-48 hours.",
    },
    {
      question: "What is the Add Account option",
      answer:
        "The Add Account option allows you to link multiple sub-accounts or beneficiary accounts to your main Flowpipe profile for easier fund management.",
    },
    {
      question: "How to reset my API Key",
      answer:
        "Navigate to the 'API Keys' section in the sidebar. Click on 'Regenerate Key' next to the key you want to rotate. Note that this will invalidate the old key.",
    },
  ];

  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div
        className="help-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Changes Based on View */}
        <div className="help-modal-header">
          {selectedFaq || showContact || showLiveChat ? (
            <div className="help-header-nav">
              {showLiveChat ? (
                activeTab === "home" ? (
                  <h2 className="help-chat-title help-chat-title-left">
                    Hello! 👋
                  </h2>
                ) : (
                  <div className="help-modal-header-mess">
                    <h2 className="help-chat-title help-chat-title-center">
                      Messages
                    </h2>
                  </div>
                )
              ) : (
                <button
                  className="help-back-btn"
                  onClick={() => {
                    setSelectedFaq(null);
                    setShowContact(false);
                    setShowLiveChat(false);
                  }}
                >
                  <ArrowLeft size={24} color="white" />
                  <span>Back</span>
                </button>
              )}
            </div>
          ) : (
            <h2 className="help-modal-title">We are here to help :)</h2>
          )}

          <button className="help-modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div
          className={`help-modal-body ${showLiveChat ? "help-chat-body" : ""}`}
        >
          {showLiveChat ? (
            // Live Chat View
            <div className="help-live-chat-view">
              {activeTab === "home" ? (
                // Home Tab
                <div className="help-chat-home">
                  <div className="help-chat-welcome">
                    <p className="help-chat-welcome-text">
                      Welcome to our chat page. We are here to answer all your
                      questions.
                    </p>
                  </div>
                  <div className="help-chat-input-container">
                    <input
                      type="text"
                      placeholder="Send us a message"
                      className="help-chat-input"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="help-chat-send-btn">
                      <MdSend size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                // Messages Tab
                <div className="help-chat-messages">
                  <div className="help-messages-empty">
                    <img
                      src={Images.msgicon}
                      className="help-messages-empty-icon"
                    />
                    <h3 className="help-messages-empty-title">No messages</h3>
                    <p className="help-messages-empty-text">
                      Messages from the team will be shown here.
                    </p>
                    <button
                      className="help-messages-send-btn"
                      onClick={() => setActiveTab("home")}
                    >
                      <span>Send us a message</span>
                      <MdSend size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : showContact ? (
            // Contact View
            <div className="help-contact-view">
              {/* Still have Questions? */}
              <div className="help-questions-section">
                <h3 className="help-questions-title">Still have Questions?</h3>
                <p className="help-questions-subtitle">
                  Ask our team of experts any questions. available 24/7.
                </p>
                <div className="help-action-buttons">
                  <button
                    className="help-btn help-btn-primary"
                    onClick={() => {
                      setShowContact(false);
                      setShowLiveChat(true);
                      setActiveTab("home");
                    }}
                  >
                    Live Chat
                  </button>
                  <button className="help-btn help-btn-outline">
                    Contact Us
                  </button>
                </div>
              </div>

              {/* Customer Service */}
              <div className="help-contact-card">
                <h4 className="help-section-title">Customer Service</h4>
                <div className="Content-row-div">
                <div className="help-contact-details">
                  <div className="help-contact-item">
                    <div className="bg-for-icon">
                    <User size={20} className="help-contact-icon" />
                    </div>
                    <span className="help-contact-text">24*7 Helpdesk</span>
                  </div>
                  <div className="help-contact-item">
                    <div className="bg-for-icon">
                    <Mail size={20} className="help-contact-icon" />
                    </div>
                    <span className="help-contact-text">help@flowpipe.in</span>
                  </div>
                  
                </div>
                <div className="help-contact-item">
                    <div className="bg-for-icon">
                    <Phone size={20} className="help-contact-icon" />
                    </div>
                    <span className="help-contact-text">8659864548</span>
                  </div>
                  </div>
              </div>

              {/* FAQs */}
              <div className="help-faqs-section">
                <h4 className="help-section-title">FAQs</h4>
                <div className="help-faq-list">
                  {faqData.map((item, index) => (
                    <div
                      key={index}
                      className="help-faq-item"
                      onClick={() => {
                        setShowContact(false);
                        setSelectedFaq(item);
                      }}
                    >
                      <span className="help-faq-text">{item.question}</span>
                      <CiCirclePlus size={24} className="help-faq-icon" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Help videos */}
              <div className="help-videos-section">
                <h4 className="help-section-title">Help videos</h4>
                <div className="help-video-card">
                  <img
                    src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                    alt="Video Thumbnail"
                    className="help-video-thumbnail"
                  />
                  <div className="help-video-overlay">
                    <div className="help-play-icon">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedFaq ? (
            // Detail View
            <div className="help-detail-view">
              <h3 className="help-detail-question">{selectedFaq.question}</h3>
              <div className="help-detail-answer">
                {selectedFaq.answer.split("\n").map((line, i) => (
                  <p key={i} style={{ marginBottom: line ? "1em" : 0 }}>
                    {line}
                  </p>
                ))}
              </div>

              <div className="help-feedback-section">
                <button className="help-feedback-btn">
                  <ThumbsUp size={18} />
                  <span>Helpful</span>
                </button>
                <button className="help-feedback-btn">
                  <ThumbsDown size={18} />
                  <span>Not Helpful</span>
                </button>
              </div>
            </div>
          ) : (
            // Main List View
            <>
              {/* Still have Questions? */}
              <div className="help-questions-section">
                <h3 className="help-questions-title">Still have Questions?</h3>
                <p className="help-questions-subtitle">
                  Ask our team of experts any questions. available 24/7.
                </p>
                <div className="help-action-buttons">
                  <button
                    className="help-btn help-btn-primary"
                    onClick={() => {
                      setShowLiveChat(true);
                      setActiveTab("home");
                    }}
                  >
                    Live Chat
                  </button>
                  <button
                    className="help-btn help-btn-outline"
                    onClick={() => setShowContact(true)}
                  >
                    Contact Us
                  </button>
                </div>
              </div>

              {/* FAQs */}
              <div className="help-faqs-section">
                <h4 className="help-section-title">FAQs</h4>
                <div className="help-faq-list">
                  {faqData.map((item, index) => (
                    <div
                      key={index}
                      className="help-faq-item"
                      onClick={() => setSelectedFaq(item)}
                    >
                      <span className="help-faq-text">{item.question}</span>
                      <CiCirclePlus size={24} className="help-faq-icon" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Help videos */}
              <div className="help-videos-section">
                <h4 className="help-section-title">Help videos</h4>
                <div className="help-video-card">
                  <img
                    src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                    alt="Video Thumbnail"
                    className="help-video-thumbnail"
                  />
                  <div className="help-video-overlay">
                    <div className="help-play-icon">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Navigation Tabs - Only show in Live Chat */}
        {showLiveChat && (
          <div className="help-chat-bottom-nav">
            <button
              className={`help-nav-tab ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              <Home size={24} />
              <span>Home</span>
            </button>
            <button
              className={`help-nav-tab ${activeTab === "messages" ? "active" : ""}`}
              onClick={() => setActiveTab("messages")}
            >
              <img src={Images.msgicon} className="help-messages-empty-icon-nav" />
              <span>Messages</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
