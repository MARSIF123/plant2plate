"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary-green">
        Terms & Services
      </h1>

      <section className="bg-white shadow-md rounded-lg p-6 space-y-4 text-gray-700">
        <p>
          By registering as a vendor on our platform, you agree to operate
          within the guidelines outlined below. These terms ensure a safe, fair,
          and high-quality marketplace for both vendors and customers.
        </p>

        <p>
          <strong>1. Eligibility:</strong>
          <br />
          Only local farms or producers within a 50 km radius of Toronto may
          register. You must have valid certification for agricultural or food
          safety practices.
        </p>

        <p>
          <strong>2. Product Standards:</strong>
          <br />
          All products must be fresh, clearly labeled, and comply with local
          food regulations. Processed or imported goods are not allowed.
        </p>

        <p>
          <strong>3. Pricing & Commission:</strong>
          <br />
          Vendors set their own prices. The platform collects a 10% commission
          on each sale. Prices displayed to customers should be accurate and
          inclusive of any taxes if applicable.
        </p>

        <p>
          <strong>4. Vendor Responsibility:</strong>
          <br />
          Vendors are responsible for timely delivery or pickup of products,
          maintaining quality standards, and responding to customer inquiries.
        </p>

        <p>
          <strong>5. Account Termination:</strong>
          <br />
          Violation of these terms, repeated complaints, or fraudulent behavior
          may result in suspension or permanent termination of your vendor
          account.
        </p>

        <p>
          <strong>6. Privacy & Data:</strong>
          <br />
          Vendors consent to the use of their contact and product information
          for platform operations, customer communication, and analytics.
        </p>

        <p>
          <strong>7. Limitation of Liability:</strong>
          <br />
          The platform is not responsible for product quality, delivery issues,
          or disputes between vendors and customers. Vendors operate
          independently.
        </p>
      </section>
    </main>
  );
}
