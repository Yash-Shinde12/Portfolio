import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, MapPin, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { CONFIG } from "../config";
import { GithubIcon, LinkedinIcon } from "./GithubIcon";
import StaggerText from "./StaggerText";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setErrorMsg("");

    // Check if EmailJS credentials are provided
    if (CONFIG.emailjs.serviceId && CONFIG.emailjs.templateId && CONFIG.emailjs.publicKey) {
      try {
        const response = await emailjs.send(
          CONFIG.emailjs.serviceId,
          CONFIG.emailjs.templateId,
          {
            name: formData.name,
            from_name: formData.name,
            user_name: formData.name,
            email: formData.email,
            from_email: formData.email,
            user_email: formData.email,
            reply_to: formData.email,
            message: formData.message,
            to_name: CONFIG.name,
          },
          CONFIG.emailjs.publicKey
        );

        if (response.status === 200) {
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
        }
      } catch (err: any) {
        console.error("EmailJS Error details:", err);
        const detailedError = err?.text || err?.message || "Check template or service setup.";
        setErrorMsg(`EmailJS Error: ${detailedError}`);
      } finally {
        setLoading(false);
      }
    } else {
      // Demo fallback if Template ID / Public Key not pasted yet
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }, 600);
    }
  };

  return (
    <section id="contact" style={{ position: "relative", zIndex: 10 }}>
      <div className="contact-glow" />
      <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <p className="eyebrow">Contact</p>
          <StaggerText text="Let's Work Together" accentWord="Together" />
        </motion.div>

        {/* Side-by-Side Layout */}
        <div className="contact-grid">
          {/* Left Column: Direct Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="card contact-info-card"
          >
            <h3 className="contact-card-title">Get in Touch</h3>
            <p className="contact-card-sub">
              Have a project, job opportunity, or just want to connect? Feel free to reach out anytime!
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <a href={`mailto:${CONFIG.email}`} className="contact-info-value">
                    {CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="contact-info-label">Location</div>
                  <div className="contact-info-value">{CONFIG.location}</div>
                </div>
              </div>
            </div>

            <div className="contact-socials-wrap">
              <div className="contact-info-label" style={{ marginBottom: "0.6rem" }}>
                Connect Online
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <a
                  href={CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-sm"
                >
                  <GithubIcon size={14} /> GitHub
                </a>
                <a
                  href={CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-sm"
                >
                  <LinkedinIcon size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Send Me a Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="card contact-form-card"
          >
            <h3 className="contact-card-title">Send Me a Message</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="contact-success-box"
              >
                <CheckCircle2 size={36} color="var(--accent)" />
                <p style={{ fontWeight: 650, color: "var(--text-1)", marginTop: "0.75rem", fontSize: "1.05rem" }}>
                  Message Sent!
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-2)", marginTop: "0.3rem" }}>
                  Thank you for reaching out. I'll get back to you at <strong>{CONFIG.email}</strong>!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-ghost-sm"
                  style={{ marginTop: "1.2rem" }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {errorMsg && (
                  <div
                    style={{
                      padding: "0.6rem 0.9rem",
                      borderRadius: 6,
                      background: "rgba(225, 29, 72, 0.08)",
                      border: "1px solid rgba(225, 29, 72, 0.2)",
                      color: "#e11d48",
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <AlertCircle size={14} /> {errorMsg}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                >
                  {loading ? (
                    "Sending Email..."
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
