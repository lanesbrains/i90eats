<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container-max py-16 px-4">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p class="text-gray-600 mb-8">Last updated: December 15, 2025</p>
        
        <div class="prose prose-lg max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using I-90 Eats ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
          </p>

          <h2>Description of Service</h2>
          <p>
            I-90 Eats provides a platform for discovering restaurant deals along Interstate 90. We offer:
          </p>
          <ul>
            <li>Free newsletter subscription with restaurant deals</li>
            <li>Restaurant directory and search functionality</li>
            <li>Business subscription services for restaurant partners</li>
          </ul>

          <h2>User Accounts</h2>
          <h3>Newsletter Subscribers</h3>
          <p>
            By subscribing to our newsletter, you agree to receive periodic emails with restaurant deals and related content. You may unsubscribe at any time using the link in our emails.
          </p>

          <h3>Business Accounts</h3>
          <p>
            Restaurant partners who create business accounts agree to:
          </p>
          <ul>
            <li>Provide accurate business information</li>
            <li>Honor the deals and promotions they post</li>
            <li>Pay subscription fees as agreed</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <h2>Payments and Subscriptions</h2>
          <h3>Business Subscriptions</h3>
          <p>
            Business subscription fees are processed through Stripe. By subscribing, you agree to:
          </p>
          <ul>
            <li>Recurring monthly or annual billing</li>
            <li>Automatic renewal unless cancelled</li>
            <li>No refunds for partial months</li>
          </ul>

          <h3>Cancellation</h3>
          <p>
            Business partners may cancel their subscription at any time through their dashboard. Cancellations take effect at the end of the current billing period.
          </p>

          <h2>Content and Conduct</h2>
          <h3>User-Generated Content</h3>
          <p>
            Restaurant partners may post deals, descriptions, and images. You represent that you own or have rights to any content you submit and that it does not violate any laws or third-party rights.
          </p>

          <h3>Prohibited Activities</h3>
          <p>You agree not to:</p>
          <ul>
            <li>Post false, misleading, or deceptive information</li>
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Distribute spam or unsolicited communications</li>
            <li>Attempt to gain unauthorized access to the Service</li>
            <li>Interfere with the proper functioning of the Service</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by I-90 Eats and are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. We do not guarantee:
          </p>
          <ul>
            <li>Accuracy of restaurant information or deals</li>
            <li>Uninterrupted or error-free service</li>
            <li>That restaurants will honor posted deals</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            I-90 Eats shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless I-90 Eats from any claims, damages, losses, liabilities, and expenses arising from your use of the Service or violation of these Terms.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes. Your continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>

          <h2>Termination</h2>
          <p>
            We may terminate or suspend access to the Service immediately, without prior notice, for any breach of these Terms or for any other reason.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law provisions.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> legal@i90eats.com<br>
            <strong>Address:</strong> I-90 Eats, USA
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Terms of Service - I-90 Eats',
  description: 'Read the Terms of Service for I-90 Eats. Learn about your rights and responsibilities when using our restaurant deals platform.',
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
