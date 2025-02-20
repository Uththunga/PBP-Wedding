# Wedding Photography Portfolio Website

A modern, responsive wedding photography portfolio website built with React, TypeScript, and Vite. View the live site at [https://uththunga.github.io/PBP-Wedding/](https://uththunga.github.io/PBP-Wedding/)

## Features

- 📸 Dynamic photo gallery with filtering capabilities
- 🎨 Responsive design that works on all devices
- 👥 Client portal for viewing private galleries
- 📅 Online booking system
- 📱 Mobile-friendly navigation
- 🔐 Authentication system for client access
- 💼 Package showcase and details
- 📞 Contact form integration

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion for animations
- React Router DOM for routing
- Zustand for state management
- EmailJS for contact form
- React Testing Library & Vitest for testing

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Uththunga/PBP-Wedding.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

- `/src` - Source code
  - `/assets` - Images and static assets
  - `/components` - Reusable React components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/store` - Zustand store configurations
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions

## Testing

Run tests with:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/Uththunga/PBP-Wedding](https://github.com/Uththunga/PBP-Wedding)