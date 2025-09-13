import React, { useState } from "react";

const faqs = [
  {
    question: "What is FundFlow?",
    answer:
      "FundFlow is a crowdfunding platform that helps individuals and organizations raise funds for their projects, ideas, or causes by connecting them with supporters.",
  },
  {
    question: "How do I start a campaign?",
    answer:
      "To start a campaign, sign up or log in to your account, then click on 'Start Campaign' in the navigation bar and fill out the required details.",
  },
  {
    question: "How can I support a campaign?",
    answer:
      "You can support a campaign by visiting its detail page and clicking the 'Donate' button. You can contribute any amount you wish.",
  },
  {
    question: "Is there a fee for using FundFlow?",
    answer:
      "FundFlow charges a small platform fee on successful campaigns to cover operational costs. Details are available in our Terms of Service.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team by visiting the Contact Support page and submitting your query. We aim to respond within 24 hours.",
  },
];

const ContactSupport = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // FAQ state and toggle logic
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could send the form data to your backend or an email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-16 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700">Contact Support</h1>
        {submitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-xl shadow text-center font-medium">
            Thank you for contacting us! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 p-8">
            <div>
              <label className="block mb-1 font-medium text-emerald-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-emerald-100 px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-emerald-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-emerald-100 px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-emerald-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-emerald-100 px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </form>
        )}

        {/* FAQ Section */}
        <section id="faq" className="max-w-2xl mx-auto py-12 px-2">
          <h2 className="text-2xl font-bold mb-8 text-center text-emerald-700">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur border border-emerald-100 rounded-xl shadow group transition-all"
              >
                <button
                  className="w-full text-left px-4 py-4 font-medium flex justify-between items-center focus:outline-none text-emerald-700"
                  onClick={() => toggle(idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{faq.question}</span>
                  <span className="text-xl font-bold">{openIndex === idx ? "-" : "+"}</span>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  className={`px-4 pb-4 text-gray-700 transition-all duration-300 ${
                    openIndex === idx ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactSupport;