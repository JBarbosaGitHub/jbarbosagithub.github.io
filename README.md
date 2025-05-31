# Training Courses Platform

A web application for managing and selling training courses, built with React.js and integrated with Stripe for payments.

## Features

- User authentication with Firebase
- Course catalog with detailed information
- Secure payment processing with Stripe
- Multiple payment methods (Credit Card, PayPal)
- Course access management
- Responsive design

## Prerequisites

Before you begin, ensure you have the following:
- Node.js (v14 or higher)
- npm or yarn
- A Stripe account
- A Firebase account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Stripe
STRIPE_PUBLIC_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Download your service account key and save it as `serviceAccountKey.json` in the server directory
5. Add the Firebase configuration to your `.env` file

## Stripe Setup

1. Create a Stripe account
2. Get your API keys from the Stripe Dashboard
3. Set up webhook endpoints
4. Add the Stripe configuration to your `.env` file

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Fill in your environment variables

4. Start the development servers:
```bash
# Start frontend (from root directory)
npm run dev

# Start backend (from server directory)
node server.js
```

## Project Structure

```
├── src/                    # Frontend source code
│   ├── Components/        # React components
│   ├── Pages/            # Page components
│   ├── styles/           # CSS files
│   └── assets/           # Static assets
├── server/               # Backend server code
│   └── server.js        # Express server
├── public/              # Public assets
└── package.json         # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security

- Never commit sensitive information to Git
- Keep your `.env` file and `serviceAccountKey.json` secure
- Use environment variables for all sensitive data
- Regularly update dependencies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or open an issue in the repository.
