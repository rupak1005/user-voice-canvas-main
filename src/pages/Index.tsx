
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FeedbackForm } from '@/components/FeedbackForm';
import { FeedbackDashboard } from '@/components/FeedbackDashboard';
import { useFeedback } from '@/hooks/useFeedback';
import { MessageSquare, BarChart3 } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'dashboard'>('form');
  const { addFeedback } = useFeedback();

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header with Theme Toggle */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2 tracking-tight">
                Feedback System
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                Share your thoughts and help us improve. Submit feedback or explore all submissions.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-8 flex justify-center">
          <div className="glass rounded-xl p-1 inline-flex gap-1">
            <Button
              variant="ghost"
              onClick={() => setCurrentView('form')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                currentView === 'form' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <MessageSquare size={16} />
              Submit Feedback
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                currentView === 'dashboard' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <BarChart3 size={16} />
              Dashboard
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {currentView === 'form' ? (
            <FeedbackForm onSubmit={addFeedback} />
          ) : (
            <FeedbackDashboard />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
