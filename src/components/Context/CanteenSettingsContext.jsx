import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CanteenContext = createContext();

export const CanteenProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Improved function to check if canteen is currently open
 // In your CanteenProvider
const isCanteenOpen = () => {
  if (!settings || !settings.openTime || !settings.closeTime) return false;
  
  try {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Parse open and close times
    const [openHours, openMinutes] = settings.openTime.split(':').map(Number);
    const [closeHours, closeMinutes] = settings.closeTime.split(':').map(Number);
    
    // If parsing failed, return false
    if (isNaN(openHours) || isNaN(openMinutes) || isNaN(closeHours) || isNaN(closeMinutes)) {
      console.error('Invalid time format in settings:', settings.openTime, settings.closeTime);
      return false;
    }
    
    const openTimeInMinutes = openHours * 60 + openMinutes;
    const closeTimeInMinutes = closeHours * 60 + closeMinutes;
    
    // Scenario 1: Open and close times are on the same day
    if (openTimeInMinutes <= closeTimeInMinutes) {
      return currentTime >= openTimeInMinutes && currentTime <= closeTimeInMinutes;
    }
    
    // Scenario 2: Closing time crosses midnight
    return currentTime >= openTimeInMinutes || currentTime <= closeTimeInMinutes;
  } catch (error) {
    console.error('Error checking if canteen is open:', error);
    return false;
  }
};

  // Function to fetch settings from backend
  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/v1/settings/`);
      setSettings(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Function to update settings (for Admin)
  const updateSettings = async (newSettings) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/settings/`, newSettings);
      setSettings(response.data.settings);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <CanteenContext.Provider 
      value={{
        settings,
        isLoading,
        error,
        fetchSettings,
        updateSettings,
        isCanteenOpen
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => useContext(CanteenContext);