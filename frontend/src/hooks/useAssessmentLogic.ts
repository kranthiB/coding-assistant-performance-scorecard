import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import type { Assessment } from '../context/AssessmentContext';

type NavigationDirection = 'next' | 'previous' | 'tab-change';

interface AssessmentSection {
  id: string;
  label: string;
  criteria: string[];
  description: string;
}

interface NavigationState {
  canProceed: boolean;
  canGoBack: boolean;
  isLastSection: boolean;
}

const sections: Record<string, AssessmentSection[]> = {
  intelligence: [
    {
      id: 'context-awareness',
      label: 'Context Awareness',
      description: 'Evaluate how well the system understands and utilizes context in its responses',
      criteria: [
        'Understanding of project context',
        'Code comprehension',
        'Requirements interpretation',
        'Contextual relevance',
        'Adaptive responses'
      ]
    },
    {
      id: 'output-quality',
      label: 'Output Quality',
      description: 'Assess the quality and reliability of generated outputs',
      criteria: [
        'Code correctness',
        'Documentation quality',
        'Error handling',
        'Best practices adherence'
      ]
    },
    {
      id: 'autonomy',
      label: 'Autonomy',
      description: 'Evaluate the system\'s ability to work independently',
      criteria: [
        'Independent problem-solving',
        'Decision-making ability',
        'Self-correction',
        'Initiative'
      ]
    }
  ],
  acceleration: [
    {
      id: 'iteration-size',
      label: 'Iteration Size',
      description: 'Evaluate the amount of work completed in each iteration',
      criteria: [
        'Code quantity per iteration',
        'Feature completeness',
        'Scope coverage',
        'Output comprehensiveness'
      ]
    },
    {
      id: 'iteration-speed',
      label: 'Iteration Speed',
      description: 'Assess the speed of completing each iteration',
      criteria: [
        'Response time',
        'Processing speed',
        'Iteration completion rate',
        'Time efficiency'
      ]
    },
    {
      id: 'capabilities',
      label: 'Capabilities',
      description: 'Evaluate the range and depth of available features',
      criteria: [
        'Feature set breadth',
        'Integration options',
        'Customization possibilities',
        'Advanced functionalities'
      ]
    }
  ],
  experience: [
    {
      id: 'flexibility',
      label: 'Flexibility',
      description: 'Assess adaptability to different scenarios and requirements',
      criteria: [
        'Adaptation to different contexts',
        'Language support',
        'Framework compatibility',
        'Customization options'
      ]
    },
    {
      id: 'ease-of-use',
      label: 'Ease of Use',
      description: 'Evaluate user-friendliness and learning curve',
      criteria: [
        'Interface intuitiveness',
        'Documentation clarity',
        'Learning curve',
        'User guidance'
      ]
    },
    {
      id: 'reliability',
      label: 'Reliability',
      description: 'Assess consistency and dependability of the tool',
      criteria: [
        'System stability',
        'Output consistency',
        'Error handling',
        'Service availability'
      ]
    }
  ],
  value: [
    {
      id: 'value',
      label: 'Value',
      description: 'Evaluate overall value proposition and ROI',
      criteria: [
        'Cost effectiveness',
        'Time savings',
        'Quality improvements',
        'Business impact',
        'ROI metrics'
      ]
    }
  ]
};

