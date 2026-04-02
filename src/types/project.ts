export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  imageUrl: string;
  tags: string[];
  caseUrl?: string;
}
