
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FeedbackCard } from './FeedbackCard';
import { useFeedback } from '@/hooks/useFeedback';
import { FeedbackCategory, SortOption } from '@/types/feedback';
import { Search, TrendingUp, Bug, Lightbulb, Sparkles } from 'lucide-react';

export const FeedbackDashboard = () => {
  const {
    feedback,
    allFeedback,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    updateFeedbackStatus
  } = useFeedback();

  const getStats = () => {
    const total = allFeedback.length;
    const byCategory = {
      suggestion: allFeedback.filter(f => f.category === 'suggestion').length,
      'bug-report': allFeedback.filter(f => f.category === 'bug-report').length,
      'feature-request': allFeedback.filter(f => f.category === 'feature-request').length,
    };
    return { total, byCategory };
  };

  const stats = getStats();

  const statCards = [
    { icon: TrendingUp, label: 'Total', value: stats.total, color: 'text-grey-300' },
    { icon: Lightbulb, label: 'Suggestions', value: stats.byCategory.suggestion, color: 'text-blue-400' },
    { icon: Bug, label: 'Bug Reports', value: stats.byCategory['bug-report'], color: 'text-red-400' },
    { icon: Sparkles, label: 'Features', value: stats.byCategory['feature-request'], color: 'text-green-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="glass modern-shadow hover-lift border-0 group">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-light text-grey-300 mb-1 ">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="glass modern-shadow border-0">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 rounded-xl"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={(value: FeedbackCategory | 'all') => setSelectedCategory(value)}
            >
              <SelectTrigger className="h-12 bg-white/5 border-white/10 text-grey300 rounded-xl">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent className=" bg-background backdrop-blur-sm border-white/10 rounded-xl">
                <SelectItem value="all" className="text-grey-300 hover:bg-white/10 rounded-lg">All categories</SelectItem>
                <SelectItem value="suggestion" className="text-grey-300 hover:bg-white/10 rounded-lg"><Lightbulb className="mr-2 h-4 w-4" /> Suggestions</SelectItem>
                <SelectItem value="bug-report" className="text-grey-300 hover:bg-white/10 rounded-lg"><Bug className='mr-2 h-4 w-4'/> Reports</SelectItem>
                <SelectItem value="feature-request" className="text-grey-300 hover:bg-white/10 rounded-lg"><Sparkles className='mr-2 h-4 w-4'/> Requests</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => setSortBy(value)}
            >
              <SelectTrigger className="h-12 bg-background border-white/10 text-grey-300 rounded-xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background backdrop-blur-sm border-white/10 rounded-xl">
                <SelectItem value="newest" className="text-grey-300 hover:bg-white/10 rounded-lg">Newest first</SelectItem>
                <SelectItem value="oldest" className="text-grey-300 hover:bg-white/10 rounded-lg">Oldest first</SelectItem>
                <SelectItem value="name" className="text-grey-300 hover:bg-white/10 rounded-lg">Name A-Z</SelectItem>
                <SelectItem value="category" className="text-grey-300 hover:bg-white/10 rounded-lg">By category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="text-sm text-gray-900 dark:text-white font-light">
        Showing {feedback.length} of {stats.total} feedback items
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedback.length === 0 ? (
          <Card className="glass modern-shadow border-0">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 text-lg font-light">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No feedback matches your filters.'
                  : 'No feedback submitted yet.'
                }
              </div>
            </CardContent>
          </Card>
        ) : (
          feedback.map((item) => (
            <FeedbackCard
              key={item.id}
              feedback={item}
              onStatusUpdate={updateFeedbackStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};
