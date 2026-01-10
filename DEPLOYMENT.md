# MediQueue - Quick Deployment Guide

## 🚀 Deploy to Phone for Competition (3 Options)

### Option 1: Vercel (Recommended - 2 minutes)

**Fastest way to get a public URL for your phone!**

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Build the project
npm run build

# Deploy (follow prompts, just press Enter for defaults)
vercel --prod
```

You'll get a URL like: `https://mediqueue-xyz.vercel.app`

**Access on phone:** Just open that URL in any browser!

---

### Option 2: Network Access (Same WiFi)

**If you and judges are on the same WiFi:**

1. Find your computer's IP address:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" under your WiFi adapter (e.g., `192.168.1.100`)

2. Start server with network access:
   ```bash
   npm run dev -- --host
   ```

3. On your phone, visit:
   ```
   http://YOUR_IP:5173
   ```
   Example: `http://192.168.1.100:5173`

**Note:** Make sure Windows Firewall allows the connection!

---

### Option 3: Netlify Drop

**No command line needed:**

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to https://app.netlify.com/drop

3. Drag the `dist` folder into the browser

4. Get instant URL!

---

## 📱 Testing on Phone

### Using Chrome DevTools (Before Competition)

1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or "Pixel 5"
4. Test all features in mobile view

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All features work perfectly on all sizes!

---

## ⚡ Quick Commands

```bash
# Start development server
npm run dev

# Start with network access
npm run dev -- --host

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

---

## 🎯 Pre-Demo Checklist

- [ ] Server running (`npm run dev`)
- [ ] Test login with demo@mediqueue.com / demo123
- [ ] Book at least one appointment
- [ ] Test on phone (if deploying)
- [ ] Check dark mode works
- [ ] Clear browser console (no errors)

---

## 🔥 Pro Tips for Judges

1. **Start with mobile view** - Show it's mobile-first
2. **Use dark mode** - Looks more premium
3. **Book 2-3 appointments** - Shows it works
4. **Mention no backend** - Impressive for MVP
5. **Highlight 2-hour build time** - Shows efficiency

---

## 📞 Emergency Troubleshooting

### "Port 5173 already in use"
```bash
npx kill-port 5173
npm run dev
```

### "Cannot access on phone"
- Check both devices on same WiFi
- Disable Windows Firewall temporarily
- Use `--host` flag
- Try Vercel deployment instead

### "Build fails"
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

**You're all set! Good luck! 🚀**
