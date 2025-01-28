import React, { createContext, useContext, useReducer } from 'react';

export type Assessment = {
  toolId: string;
  category: string;
  subcategory: string;
  score: number;
  notes: string;
  timestamp: string;
};

export type Criteria = {
  category: string;
  subcategory: string;
  description: string;
  scoreRanges: Array<{
    min: number;
    max: number;
    label: string;
  }>;
};

export type AssessmentState = {
  selectedTool: string | null;
  currentCategory: string;
  currentSubcategory: string;
  assessments: Assessment[];
  criteria: Criteria[];
  isAssessmentComplete: boolean;
  isSaving: boolean;
  lastSaved: string | null;
};

export type AssessmentAction =
  | { type: 'SELECT_TOOL'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SUBCATEGORY'; payload: string }
  | { type: 'ADD_ASSESSMENT'; payload: Assessment }
  | { type: 'UPDATE_ASSESSMENT'; payload: { index: number; assessment: Assessment } }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'START_SAVING' }
  | { type: 'FINISH_SAVING'; payload: string }
  | { type: 'RESET_ASSESSMENT' };

export type AssessmentContextType = {
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
};

const initialState: AssessmentState = {
  selectedTool: null,
  currentCategory: 'intelligence',
  currentSubcategory: 'context-awareness',
  assessments: [],
  criteria: [
    {
      category: 'intelligence',
      subcategory: 'context-awareness',
      description: 'Evaluate how well the system understands and utilizes context',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'intelligence',
      subcategory: 'output-quality',
      description: 'Assess the quality and reliability of generated outputs',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'intelligence',
      subcategory: 'autonomy',
      description: 'Evaluate the system\'s ability to work independently',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'acceleration',
      subcategory: 'iteration-size',
      description: 'Evaluate the amount of work completed in each iteration',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'acceleration',
      subcategory: 'iteration-speed',
      description: 'Assess the speed of completing each iteration',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'acceleration',
      subcategory: 'capabilities',
      description: 'Evaluate the range and depth of available features',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'experience',
      subcategory: 'flexibility',
      description: 'Assess adaptability to different scenarios and requirements',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'experience',
      subcategory: 'ease-of-use',
      description: 'Evaluate user-friendliness and learning curve',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'experience',
      subcategory: 'reliability',
      description: 'Assess consistency and dependability of the tool',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    },
    {
      category: 'value',
      subcategory: 'value',
      description: 'Evaluate overall value proposition and ROI',
      scoreRanges: [
        { min: 0, max: 4, label: 'Poor' },
        { min: 5, max: 6, label: 'Fair' },
        { min: 7, max: 8, label: 'Good' },
        { min: 9, max: 10, label: 'Exceptional' }
      ]
    }
  ],
  isAssessmentComplete: false,
  isSaving: false,
  lastSaved: null
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case 'SELECT_TOOL':
      return {
        ...state,
        selectedTool: action.payload,
        assessments: [],
        isAssessmentComplete: false,
        lastSaved: null
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        currentCategory: action.payload,
        currentSubcategory: state.criteria
          .find(c => c.category === action.payload)
          ?.subcategory || state.currentSubcategory
      };

    case 'SET_SUBCATEGORY':
      return {
        ...state,
        currentSubcategory: action.payload
      };

    case 'ADD_ASSESSMENT':
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
        lastSaved: new Date().toISOString()
      };

    case 'UPDATE_ASSESSMENT':
      const updatedAssessments = [...state.assessments];
      updatedAssessments[action.payload.index] = action.payload.assessment;
      return {
        ...state,
        assessments: updatedAssessments,
        lastSaved: new Date().toISOString()
      };

    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        isAssessmentComplete: true,
        lastSaved: new Date().toISOString()
      };

    case 'START_SAVING':
      return {
        ...state,
        isSaving: true
      };

    case 'FINISH_SAVING':
      return {
        ...state,
        isSaving: false,
        lastSaved: action.payload
      };

    case 'RESET_ASSESSMENT':
      return {
        ...initialState,
        criteria: state.criteria // Preserve criteria configuration
      };

    default:
      return state;
  }
};

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

export const assessmentUtils = {
  calculateAverageScore: (assessments: Assessment[]): number => {
    if (assessments.length === 0) return 0;
    const sum = assessments.reduce((acc, curr) => acc + curr.score, 0);
    return Number((sum / assessments.length).toFixed(2));
  },

  isAssessmentComplete: (assessments: Assessment[], criteria: Criteria[]): boolean => {
    const requiredAssessments = criteria.length;
    return assessments.length === requiredAssessments;
  },

  getAssessmentStatus: (score: number): string => {
    if (score >= 9) return 'Exceptional';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Fair';
    return 'Poor';
  },

  getCriteriaByCategory: (criteria: Criteria[], category: string): Criteria[] => {
    return criteria.filter(c => c.category === category);
  }
};

export default AssessmentContext;