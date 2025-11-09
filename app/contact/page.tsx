// components/ContactUs.tsx
import React from "react";

const ContactUs: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-primary-green text-4xl md:text-5xl font-bold mb-4">
          Get in Touch
        </h1>
        <p className="text-primary-green text-lg md:text-xl mb-8">
          Have questions, suggestions, or want to collaborate? Send us a message
          and we'll get back to you shortly.
        </p>

        {/* Contact Form */}
        <form className="bg-white p-8 rounded-lg shadow-md text-left grid gap-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-primary-green font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-primary-green font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-primary-green font-semibold mb-2"
            >
              Phone (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(123) 456-7890"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-primary-green font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary-green hover:bg-primary-red text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
