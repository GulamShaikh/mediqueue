# MediQueue - Smart Hospital Queue Management

A modern, mobile-responsive web application for efficient hospital queue management in Mumbai. Patients can search nearby hospitals/clinics, check real-time availability, book appointment slots, and access ambulance services.

## 🚀 Live Demo

**Deployed URL**: https://mediqueues.vercel.app

**Demo Credentials**:
- Email: `demo@mediqueue.com`
- Password: `demo123`

## ✨ Features

- 🏥 **Hospital Search**: Find 12+ verified hospitals in Mumbai with real photos
- 🔍 **Smart Filters**: Search by name, location, or specialty
- 📅 **Easy Booking**: Visual time slot selection (9 AM - 8 PM)
- 📱 **Mobile Responsive**: Perfect on phones, tablets, and desktop
- 🚑 **Emergency Services**: Quick access to ambulance contacts
- 🌙 **Dark Mode**: Eye-friendly theme toggle
- 🎨 **Professional Design**: Premium UI with hospital images and icons
- 📍 **Footer Navigation**: Quick links and emergency contacts
- ⚡ **Fast & Lightweight**: No backend needed, runs on localStorage

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: Custom CSS with design system
- **Storage**: localStorage (no backend required)
- **Fonts**: Google Fonts (Inter, Outfit)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/GulamShaikh/mediqueue.git
cd mediqueue

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Via GitHub** (Auto-deploy on push):
   ```bash
   # Push to GitHub
   git push origin main
   
   # Go to vercel.com
   # Import your GitHub repository
   # Vercel auto-detects Vite and deploys!
   ```

2. **Via Vercel CLI**:
   ```bash
   npm install -g vercel
   npm run build
   vercel --prod
   ```

### Deploy to Netlify

```bash
npm run build
# Drag the 'dist' folder to netlify.com/drop
```

## 📱 Mobile Access

To test on your phone during development:

1. Start server with network access:
   ```bash
   npm run dev -- --host
   ```

2. Find your IP address:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

3. On your phone, visit: `http://YOUR_IP:5173`

## 🎯 Project Structure

```
mediqueue/
├── public/              # Static assets
│   ├── logo.png
│   ├── hero.png
│   └── ambulance.png
├── src/
│   ├── main.js         # Application logic & routing
│   ├── data.js         # Mock hospital data
│   ├── auth.js         # Authentication module
│   └── styles.css      # Complete design system
├── index.html          # Entry point
└── package.json
```

## 🏥 Features in Detail

### Hospital Management
- 12 verified hospitals in Mumbai
- 5 specialties: General, Dental, Cardiology, Orthopedic, Pediatric
- Real-time availability indicators
- Distance and ratings display

### Booking System
- Date picker (up to 30 days advance)
- Time slots in 30-minute intervals
- Visual availability (green/yellow/red)
- Booking confirmation modals
- Appointment management

### Ambulance Services
- National emergency numbers (102/108)
- 5 ambulance service providers
- Government, Private, and NGO options
- One-tap calling on mobile

## 🎨 Design Highlights

- **Modern UI**: Glassmorphism, gradients, smooth animations
- **Color Scheme**: Medical blues/teals with coral accents
- **Typography**: Professional font pairing (Inter + Outfit)
- **Responsive**: Mobile-first design with touch-friendly targets
- **Accessible**: ARIA labels, keyboard navigation

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

## 📄 License

MIT License - feel free to use for your projects!

## 👨‍💻 Author

Built for a healthcare innovation competition

## 🙏 Acknowledgments

- Hospital data is mock data for demonstration
- Icons and images generated for the project
- Designed for Mumbai healthcare ecosystem

---

**Made with ❤️ using Vite + Vanilla JavaScript**
