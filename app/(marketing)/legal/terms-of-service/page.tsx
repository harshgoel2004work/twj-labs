import LegalLayout from "@/components/legal-layout";
import { Metadata } from "next";
import React from "react";

export const metadata:Metadata = {
  title: "Terms of Service",
}
const TermsOfService = () => {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="November 24, 2024">
      <p>
        Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the TWJ Labs website operated by The Walking Jumbo (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
      </p>

      <h3>1. Agreement to Terms</h3>
      <p>
        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
      </p>

      <h3>2. Intellectual Property</h3>
      <p>
        The Service and its original content, features, and functionality are and will remain the exclusive property of TWJ Labs and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
      </p>

      <h3>3. Client Responsibilities</h3>
      <p>
        When working with us on a project, you agree to provide all necessary assets, feedback, and approvals in a timely manner. Delays in providing these materials may result in a delay in the project delivery timeline.
      </p>

      <h3>4. Payments and Refunds</h3>
      <p>
        All payments are due upon receipt of the invoice. We do not offer refunds for services already rendered. Deposits made for project commencements are non-refundable after the project kickoff has been initiated.
      </p>

      <h3>5. Limitation of Liability</h3>
      <p>
        In no event shall TWJ Labs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
      </p>
      
      <h3>6. Governing Law</h3>
      <p>
        These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
      </p>
    </LegalLayout>
  );
};

export default TermsOfService;