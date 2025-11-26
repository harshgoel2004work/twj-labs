import LegalLayout from "@/components/legal-layout";
import { Metadata } from "next";
import React from "react";

export const metadata:Metadata = {
  title: "Privacy Policy",
}

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="November 24, 2024">
      <p>
        At TWJ Labs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.
      </p>

      <h3>1. Information We Collect</h3>
      <p>
        We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
      </p>
      <ul>
        <li><strong>Personal Data:</strong> Name, email address, phone number, and company name.</li>
        <li><strong>Usage Data:</strong> IP address, browser type, operating system, and pages visited.</li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <p>
        We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests.
      </p>
      <ul>
        <li>To facilitate account creation and logon process.</li>
        <li>To send administrative information to you.</li>
        <li>To fulfill and manage your orders.</li>
        <li>To post testimonials (with your consent).</li>
      </ul>

      <h3>3. Sharing Your Information</h3>
      <p>
        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
      </p>

      <h3>4. Security of Your Information</h3>
      <p>
        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;