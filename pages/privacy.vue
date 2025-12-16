<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container-max py-16 px-4">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p class="text-gray-600 mb-8">Last updated: December 15, 2025</p>
        
        <div class="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            I-90 Eats ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Subscribe to our newsletter</li>
            <li>Create a business account</li>
            <li>Contact us</li>
            <li>Make a payment</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Business information (for restaurant partners)</li>
            <li>Payment information (processed securely through Stripe)</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we automatically collect certain information, including:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>Device information</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Send you our weekly newsletter with restaurant deals</li>
            <li>Manage restaurant partner accounts</li>
            <li>Process payments</li>
            <li>Improve our website and services</li>
            <li>Respond to your inquiries</li>
            <li>Send administrative information</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Stripe (payment processing), Beehiiv (newsletter service), Supabase (database hosting)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
          </ul>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings. We use Google Analytics to understand how visitors use our site.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Unsubscribe from our newsletter at any time</li>
            <li>Opt-out of certain data collection</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> privacy@i90eats.com<br>
            <strong>Address:</strong> I-90 Eats, USA
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Privacy Policy - I-90 Eats',
  description: 'Read our privacy policy to understand how I-90 Eats collects, uses, and protects your personal information.',
  robots: 'index, follow'
})
</script>

<style scoped>
.prose h2 {
  @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
}

.prose p {
  @apply text-gray-700 mb-4;
}

.prose ul {
  @apply list-disc list-inside text-gray-700 mb-4 space-y-2;
}

.prose li {
  @apply ml-4;
}
</style>
