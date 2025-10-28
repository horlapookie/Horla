export interface Article {
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  createdAt: Date;
}

export interface ForumPost {
  title: string;
  content: string;
  category: string;
  author: string;
  uploads: Upload[];
  replies: Reply[];
  createdAt: Date;
}

export interface Upload {
  type: 'image' | 'video' | 'link';
  url: string;
  caption?: string;
}

export interface Reply {
  author: string;
  content: string;
  createdAt: Date;
}

export interface Complaint {
  supportType: string;
  query: string;
  email: string;
  status: 'pending' | 'resolved';
  createdAt: Date;
}

export interface AdminContent {
  type: 'file' | 'video' | 'link';
  title: string;
  url: string;
  description: string;
  category: string;
  createdAt: Date;
}