export const useAssessmentLogic = (toolId: string) => {
  const { state, dispatch } = useAssessment();
  const navigate = useNavigate();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    canProceed: false,
    canGoBack: false,
    isLastSection: false
  });

  const updateNavigationState = useCallback(() => {
    const currentSections = sections[state.currentCategory] || [];
    const currentIndex = currentSections.findIndex(section => section.id === state.currentSubcategory);
    const categories = Object.keys(sections);
    const currentCategoryIndex = categories.indexOf(state.currentCategory);
    
    setNavigationState({
      canProceed: state.assessments.some((assessment: Assessment) => 
        assessment.category === state.currentCategory && 
        assessment.subcategory === state.currentSubcategory
      ),
      canGoBack: currentIndex > 0 || currentCategoryIndex > 0,
      isLastSection: currentCategoryIndex === categories.length - 1 && 
                    currentIndex === currentSections.length - 1
    });
  }, [state.currentCategory, state.currentSubcategory, state.assessments]);

  useEffect(() => {
    dispatch({ type: 'SELECT_TOOL', payload: toolId });
  }, [toolId, dispatch]);

  useEffect(() => {
    updateNavigationState();
  }, [state.currentCategory, state.currentSubcategory, state.assessments, updateNavigationState]);

  const handleScoreSubmit = useCallback((score: number, notes: string) => {
    const timestamp = new Date().toISOString();
    const existingAssessmentIndex = state.assessments.findIndex(
      assessment => 
        assessment.category === state.currentCategory && 
        assessment.subcategory === state.currentSubcategory
    );

    if (existingAssessmentIndex >= 0) {
      // Update existing assessment
      dispatch({
        type: 'UPDATE_ASSESSMENT',
        payload: {
          index: existingAssessmentIndex,
          assessment: {
            toolId,
            category: state.currentCategory,
            subcategory: state.currentSubcategory,
            score,
            notes,
            timestamp
          }
        }
      });
    } else {
      // Add new assessment
      dispatch({
        type: 'ADD_ASSESSMENT',
        payload: {
          toolId,
          category: state.currentCategory,
          subcategory: state.currentSubcategory,
          score,
          notes,
          timestamp
        }
      });
    }

    // Navigate to next section if not the last one
    if (!navigationState.isLastSection) {
      handleNavigation('next');
    }
  }, [dispatch, state.currentCategory, state.currentSubcategory, state.assessments, toolId, navigationState.isLastSection]);

  const handleAssessmentComplete = useCallback(async () => {
    try {
      dispatch({ type: 'START_SAVING' });
      
      // Simulate API call to save assessment data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate final scores and prepare summary
      const categoryScores: Record<string, number> = {};
      Object.keys(sections).forEach(category => {
        const categoryAssessments = state.assessments.filter(a => a.category === category);
        if (categoryAssessments.length > 0) {
          const sum = categoryAssessments.reduce((acc, curr) => acc + curr.score, 0);
          categoryScores[category] = Number((sum / categoryAssessments.length).toFixed(2));
        }
      });

      const overallScore = Object.values(categoryScores).reduce((acc, curr) => acc + curr, 0) / 
                          Object.values(categoryScores).length;

      // Complete the assessment
      dispatch({ type: 'COMPLETE_ASSESSMENT' });
      dispatch({ 
        type: 'FINISH_SAVING',
        payload: new Date().toISOString()
      });

      // Navigate to results page with scores
      navigate('/', { 
        state: { 
          assessmentCompleted: true,
          scores: {
            overall: Number(overallScore.toFixed(2)),
            categories: categoryScores
          }
        }
      });
    } catch (error) {
      console.error('Error completing assessment:', error);
      // Handle error appropriately
    }
  }, [dispatch, navigate, state.assessments]);
  
  const handleNavigation = useCallback((direction: NavigationDirection) => {
    const categories = Object.keys(sections);
    const currentCategoryIndex = categories.indexOf(state.currentCategory);
    const currentSections = sections[state.currentCategory];
    const currentIndex = currentSections.findIndex(
      section => section.id === state.currentSubcategory
    );
  
    switch (direction) {
      case 'next':
        if (currentIndex < currentSections.length - 1) {
          dispatch({
            type: 'SET_SUBCATEGORY',
            payload: currentSections[currentIndex + 1].id
          });
        } else if (currentCategoryIndex < categories.length - 1) {
          const nextCategory = categories[currentCategoryIndex + 1];
          dispatch({ type: 'SET_CATEGORY', payload: nextCategory });
          dispatch({
            type: 'SET_SUBCATEGORY',
            payload: sections[nextCategory][0].id
          });
        }
        break;
  
      case 'previous':
        if (currentIndex > 0) {
          dispatch({
            type: 'SET_SUBCATEGORY',
            payload: currentSections[currentIndex - 1].id
          });
        } else if (currentCategoryIndex > 0) {
          const previousCategory = categories[currentCategoryIndex - 1];
          const previousSections = sections[previousCategory];
          dispatch({ type: 'SET_CATEGORY', payload: previousCategory });
          dispatch({
            type: 'SET_SUBCATEGORY',
            payload: previousSections[previousSections.length - 1].id
          });
        }
        break;
  
      case 'tab-change':
        const tabIndex = currentIndex;
        const newSubcategoryId = currentSections[tabIndex]?.id;
        if (newSubcategoryId) {
          dispatch({
            type: 'SET_SUBCATEGORY',
            payload: newSubcategoryId
          });
        }
        break;
    }
  }, [
    state.currentCategory,
    state.currentSubcategory,
    dispatch,
    sections,
    navigationState.isLastSection,
    handleAssessmentComplete
  ]);


  const getCurrentSectionData = useCallback(() => {
    const currentSections = sections[state.currentCategory] || [];
    return currentSections.find(section => section.id === state.currentSubcategory);
  }, [state.currentCategory, state.currentSubcategory]);

  const getProgress = useCallback(() => {
    const totalSections = Object.values(sections).reduce(
      (acc, curr) => acc + curr.length, 0
    );
    const completedAssessments = state.assessments.length;
    return Math.round((completedAssessments / totalSections) * 100);
  }, [state.assessments.length]);

  const getSectionScores = useCallback(() => {
    const scores: Record<string, Record<string, number>> = {};
    Object.keys(sections).forEach(category => {
      scores[category] = {};
      sections[category].forEach(section => {
        const assessment = state.assessments.find(
          a => a.category === category && a.subcategory === section.id
        );
        scores[category][section.id] = assessment?.score || 0;
      });
    });
    return scores;
  }, [state.assessments]);

  return {
    currentCategory: state.currentCategory,
    currentSubcategory: state.currentSubcategory,
    navigationState,
    sections,
    assessments: state.assessments,
    isSaving: state.isSaving,
    lastSaved: state.lastSaved,
    handleScoreSubmit,
    handleNavigation,
    handleAssessmentComplete,
    getCurrentSectionData,
    getProgress,
    getSectionScores
  };
};

export default useAssessmentLogic;