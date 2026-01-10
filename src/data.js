// Mock hospital data for Mumbai
export const HOSPITALS = [
  {
    id: 1,
    name: "Lilavati Hospital",
    address: "A-791, Bandra Reclamation, Bandra West, Mumbai",
    specialties: ["General", "Cardiology", "Orthopedic"],
    availableSlots: 15,
    rating: 4.8,
    distance: "2.3 km",
    image: "/lilavati.jpg"
  },
  {
    id: 2,
    name: "Hinduja Hospital",
    address: "Veer Savarkar Marg, Mahim, Mumbai",
    specialties: ["General", "Dental", "Cardiology"],
    availableSlots: 8,
    rating: 4.7,
    distance: "3.1 km",
    image: "/hinduja.jpg"
  },
  {
    id: 3,
    name: "Kokilaben Dhirubhai Ambani Hospital",
    address: "Rao Saheb Achutrao Patwardhan Marg, Andheri West, Mumbai",
    specialties: ["Cardiology", "Orthopedic", "Pediatric"],
    availableSlots: 22,
    rating: 4.9,
    distance: "5.7 km",
    image: "/kokilaben.png"
  },
  {
    id: 4,
    name: "Breach Candy Hospital",
    address: "60-A, Bhulabhai Desai Road, Mumbai",
    specialties: ["General", "Pediatric", "Dental"],
    availableSlots: 12,
    rating: 4.6,
    distance: "4.2 km",
    image: "/hospital-1.png"
  },
  {
    id: 5,
    name: "Jaslok Hospital",
    address: "15, Dr. G. Deshmukh Marg, Pedder Road, Mumbai",
    specialties: ["General", "Cardiology", "Orthopedic"],
    availableSlots: 5,
    rating: 4.7,
    distance: "3.8 km",
    image: "/hospital-2.png"
  },
  {
    id: 6,
    name: "Nanavati Super Speciality Hospital",
    address: "S.V. Road, Vile Parle West, Mumbai",
    specialties: ["General", "Cardiology", "Pediatric"],
    availableSlots: 18,
    rating: 4.8,
    distance: "6.5 km",
    image: "/hospital-3.png"
  },
  {
    id: 7,
    name: "Fortis Hospital Mulund",
    address: "Mulund Goregaon Link Road, Mumbai",
    specialties: ["Orthopedic", "Dental", "General"],
    availableSlots: 10,
    rating: 4.5,
    distance: "12.3 km",
    image: "/hospital-1.png"
  },
  {
    id: 8,
    name: "Wockhardt Hospital",
    address: "1877, Dr. Anandrao Nair Marg, Mumbai Central, Mumbai",
    specialties: ["Cardiology", "Orthopedic", "General"],
    availableSlots: 3,
    rating: 4.6,
    distance: "5.1 km",
    image: "/hospital-2.png"
  },
  {
    id: 9,
    name: "Apollo Spectra Hospital",
    address: "Chunabhatti, Sion East, Mumbai",
    specialties: ["General", "Dental", "Pediatric"],
    availableSlots: 20,
    rating: 4.4,
    distance: "7.8 km",
    image: "/hospital-3.png"
  },
  {
    id: 10,
    name: "Bombay Hospital",
    address: "12, New Marine Lines, Mumbai",
    specialties: ["General", "Cardiology", "Dental"],
    availableSlots: 14,
    rating: 4.7,
    distance: "4.5 km",
    image: "/hospital-1.png"
  },
  {
    id: 11,
    name: "Tata Memorial Hospital",
    address: "Dr. Ernest Borges Road, Parel, Mumbai",
    specialties: ["General", "Cardiology"],
    availableSlots: 7,
    rating: 4.9,
    distance: "6.2 km",
    image: "/hospital-2.png"
  },
  {
    id: 12,
    name: "Holy Family Hospital",
    address: "St. Andrew's Road, Bandra West, Mumbai",
    specialties: ["General", "Pediatric", "Dental"],
    availableSlots: 16,
    rating: 4.5,
    distance: "2.8 km",
    image: "/hospital-3.png"
  }
];

// Specialties list
export const SPECIALTIES = ["General", "Dental", "Cardiology", "Orthopedic", "Pediatric"];

// Generate time slots (9 AM to 8 PM, 30-min intervals)
export function generateTimeSlots() {
  const slots = [];
  for (let hour = 9; hour <= 20; hour++) {
    for (let minute of [0, 30]) {
      if (hour === 20 && minute === 30) break; // Stop at 8:00 PM
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;

      // Randomly mark some slots as booked for demo
      const isBooked = Math.random() > 0.7;

      slots.push({
        time,
        displayTime,
        isBooked
      });
    }
  }
  return slots;
}

// Ambulance services data
export const AMBULANCE_SERVICES = [
  {
    id: 1,
    name: "Mumbai Emergency Ambulance",
    phone: "102",
    type: "Government",
    responseTime: "10-15 min",
    available24x7: true
  },
  {
    id: 2,
    name: "Ziqitza Healthcare (ZHL)",
    phone: "1298",
    type: "Private",
    responseTime: "8-12 min",
    available24x7: true
  },
  {
    id: 3,
    name: "BVG India Ambulance",
    phone: "+91-9773331234",
    type: "Private",
    responseTime: "10-15 min",
    available24x7: true
  },
  {
    id: 4,
    name: "Red Cross Ambulance",
    phone: "+91-22-23753333",
    type: "NGO",
    responseTime: "15-20 min",
    available24x7: true
  },
  {
    id: 5,
    name: "St. John Ambulance",
    phone: "+91-22-23078888",
    type: "NGO",
    responseTime: "12-18 min",
    available24x7: true
  }
];

// Demo user accounts
export const DEMO_USERS = [
  {
    email: "demo@mediqueue.com",
    password: "demo123",
    name: "Demo User",
    phone: "+91-9876543210"
  },
  {
    email: "patient@test.com",
    password: "patient123",
    name: "Test Patient",
    phone: "+91-9876543211"
  }
];

// Get availability status based on slots
export function getAvailabilityStatus(availableSlots) {
  if (availableSlots >= 15) return 'available';
  if (availableSlots >= 5) return 'limited';
  return 'full';
}

// Get availability text
export function getAvailabilityText(availableSlots) {
  if (availableSlots >= 15) return `${availableSlots} slots available`;
  if (availableSlots >= 5) return `Only ${availableSlots} slots left`;
  return `Limited: ${availableSlots} slots`;
}
