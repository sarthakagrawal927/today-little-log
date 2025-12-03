import { useState, useEffect } from 'react';

export interface JournalEntry {
  date: string; // YYYY-MM-DD format
  content: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'daily-journal-entries';

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setEntries(parsed);
      } catch (e) {
        console.error('Failed to parse journal entries:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const getTodayKey = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getTodayEntry = (): JournalEntry | undefined => {
    return entries.find(entry => entry.date === getTodayKey());
  };

  const saveEntry = (content: string, date?: string) => {
    const targetDate = date || getTodayKey();
    const now = new Date().toISOString();
    
    setEntries(prev => {
      const existingIndex = prev.findIndex(entry => entry.date === targetDate);
      
      if (existingIndex >= 0) {
        // Update existing entry
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          content,
          updatedAt: now,
        };
        return updated;
      } else {
        // Create new entry
        return [
          {
            date: targetDate,
            content,
            createdAt: now,
            updatedAt: now,
          },
          ...prev,
        ].sort((a, b) => b.date.localeCompare(a.date));
      }
    });
  };

  const deleteEntry = (date: string) => {
    setEntries(prev => prev.filter(entry => entry.date !== date));
  };

  const getRecentEntries = (count: number = 10): JournalEntry[] => {
    return entries
      .filter(entry => entry.date !== getTodayKey())
      .slice(0, count);
  };

  return {
    entries,
    isLoaded,
    getTodayEntry,
    getRecentEntries,
    saveEntry,
    deleteEntry,
    getTodayKey,
  };
}
