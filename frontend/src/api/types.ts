export interface ToolScore {
    id: number;
    total: number;
    intelligence: number;
    acceleration: number;
    experience: number;
    value: number;
}
  
export interface CategoryScore {
    id: number;
    name: string;
    score: string;
}
  
export interface ToolAssessment {
    id: number;
    score: ToolScore;
    categories: CategoryScore[];
}

export interface Tool {
    id: string;
    name: string;
    score: number;
    status: string;
    description: string;
    lastAssessment: string;
    category: string;
    assessment: ToolAssessment;
}