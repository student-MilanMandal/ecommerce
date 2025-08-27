# 🛒 EcoShop - Modern Ecommerce Store

A modern, responsive ecommerce web application built with React, TypeScript, and Tailwind CSS. Features a clean design, shopping cart functionality, and mobile-first responsive layout.

## ✨ Features

### 🛍️ Core Features

- **Product Catalog** - Browse through a variety of products with detailed information
- **Search & Filter** - Find products by name, category, and price range
- **Shopping Cart** - Add, remove, and manage items with persistent cart state
- **Product Details** - Detailed product pages with image galleries
- **Responsive Design** - Mobile-first design that works on all devices
- **Dark Mode** - Toggle between light and dark themes

### 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface with smooth animations
- **Image Loading** - Lazy loading images for better performance
- **Loading States** - Smooth loading indicators and skeleton screens
- **Error Handling** - Graceful error handling with user-friendly messages
- **Progressive Enhancement** - Works even with JavaScript disabled

### 🔧 Technical Features

- **TypeScript** - Full type safety and better developer experience
- **Redux Toolkit** - Efficient state management for cart and app state
- **React Router** - Client-side routing with dynamic pages
- **Tailwind CSS** - Utility-first styling with custom design system
- **Vite** - Fast development server and optimized builds
- **ESLint** - Code quality and consistency enforcement

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 20.11.1 or higher)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/student-MilanMandal/ecommerce.git
   cd ecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
ecommerce/
├── public/
│   ├── vite.svg                 # Vite logo
│   └── sw.js                    # Service worker
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── LoadingSpinner.tsx
│   ├── pages/                   # Application pages
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   └── CheckoutPage.tsx
│   ├── store/                   # Redux store and slices
│   │   ├── store.ts
│   │   ├── cartSlice.ts
│   │   └── themeSlice.ts
│   ├── services/                # API services
│   │   └── productService.ts
│   ├── data/                    # Static data and types
│   │   └── products.ts
│   ├── hooks/                   # Custom React hooks
│   │   └── useImagePreload.ts
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Application entry point
│   └── index.css               # Global styles
├── package.json                 # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## 🛠️ Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build production-ready application       |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |

## 🧪 Development

### Technology Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.16
- **State Management**: Redux Toolkit 2.8.2
- **Routing**: React Router Dom 7.8.2
- **Icons**: React Icons 5.5.0

### Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.8.2",
  "@reduxjs/toolkit": "^2.8.2",
  "react-redux": "^9.2.0",
  "tailwindcss": "^3.4.16",
  "typescript": "~5.8.3",
  "vite": "^5.4.19"
}
```

### Adding New Features

1. **Components**: Add new React components in `src/components/`
2. **Pages**: Create new pages in `src/pages/`
3. **Store**: Add Redux slices in `src/store/`
4. **Services**: Add API services in `src/services/`
5. **Styles**: Use Tailwind classes or add custom CSS in `src/index.css`

## 🎨 Customization

### Colors & Themes

The project uses a custom color palette defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... full color scale
    900: '#1e3a8a',
  },
}
```

### Dark Mode

Toggle dark mode using the theme switcher in the navigation bar. The theme preference is saved to localStorage.

### Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: sm: (640px+)
- **Desktop**: md: (768px+)
- **Large**: lg: (1024px+)
- **XL**: xl: (1280px+)

## 🌐 API Integration

The application uses the [Fake Store API](https://fakestoreapi.com/) for product data:

- **Products**: `GET https://fakestoreapi.com/products`
- **Categories**: `GET https://fakestoreapi.com/products/categories`
- **Single Product**: `GET https://fakestoreapi.com/products/{id}`

### Custom API

To integrate with your own API, modify the service functions in `src/services/productService.ts`:

```typescript
const BASE_URL = 'https://your-api.com';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
}
```

## 📱 Mobile Experience

- **Touch-friendly**: Large tap targets and smooth interactions
- **Responsive Images**: Optimized for different screen sizes
- **Fast Loading**: Lazy loading and performance optimizations
- **Progressive Web App**: Service worker for offline functionality

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm run build
# Configure GitHub Pages to serve from dist/ folder
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add proper TypeScript types
- Test on multiple screen sizes

---

**Made with ❤️ by Milan Mandal**

🌟 **Star this repo if you found it helpful!**
