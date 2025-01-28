import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import AssessmentLayout from '../components/assessment/AssessmentLayout';
import AssessmentContent from '../components/assessment/AssessmentContent';
import { useAssessment, type Assessment as AssessmentType } from '../context/AssessmentContext';
import { useAssessmentLogic } from '../hooks/useAssessmentLogic';
import { toolsApi } from '../api/apiClient';
import type { Tool } from '../api/types';


const Assessment: React.FC = () => {
  const { toolId = '' } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toolDetails, setToolDetails] = useState<Tool | null>(null);

  const {
    currentCategory,
    currentSubcategory,
    navigationState,
    handleScoreSubmit,
    handleNavigation,
    handleAssessmentComplete,
    getProgress,
    sections
  } = useAssessmentLogic(toolId);

  useEffect(() => {
    const initializeAssessment = async () => {
      try {
        setIsLoading(true);
        // Find the selected tool
        const tool = await toolsApi.getToolById(toolId);
        setToolDetails(tool);
        
        // Initialize assessment state
        dispatch({ type: 'SELECT_TOOL', payload: toolId });
        dispatch({ type: 'SET_CATEGORY', payload: 'intelligence' });
        dispatch({ 
          type: 'SET_SUBCATEGORY', 
          payload: 'context-awareness'
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing assessment:', err);
        setError('Failed to load assessment data. Please try again.');
        setIsLoading(false);
      }
    };

    if (toolId) {
      initializeAssessment();
    }
  }, [toolId, dispatch]);

  const handleCategoryChange = (category: string) => {
    const categoryData = sections[category];
    if (categoryData && categoryData.length > 0) {
      dispatch({ type: 'SET_CATEGORY', payload: category });
      dispatch({ 
        type: 'SET_SUBCATEGORY', 
        payload: categoryData[0].id
      });
    }
  };

  const handleExitAssessment = () => {
    if (state.assessments.length > 0) {
      setShowExitDialog(true);
    } else {
      navigate('/');
    }
  };

  const handleConfirmExit = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
    navigate('/');
  };

  const calculateFinalScore = (assessments: AssessmentType[]): number => {
    if (assessments.length === 0) return 0;
    const sum = assessments.reduce((acc, curr) => acc + curr.score, 0);
    return Number((sum / assessments.length).toFixed(2));
  };

  const handleSubmitAssessment = async () => {
    try {
      setIsSubmitting(true);
      await handleAssessmentComplete();
      // Update tool score after assessment completion
      if (toolDetails) {
        const updatedScore = calculateFinalScore(state.assessments);
        await toolsApi.updateTool(toolId, {
          ...toolDetails,
          score: updatedScore,
          lastAssessment: new Date().toISOString()
        });
      }
      navigate('/', { state: { assessmentCompleted: true } });
    } catch (err) {
      setError('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseError = () => setError(null);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!toolDetails) {
    return (
      <Box p={3}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
          }
        >
          Tool not found
        </Alert>
      </Box>
    );
  }

  const progress = getProgress();

  return (
    <>
      <AssessmentLayout 
        toolName={toolDetails.name}
        onCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
        progress={progress}
        assessments={state.assessments}
      >
        <AssessmentContent
          toolDetails = {toolDetails}
          category={currentCategory}
          subcategory={currentSubcategory}
          onScoreSubmit={handleScoreSubmit}
          onNavigate={handleNavigation}
          onExit={handleExitAssessment}
          navigationState={navigationState}
          isSubmitting={isSubmitting}
        />
      </AssessmentLayout>

      <Dialog
        open={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        aria-labelledby="exit-dialog-title"
      >
        <DialogTitle id="exit-dialog-title">
          Exit Assessment?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Your progress ({progress}%) will be lost if you exit now. Are you sure you want to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExitDialog(false)} color="primary">
            Continue Assessment
          </Button>
          <Button onClick={handleConfirmExit} color="error" variant="contained">
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Assessment;