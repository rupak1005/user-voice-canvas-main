import { useState, useEffect } from 'react';
import { Feedback, FeedbackCategory, SortOption } from '@/types/feedback';

export const useFeedback = () => {
  const [allFeedback, setAllFeedback] = useState<Feedback[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch feedback from backend on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/feedback`)
      .then(res => res.json())
      .then((data) => {
        // Map backend fields to frontend Feedback type
        const mapped = data.map((item: any) => ({
          id: item._id,
          name: item.name,
          email: item.email,
          feedback: item.feedback,
          category: item.category,
          timestamp: new Date(item.createdAt),
          status: item.status || 'new',
        }));
        setAllFeedback(mapped);
      });
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

  // Submit feedback to backend
  const addFeedback = async (newFeedback: Omit<Feedback, 'id' | 'timestamp' | 'status'>) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback),
    });
    if (!res.ok) throw new Error('Failed to submit feedback');
    const saved = await res.json();
    const feedbackItem: Feedback = {
      id: saved._id,
      name: saved.name,
      email: saved.email,
      feedback: saved.feedback,
      category: saved.category,
      timestamp: new Date(saved.createdAt),
      status: saved.status || 'new',
    };
    setAllFeedback(prev => [feedbackItem, ...prev]);
  };

  // Dummy for status update (implement if needed)
  const updateFeedbackStatus = (id: string, status: Feedback['status']) => {
    // Optionally implement PATCH/PUT to backend
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
    updateFeedbackStatus,
  };
};
