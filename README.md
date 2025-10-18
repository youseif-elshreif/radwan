# أكاديمية الرضوان - Al-Radwan Academy

A modern, RTL-first Next.js application for Al-Radwan Academy featuring Arabic typography, responsive design, and a clean UI focused on educational content.

## 🌟 Features

- **RTL Arabic-First Design**: Built with Arabic language support as primary
- **Modern Tech Stack**: Next.js 15 + TypeScript + Tailwind CSS
- **Component-Based Architecture**: Reusable UI components and well-structured codebase
- **Mock API Integration**: JSON Server for frontend development and testing
- **Responsive Design**: Mobile-first approach with excellent desktop experience
- **Accessibility**: Keyboard navigation and semantic HTML
- **Clean Typography**: Cairo font for Arabic, Poppins for English/UI elements

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd radwan
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   This command will:

   - Start Next.js development server on `http://localhost:3000`
   - Start JSON Server mock API on `http://localhost:4000`
   - Enable hot reloading for both frontend and mock data

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

```bash
# Development (runs both Next.js and JSON Server)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run JSON Server only (mock API)
npm run json

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with RTL support
│   ├── page.tsx           # Home page composition
│   └── globals.css        # Global styles and Arabic fonts
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx     # Primary button component
│   │   ├── Card.tsx       # Card container component
│   │   ├── Input.tsx      # Form input with RTL support
│   │   └── Badge.tsx      # Tag/badge component
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx     # Main navigation with logo
│   │   └── Footer.tsx     # Site footer
│   └── home/              # Home page specific components
│       ├── Hero.tsx       # Hero section with CTA
│       ├── SearchFilters.tsx  # Course search and filters
│       ├── FeaturedCourses.tsx # Featured courses grid
│       ├── CourseCard.tsx     # Individual course card
│       ├── StatusCounters.tsx # Statistics display
│       └── Testimonials.tsx   # Customer testimonials
├── types/
│   └── index.d.ts         # TypeScript type definitions
├── utils/
│   ├── api.ts             # API service wrapper
│   └── authUtils.ts       # Authentication utilities
└── public/
    └── imgs/              # Static images and assets
        └── al-radwan-logo.png  # Academy logo

api/
├── db.json                # Mock database for JSON Server
└── README-db.md          # Database structure explanation
```

## 🎨 Design System

### Colors

- **Primary**: `#336154` (Academy green)
- **Primary Light**: `#4d7f6f`
- **Accent**: `#e47a2e` (Orange)
- **Accent Light**: `#f29b56`
- **Background**: `#f9f9f9`
- **Surface**: `#ffffff`
- **Text Primary**: `#1f1f1f`
- **Text Secondary**: `#6b6b6b`

### Typography

- **Arabic**: Cairo font family
- **UI/English**: Poppins font family

### Components

All components are built with:

- TypeScript for type safety
- Tailwind CSS for styling
- RTL support
- Accessibility features
- Responsive design

## 🔌 API Integration

The app uses a mock API powered by JSON Server during development:

- **Mock API**: `http://localhost:4000`
- **Frontend Proxy**: `/api/*` routes are proxied to the mock API
- **Easy Backend Swap**: Change `API_BASE_URL` in `utils/api.ts` when real backend is ready

### Available Endpoints

- `GET /api/courses` - All courses
- `GET /api/courses?featured=true` - Featured courses only
- `GET /api/testimonials` - Customer testimonials
- `GET /api/stats` - Academy statistics
- `GET /api/seasons` - Academic seasons
- `GET /api/tags` - Course categories/tags
- `GET /api/instructors` - Instructor information

## 🌐 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Create `.env.local` for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## 📱 Features Overview

### Home Page Sections

1. **Hero Section**

   - Academy introduction
   - Primary and secondary CTAs
   - Statistics preview

2. **Search & Filters**

   - Course search functionality
   - Season, category, age, and price filters
   - RTL form controls

3. **Featured Courses**

   - Grid layout of featured courses
   - Course cards with thumbnails, details, and enrollment buttons
   - Loading states and error handling

4. **Statistics Counters**

   - Students enrolled
   - Active courses
   - Seasons completed

5. **Testimonials**
   - Customer reviews carousel
   - Star ratings
   - Auto-scrolling with manual controls

### Component Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Loading States**: Skeleton loading for all dynamic content
- **Error Handling**: Graceful error states with retry options
- **Accessibility**: Keyboard navigation, ARIA labels, semantic HTML
- **RTL Support**: Proper Arabic text flow and layout

## 🔧 Development

### Adding New Components

1. Create component in appropriate directory (`components/ui/`, `components/layout/`, etc.)
2. Add TypeScript interface in `types/index.d.ts`
3. Import and use in pages or other components
4. Follow existing patterns for styling and accessibility

### Modifying API Data

Edit `api/db.json` to change mock data. JSON Server will automatically reload.

### Styling Guidelines

- Use Tailwind utility classes
- Follow RTL-first approach
- Use design system colors and typography
- Ensure mobile-first responsive design
- Add proper focus states for accessibility

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Add TypeScript types for new data structures
3. Test components with mock API data
4. Ensure RTL compatibility
5. Add appropriate error handling and loading states

## 📄 License

This project is private and confidential to Al-Radwan Academy.

---

**Built with ❤️ for Al-Radwan Academy**
