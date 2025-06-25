
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Feedback } from '@/types/feedback';

interface FeedbackCardProps {
  feedback: Feedback;
  onStatusUpdate: (id: string, status: Feedback['status']) => void;
}

export const FeedbackCard = ({ feedback, onStatusUpdate }: FeedbackCardProps) => {
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'suggestion': return { 
        label: '💡 Suggestion', 
        color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700/30' 
      };
      case 'bug-report': return { 
        label: '🐛 Bug Report', 
        color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700/30' 
      };
      case 'feature-request': return { 
        label: '✨ Feature Request', 
        color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700/30' 
      };
      default: return { 
        label: 'General', 
        color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-300 dark:border-gray-700/30' 
      };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'new': return { 
        label: 'New', 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700/30' 
      };
      case 'in-review': return { 
        label: 'In Review', 
        color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700/30' 
      };
      case 'resolved': return { 
        label: 'Resolved', 
        color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700/30' 
      };
      default: return { 
        label: status, 
        color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-300 dark:border-gray-700/30' 
      };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const categoryInfo = getCategoryInfo(feedback.category);
  const statusInfo = getStatusInfo(feedback.status);

  return (
    <Card className="glass modern-shadow hover-lift border transition-all duration-300 group">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Badge className={`${categoryInfo.color} border px-2 py-1 text-xs font-medium`}>
                {categoryInfo.label}
              </Badge>
              <div className="flex flex-col">
                <div className="font-medium text-foreground text-sm">{feedback.name}</div>
                <div className="text-xs text-muted-foreground">{feedback.email}</div>
              </div>
            </div>
            <p className="text-foreground leading-relaxed text-sm">{feedback.feedback}</p>
            <div className="text-xs text-muted-foreground">{formatDate(feedback.timestamp)}</div>
          </div>
          
          <div className="flex items-center gap-3 sm:flex-col sm:items-end">
            <Badge className={`${statusInfo.color} border px-2 py-1 text-xs font-medium`}>
              {statusInfo.label}
            </Badge>
            <Select
              value={feedback.status}
              onValueChange={(status: Feedback['status']) => onStatusUpdate(feedback.id, status)}
            >
              <SelectTrigger className="w-28 h-8 bg-background border-border text-foreground text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover backdrop-blur-sm border-border">
                <SelectItem value="new" className="text-popover-foreground hover:bg-accent text-xs">New</SelectItem>
                <SelectItem value="in-review" className="text-popover-foreground hover:bg-accent text-xs">In Review</SelectItem>
                <SelectItem value="resolved" className="text-popover-foreground hover:bg-accent text-xs">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
