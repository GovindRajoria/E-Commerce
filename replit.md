# Boutique E-commerce Platform

## Overview

This is a modern e-commerce platform built for a boutique clothing store. The application features a full-stack TypeScript implementation with a React frontend and Express backend, designed to provide a seamless shopping experience for fashion retail.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the stack
- **API Pattern**: RESTful API with structured route handlers
- **Session Management**: Express sessions with PostgreSQL storage

### Database & ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with TypeScript-first schema definitions
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### Authentication System
- **Provider**: Replit Auth with OpenID Connect
- **Session Storage**: PostgreSQL-based session store using connect-pg-simple
- **Strategy**: Passport.js with OpenID Connect strategy
- **User Management**: Complete user profile management with automatic provisioning

### Product Management
- **Catalog**: Full product catalog with categories, images, and variants
- **Search**: Text-based product search functionality
- **Filtering**: Category-based filtering and special collections (new arrivals, sale items)
- **Variants**: Support for product sizes, colors, and stock management

### Shopping Features
- **Cart Management**: Persistent shopping cart with quantity management
- **Wishlist**: User wishlist functionality for saved items
- **Order Processing**: Basic order creation and management

### UI/UX Design
- **Design System**: shadcn/ui components with custom boutique theming
- **Responsive**: Mobile-first responsive design
- **Navigation**: Sticky header with search, cart, and profile access
- **Product Display**: Grid and list view options with image galleries

## Data Flow

### Client-Server Communication
1. **API Requests**: All client requests go through the `/api` route prefix
2. **Authentication**: Requests include credentials for session-based auth
3. **Query Management**: TanStack Query handles caching, refetching, and optimistic updates
4. **Error Handling**: Centralized error handling with user-friendly notifications

### Database Operations
1. **Schema Definition**: Shared TypeScript schemas ensure type safety across stack
2. **Connection**: Neon serverless PostgreSQL with WebSocket support
3. **Queries**: Drizzle ORM provides type-safe database operations
4. **Relationships**: Proper foreign key relationships between users, products, cart items, and orders

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- Express.js with TypeScript support
- Drizzle ORM and Drizzle Kit for database management

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible component foundations
- shadcn/ui for pre-built component implementations
- Lucide React for consistent iconography

### Database and Storage
- @neondatabase/serverless for PostgreSQL connection
- connect-pg-simple for session storage
- ws (WebSocket) for database connections

### Authentication and Security
- openid-client for OpenID Connect implementation
- passport for authentication strategy management
- express-session for session management

### Development Tools
- Vite for development server and build optimization
- TypeScript for type safety across the entire stack
- PostCSS and Autoprefixer for CSS processing

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds the React application to `dist/public`
2. **Backend Build**: esbuild bundles the Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema is up-to-date

### Environment Configuration
- **Development**: Local development with Vite dev server and tsx for TypeScript execution
- **Production**: Compiled JavaScript with optimized static assets
- **Database**: Environment-based connection string configuration

### Replit Integration
- **Cartographer**: Development-only plugin for Replit IDE integration
- **Runtime Error Overlay**: Enhanced debugging in development environment
- **Banner Integration**: Replit development environment detection and branding

The application follows a monorepo structure with clear separation between client, server, and shared code, making it maintainable and scalable for a boutique e-commerce operation.