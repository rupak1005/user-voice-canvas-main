
export interface Feedback {
  id: string;
  name: string;
  email: string;
  feedback: string;
  category: 'suggestion' | 'bug-report' | 'feature-request';
  timestamp: Date;
  status: 'new' | 'in-review' | 'resolved';
}

export type FeedbackCategory = Feedback['category'];
export type FeedbackStatus = Feedback['status'];
export type SortOption = 'newest' | 'oldest' | 'name' | 'category';
