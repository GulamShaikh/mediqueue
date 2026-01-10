// Authentication module
import { DEMO_USERS } from './data.js';

// Check if user is logged in
export function isLoggedIn() {
    return localStorage.getItem('mediqueue_user') !== null;
}

// Get current user
export function getCurrentUser() {
    const userStr = localStorage.getItem('mediqueue_user');
    return userStr ? JSON.parse(userStr) : null;
}

// Login function
export function login(email, password) {
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('mediqueue_user', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Invalid email or password' };
}

// Signup function (demo - just creates a new user)
export function signup(name, email, phone, password) {
    // Check if email already exists
    const existingUser = DEMO_USERS.find(u => u.email === email);
    if (existingUser) {
        return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = { name, email, phone };
    localStorage.setItem('mediqueue_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
}

// Logout function
export function logout() {
    localStorage.removeItem('mediqueue_user');
    localStorage.removeItem('mediqueue_bookings');
}

// Get user bookings
export function getUserBookings() {
    const bookingsStr = localStorage.getItem('mediqueue_bookings');
    return bookingsStr ? JSON.parse(bookingsStr) : [];
}

// Add booking
export function addBooking(booking) {
    const bookings = getUserBookings();
    const newBooking = {
        ...booking,
        id: Date.now(),
        status: 'upcoming',
        bookedAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('mediqueue_bookings', JSON.stringify(bookings));
    return newBooking;
}

// Cancel booking
export function cancelBooking(bookingId) {
    const bookings = getUserBookings();
    const updatedBookings = bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('mediqueue_bookings', JSON.stringify(updatedBookings));
}
