# Job Application Tracker

A modern web application built with React, TypeScript, and Vite, featuring a comprehensive UI component library and robust development tools.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or Bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RaviKiran752/job-application-tracker.git
cd job-application-tracker
```

2. Install dependencies:
```bash
# Using npm
npm install

# Or using Bun
bun install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [React Query](https://tanstack.com/query/latest) - Data fetching and state management
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## Project Structure

```
job-application-tracker/
├── src/              # Source files
├── public/           # Static assets
├── components.json   # shadcn/ui configuration
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication

This project uses Clerk for authentication. Make sure to set up your Clerk environment variables in a `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.