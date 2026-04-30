
import { BookingDetails } from '@/types/accommodation';

export const useBookingCalculations = (bookingDetails: BookingDetails) => {
  // Calculate nights dynamically based on booking details
  const calculateNights = () => {
    console.log('Calculating nights for:', bookingDetails);
    
    if (bookingDetails.isPackage && bookingDetails.packageDetails) {
      console.log('Package details:', bookingDetails.packageDetails);
      
      // Extract nights from package duration string (e.g., "7 nights" -> 7, "7 days" -> 7)
      const duration = bookingDetails.packageDetails.duration.toLowerCase();
      const durationMatch = duration.match(/(\d+)\s*(day|night)/);
      if (durationMatch) {
        const nights = parseInt(durationMatch[1], 10);
        console.log('Extracted nights from package:', nights);
        return nights;
      }
      
      // Fallback: try to extract just the number from the beginning
      const numberMatch = bookingDetails.packageDetails.duration.match(/^(\d+)/);
      if (numberMatch) {
        const nights = parseInt(numberMatch[1], 10);
        console.log('Extracted nights from number:', nights);
        return nights;
      }
      
      console.log('Could not extract nights from package, using fallback');
      return bookingDetails.nights || 1;
    }
    
    // For custom dates, calculate dynamically
    if (bookingDetails.checkInDate && bookingDetails.checkOutDate) {
      const timeDiff = bookingDetails.checkOutDate.getTime() - bookingDetails.checkInDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log('Calculated nights from dates:', daysDiff);
      return Math.max(daysDiff, 1); // Ensure at least 1 night
    }
    
    // Alternative check for checkIn/checkOut properties
    if (bookingDetails.checkIn && bookingDetails.checkOut) {
      const timeDiff = bookingDetails.checkOut.getTime() - bookingDetails.checkIn.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log('Calculated nights from checkIn/checkOut:', daysDiff);
      return Math.max(daysDiff, 1); // Ensure at least 1 night
    }
    
    console.log('Using default nights:', bookingDetails.nights || 1);
    return bookingDetails.nights || 1;
  };

  // Calculate total price
  const calculateTotalPrice = (displayNights: number) => {
    if (bookingDetails.isPackage && bookingDetails.packageDetails) {
      console.log('Using package price:', bookingDetails.packageDetails.price);
      return bookingDetails.packageDetails.price;
    }
    
    if (bookingDetails.roomCategory) {
      const totalPrice = bookingDetails.roomCategory[bookingDetails.roomCategory.name] * displayNights;
      console.log('Calculated price from room category:', totalPrice);
      return totalPrice;
    }
    
    console.log('Using default total price:', bookingDetails.totalPrice || 0);
    return bookingDetails.totalPrice || 0;
  };

  const displayNights = calculateNights();
  const totalPrice = calculateTotalPrice(displayNights);

  console.log('Final calculation - Nights:', displayNights, 'Price:', totalPrice);

  return {
    displayNights,
    totalPrice
  };
};
