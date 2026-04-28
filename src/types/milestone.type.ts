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

export interface MilestoneInput {
  age: number;
  title: string;
  content: string;
  tags: string[];
}

export interface MilestoneFilters {
  selectedCategory: string | null;
  showHighImpact: boolean;
  searchQuery: string;
}

export interface MilestoneGroup {
  decade: number;
  items: Milestone[];
}

export interface MilestoneStats {
  total: number;
  highImpactCount: number;
  mostActiveAge: string;
}
