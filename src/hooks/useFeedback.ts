
import { useState, useEffect } from 'react';
import { Feedback, FeedbackCategory, SortOption } from '@/types/feedback';

const STORAGE_KEY = 'feedback-data';

// Mock data for demonstration
const mockFeedback: Feedback[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    feedback: 'The application is great but could use a dark mode feature. It would really help during night time usage.',
    category: 'feature-request',
    timestamp: new Date('2024-06-20T10:30:00'),
    status: 'new'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    feedback: 'Found a bug where the form doesn\'t submit properly on mobile devices. The submit button becomes unresponsive.',
    category: 'bug-report',
    timestamp: new Date('2024-06-22T14:15:00'),
    status: 'in-review'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    feedback: 'I suggest adding keyboard shortcuts for better navigation. This would greatly improve productivity.',
    category: 'suggestion',
    timestamp: new Date('2024-06-24T09:45:00'),
    status: 'new'
  }
];

export const useFeedback = () => {
  const [allFeedback, setAllFeedback] = useState<Feedback[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Load feedback from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedFeedback = JSON.parse(stored).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
      setAllFeedback(parsedFeedback);
    } else {
      // Use mock data if no stored data
      setAllFeedback(mockFeedback);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockFeedback));
    }
  }, []);

  // Filter and sort feedback whenever dependencies change
  useEffect(() => {
    let filtered = [...allFeedback];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    setFilteredFeedback(filtered);
  }, [allFeedback, selectedCategory, sortBy, searchTerm]);

  const addFeedback = (newFeedback: Omit<Feedback, 'id' | 'timestamp' | 'status'>) => {
    const feedbackItem: Feedback = {
      ...newFeedback,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'new'
    };

    const updatedFeedback = [feedbackItem, ...allFeedback];
    setAllFeedback(updatedFeedback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeedback));
  };

  const updateFeedbackStatus = (id: string, status: Feedback['status']) => {
    const updatedFeedback = allFeedback.map(item =>
      item.id === id ? { ...item, status } : item
    );
    setAllFeedback(updatedFeedback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeedback));
  };

  return {
    feedback: filteredFeedback,
    allFeedback,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    addFeedback,
    updateFeedbackStatus
  };
};
