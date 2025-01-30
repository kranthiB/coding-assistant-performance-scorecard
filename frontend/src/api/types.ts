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

export interface PerformanceData {
    id: string;
    name: string;
    total: number;
    intelligence: number;
    acceleration: number;
    experience: number;
    value: number;
  }
  
export interface BarConfig {
    dataKey: string;
    name: string;
    fill: string;
    stackId?: string;
    maxValue?: number;
  }