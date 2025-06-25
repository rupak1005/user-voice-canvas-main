import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FeedbackCategory } from '@/types/feedback';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { useFeedback } from '@/hooks/useFeedback';

export const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    category: '' as FeedbackCategory | ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addFeedback } = useFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.feedback || !formData.category) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes('@')) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addFeedback(formData as any);
      setFormData({
        name: '',
        email: '',
        feedback: '',
        category: ''
      });
      toast({
        title: "Feedback submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass modern-shadow  border transition-all duration-300">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-ring transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-ring transition-colors"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-foreground">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value: FeedbackCategory) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="h-10 bg-background border-border text-foreground">
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent className="bg-popover backdrop-blur-sm border-border">
                <SelectItem value="suggestion" className="text-popover-foreground hover:bg-accent">💡 Suggestion</SelectItem>
                <SelectItem value="bug-report" className="text-popover-foreground hover:bg-accent">🐛 Bug Report</SelectItem>
                <SelectItem value="feature-request" className="text-popover-foreground hover:bg-accent">✨ Feature Request</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium text-foreground">
              Your Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts, suggestions, or report any issues..."
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              rows={5}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-ring resize-none transition-colors"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium flex items-center gap-2 transition-all duration-200"
            disabled={isSubmitting}
          >
            <Send size={16} />
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
