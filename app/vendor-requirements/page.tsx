"use client";

import Link from "next/link";

export default function VendorRequirements() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary-green">
        Thinking of Selling Your Produce with Us?
      </h1>

      <section className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p className="text-gray-700">
          <strong>Who can sell here?</strong>
          <br />
          Only local farms and producers that grow or produce food within a{" "}
          <strong>50 km radius of Toronto</strong>. This ensures freshness and a
          real connection with the community.
        </p>

        <p className="text-gray-700">
          <strong>What products can I sell?</strong>
          <br />
          We accept fresh fruits, vegetables, honey, eggs, and other
          locally-produced food items. Processed or imported products are
          outside our focus for this platform.
        </p>

        <p className="text-gray-700">
          <strong>Do I need any certification?</strong>
          <br />
          Yes! Upload a valid agricultural or food safety certificate to verify
          your farm. This builds customer trust and meets platform standards.
        </p>

        <p className="text-gray-700">
          <strong>How much does it cost to sell on the platform?</strong>
          <br />
          You set your own prices. We take a small{" "}
          <strong>10% commission</strong> on each sale, automatically calculated
          for you.
        </p>

        <p className="text-gray-700">
          <strong>What are the quality expectations?</strong>
          <br />
          Your produce should be fresh, properly labeled, and meet local food
          regulations. Consistency and transparency are key.
        </p>

        <p className="text-gray-700">
          <strong>How do I get started?</strong>
          <br />
          Proceed to the registration page, fill in your farm info, and upload
          your certificate. Once approved, you can start selling immediately!
        </p>
      </section>

      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <Link
          href="/terms-and-services"
          className="underline hover:text-primary-green"
        >
          Terms & Services
        </Link>
        <Link href="/register" className="underline hover:text-primary-green">
          Back to Registration
        </Link>
      </div>
    </main>
  );
}
