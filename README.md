# i18n-AI - Local AI-Powered Translation Tool

A web application that provides local, effortless internationalization (i18n) translations for developers. Translate your application's content into multiple languages using AI models that run directly in your browser, ensuring privacy and speed.

## Features

- **Local Translation**: All translations run locally in your browser using HuggingFace models - no data sent to external servers
- **Multiple Languages**: Support for 200+ languages including English, French, Spanish, German, Chinese, Japanese, Hindi, and more
- **File Format Support**: Works with .json, .yaml, .yml, .js, and .ts files
- **Free Tier**: Translate up to 2 languages at a time for free
- **Pro Version**: One-time purchase of $20 for unlimited language translations
- **Privacy-First**: Your translation data never leaves your browser

## Technology Stack

- **Frontend Framework**: [Nuxt 3](https://nuxt.com/) - Vue.js meta-framework
- **UI Components**: [shadcn-vue](https://www.shadcn-vue.com/) - Radix Vue components with Tailwind CSS
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Sidebase adapter
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Payment Processing**: [Stripe](https://stripe.com/)
- **AI Models**: [HuggingFace Transformers](https://huggingface.co/docs/transformers.js) (Xenova)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Code Editor**: [CodeMirror](https://codemirror.net/)
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)

## Prerequisites

- Node.js 18+ and npm/pnpm/yarn/bun
- PostgreSQL database
- Stripe account (for payment processing)
- Email service configuration (for authentication)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/i18n-ai.git
cd i18n-ai
```

### 2. Install dependencies

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/i18n_ai"
POSTGRES_URL_NON_POOLING="postgresql://username:password@localhost:5432/i18n_ai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email Provider (for authentication)
EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
EMAIL_FROM="noreply@example.com"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Google Analytics (optional)
NUXT_PUBLIC_GTAG_ID="G-XXXXXXXXXX"
```

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

### 5. Run the development server

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

The application will be available at `http://localhost:3000`

## Production Deployment

### Build for production

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

### Vercel Deployment

This project includes a special build command for Vercel:

```bash
npm run vercel-build
```

This command handles Prisma generation, database migrations, and the Nuxt build process.

### Preview production build locally

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Project Structure

```
i18n-ai/
├── components/          # Vue components
│   └── ui/             # UI components (shadcn-vue)
├── i18n/               # Translation files
├── lib/                # Utility functions and constants
├── pages/              # Nuxt pages
├── prisma/             # Database schema and migrations
├── server/             # Server-side code
│   ├── api/           # API routes
│   └── utils/         # Server utilities
├── store/              # Pinia stores
├── content/            # Markdown content for blog
└── public/             # Static assets
```

## Key Features Implementation

- **Local AI Translation**: Uses Web Workers to run HuggingFace models in the browser
- **Multi-format Support**: Parses and generates various file formats (JSON, YAML, JS/TS)
- **Authentication**: Magic link email authentication via NextAuth
- **Payment Integration**: Stripe Checkout for one-time purchases
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license information here]

## Support

For support, email [your-email@example.com] or open an issue in the GitHub repository.
