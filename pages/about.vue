<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container-max py-16 px-4">
      <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">About I-90 Eats</h1>
      
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
        <p class="text-xl text-gray-700 mb-6">
          I-90 Eats is your ultimate guide to discovering exclusive restaurant deals along Interstate 90, 
          stretching from Seattle to Boston. Whether you're a road tripper, commuter, or local foodie, 
          we help you save money while enjoying great meals.
        </p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p class="text-gray-700 mb-6">
          To connect travelers and locals with the best dining experiences along America's longest interstate highway, 
          while supporting local businesses and making great food accessible to everyone.
        </p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Weekly newsletter with exclusive restaurant deals</li>
          <li>Comprehensive directory of restaurants along I-90</li>
          <li>Special discounts and promotions</li>
          <li>Food tips and travel guides</li>
          <li>Local hidden gems and popular favorites</li>
        </ul>
      </div>

      <!-- FAQ Section with Schema -->
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div class="space-y-6">
          <div v-for="faq in faqs" :key="faq.question" class="border-b border-gray-200 pb-6 last:border-0">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ faq.question }}</h3>
            <p class="text-gray-700">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Schema for SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is I-90 Eats?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I-90 Eats is a platform that curates exclusive restaurant deals along Interstate 90 from Seattle to Boston. We send weekly newsletters with local dining specials and help travelers and locals save money on great food."
          }
        },
        {
          "@type": "Question",
          "name": "Is the newsletter free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our newsletter subscription is completely free. You'll receive weekly updates with restaurant deals, food tips, and special promotions along the I-90 corridor."
          }
        },
        {
          "@type": "Question",
          "name": "How do I use the deals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply browse our directory or check your weekly newsletter for deals. Each deal includes specific instructions on how to redeem it at the restaurant. Some may require showing your email, others have specific codes or promotional periods."
          }
        },
        {
          "@type": "Question",
          "name": "Can my restaurant join I-90 Eats?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! We offer two business subscription tiers (Basic and Premium) for restaurants along Interstate 90. Visit our business signup page to get started and reach thousands of potential customers."
          }
        },
        {
          "@type": "Question",
          "name": "Which cities are covered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We cover the entire I-90 corridor from Seattle, WA to Boston, MA, including major cities like Spokane, Missoula, Bozeman, Billings, Rapid City, Sioux Falls, Madison, Chicago, Cleveland, Buffalo, Syracuse, Albany, and more."
          }
        },
        {
          "@type": "Question",
          "name": "How often are deals updated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "New deals are added regularly as restaurants join our platform. Our newsletter goes out every Friday with the latest deals and promotions. Subscribers get first access to new deals and special offers."
          }
        }
      ]
    }
    </script>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: "What is I-90 Eats?",
    answer: "I-90 Eats is a platform that curates exclusive restaurant deals along Interstate 90 from Seattle to Boston. We send weekly newsletters with local dining specials and help travelers and locals save money on great food."
  },
  {
    question: "Is the newsletter free?",
    answer: "Yes! Our newsletter subscription is completely free. You'll receive weekly updates with restaurant deals, food tips, and special promotions along the I-90 corridor."
  },
  {
    question: "How do I use the deals?",
    answer: "Simply browse our directory or check your weekly newsletter for deals. Each deal includes specific instructions on how to redeem it at the restaurant. Some may require showing your email, others have specific codes or promotional periods."
  },
  {
    question: "Can my restaurant join I-90 Eats?",
    answer: "Absolutely! We offer two business subscription tiers (Basic and Premium) for restaurants along Interstate 90. Visit our business signup page to get started and reach thousands of potential customers."
  },
  {
    question: "Which cities are covered?",
    answer: "We cover the entire I-90 corridor from Seattle, WA to Boston, MA, including major cities like Spokane, Missoula, Bozeman, Billings, Rapid City, Sioux Falls, Madison, Chicago, Cleveland, Buffalo, Syracuse, Albany, and more."
  },
  {
    question: "How often are deals updated?",
    answer: "New deals are added regularly as restaurants join our platform. Our newsletter goes out every Friday with the latest deals and promotions. Subscribers get first access to new deals and special offers."
  }
]

useSeoMeta({
  title: 'About I-90 Eats - Restaurant Deals Along Interstate 90',
  description: 'Learn about I-90 Eats, your guide to discovering exclusive restaurant deals from Seattle to Boston. Find out how we help travelers save money on great food.',
  ogTitle: 'About I-90 Eats',
  ogDescription: 'Discover exclusive restaurant deals along Interstate 90 from Seattle to Boston',
  ogImage: 'https://i90eats.com/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>
