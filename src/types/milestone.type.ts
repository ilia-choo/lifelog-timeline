export interface GithubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  labels: { name: string }[];
  created_at: string;
  reactions: { total_count: number };
}

export interface Milestone {
  id: number;
  number: number;
  age: number;
  title: string;
  content: string;
  tags: string[];
  date: string;
  isHighImpact: boolean;
}
