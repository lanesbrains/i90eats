# I-90 Restaurant Deals Platform

A location-based restaurant deals newsletter service that connects travelers and locals with exclusive restaurant offers along Interstate 90, spanning from Seattle, WA to Boston, MA.

## 🚀 Features

- **Location-based Restaurant Directory**: Browse restaurants by I-90 cities and cuisine types
- **Weekly Newsletter**: Get exclusive deals delivered to your inbox based on your location preferences
- **Premium Listings**: Restaurants can upgrade to premium for better visibility
- **Content Management**: Easy-to-use CMS for managing restaurant data and deals
- **Mobile Optimized**: Responsive design that works perfectly on all devices
- **Stripe Integration**: Secure payment processing for newsletter subscriptions

## 🛠️ Tech Stack

- **Frontend**: Nuxt.js 3, Vue 3, Tailwind CSS
- **Content Management**: Decap CMS (Git-based)
- **Payments**: Stripe
- **Email**: Resend
- **Deployment**: Netlify
- **Styling**: Tailwind CSS with custom design system

## 📋 Requirements

- Node.js 20.19.0 or higher
- npm or yarn package manager
- Git for version control

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd i90eats
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your API keys:

```bash
cp env.example .env
```

Edit `.env` with your actual API keys:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key

# Resend Email Configuration
RESEND_API_KEY=your_actual_resend_api_key

# Netlify Configuration
NETLIFY_SITE_ID=your_netlify_site_id
NETLIFY_ACCESS_TOKEN=your_netlify_access_token

# App Configuration
NODE_ENV=development
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Start development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
i90eats/
├── app/                    # Main app files
├── assets/                 # Static assets (CSS, images)
├── components/             # Vue components
├── composables/            # Vue composables
├── layouts/                # Page layouts
├── pages/                  # Application pages
├── types/                  # TypeScript type definitions
├── admin/                  # Decap CMS configuration
├── content/                # CMS content (restaurants, newsletters)
├── public/                 # Public static files
└── project_specs/          # Project documentation
```

## 📱 Pages

- **Homepage** (`/`): Hero section, newsletter signup, featured deals
- **Restaurant Directory** (`/directory`): Browse and filter restaurants
- **Restaurant Details** (`/restaurant/[slug]`): Individual restaurant pages
- **Newsletter Signup** (`/subscribe`): Subscription form with location selection
- **Admin Dashboard** (`/admin`): Content management interface

## 🎨 Design System

The platform uses a custom Tailwind CSS design system with:

- **Primary Colors**: Red tones for main actions and branding
- **Accent Colors**: Orange/yellow tones for highlights and CTAs
- **Secondary Colors**: Gray tones for text and backgrounds
- **Typography**: Inter for body text, Poppins for headings
- **Components**: Pre-built button, card, and form components

## 🔧 Configuration

### Tailwind CSS

Custom Tailwind configuration with extended colors, fonts, and animations.

### Decap CMS

Git-based content management system configured for:

- Restaurant management
- Newsletter creation
- Subscriber data
- Restaurant subscriptions

### Stripe Integration

Configured for:

- Newsletter subscriptions ($2.99/month)
- Restaurant listing subscriptions (Basic: $9.99/month, Premium: $19.99/month)

## 📧 Newsletter System

The platform automatically:

- Compiles weekly newsletters based on subscriber locations
- Prioritizes premium restaurant deals
- Sends personalized content via Resend
- Tracks engagement metrics

## 🚀 Deployment

### Netlify Deployment

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.output/public`
4. Configure environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production

Ensure these are set in your Netlify dashboard:

- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `RESEND_API_KEY`
- `NODE_ENV=production`

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 API Endpoints

The platform includes several API endpoints (implemented as Netlify Functions):

- `/api/subscribe` - Newsletter subscription handling
- `/api/restaurant-subscribe` - Restaurant listing subscriptions
- `/api/send-newsletter` - Weekly newsletter compilation and sending
- `/api/stripe-webhook` - Stripe webhook processing
- `/api/manage-subscription` - Subscription management

## 🔒 Security

- Stripe handles all payment processing (PCI compliant)
- Environment variables for sensitive data
- Input validation and sanitization
- Rate limiting on API endpoints

## 📈 Performance

- Static site generation for optimal performance
- Image optimization with Nuxt Image
- Lazy loading and code splitting
- CDN distribution via Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Email: info@i90eats.com
- Documentation: Check the `project_specs/` folder
- Issues: Use the GitHub issues page

## 🗺️ I-90 Locations

The platform covers these cities along Interstate 90:

1. Seattle, WA
2. Spokane, WA
3. Missoula, MT
4. Billings, MT
5. Rapid City, SD
6. Sioux Falls, SD
7. Des Moines, IA
8. Chicago, IL
9. Toledo, OH
10. Cleveland, OH
11. Buffalo, NY
12. Albany, NY
13. Boston, MA

---

Built with ❤️ for food lovers along I-90
