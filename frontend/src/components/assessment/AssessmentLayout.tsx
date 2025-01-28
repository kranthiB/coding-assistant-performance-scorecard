import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  Divider,
  IconButton,
  Typography,
  Stack,
  useTheme,
  Button,
  ListItemButton,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  Psychology as IntelligenceIcon,
  Speed as AccelerationIcon,
  Stars as ExperienceIcon,
  TrendingUp as ValueIcon,
  ArrowBack as BackIcon,
  CheckCircle as CompletedIcon
} from '@mui/icons-material';
import type { Assessment } from '../../context/AssessmentContext'

const MenuItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    }
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'intelligence',
    label: 'Intelligence',
    icon: <IntelligenceIcon />,
    description: 'Evaluate cognitive capabilities and problem-solving abilities'
  },
  {
    id: 'acceleration',
    label: 'Acceleration',
    icon: <AccelerationIcon />,
    description: 'Assess performance speed and optimization capabilities'
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: <ExperienceIcon />,
    description: 'Review practical implementation and real-world usage'
  },
  {
    id: 'value',
    label: 'Value',
    icon: <ValueIcon />,
    description: 'Analyze cost-effectiveness and business impact'
  }
];

interface Tool {
  id: string;
  name: string;
  score: number;
  status: 'active' | 'inactive';
  description: string;
  lastAssessment?: string;
  category?: string;
}

interface AssessmentLayoutProps {
  children: React.ReactNode;
  toolName: string;
  onCategoryChange: (category: string) => void;
  currentCategory: string;
  progress: number;
  assessments: Assessment[];
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({ 
  children,
  toolName,
  onCategoryChange,
  currentCategory,
  progress,
  assessments
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isConfirmingExit, setIsConfirmingExit] = React.useState(false);

  const handleSectionChange = (sectionId: string) => {
    onCategoryChange(sectionId);
  };

  const handleBackNavigation = () => {
    setIsConfirmingExit(true);
  };

  const handleConfirmExit = () => {
    navigate('/');
  };

  const handleCancelExit = () => {
    setIsConfirmingExit(false);
  };

  const isSectionCompleted = (sectionId: string): boolean => {
    return assessments.some(assessment => assessment.category === sectionId);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      {/* Navigation Sidebar */}
      <Paper 
        elevation={0}
        sx={{ 
          width: 280, 
          borderRight: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton 
              size="small" 
              onClick={handleBackNavigation}
              sx={{ color: theme.palette.text.secondary }}
            >
              <BackIcon />
            </IconButton>
            <Typography variant="subtitle1" noWrap>
              {toolName} Assessment
            </Typography>
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Assessment Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary" align="right">
              {Math.round(progress)}% Complete
            </Typography>
          </Stack>
        </Box>

        <Divider />

        <List component="nav" sx={{ p: 2, flexGrow: 1 }}>
          {navigationItems.map((item) => (
            <MenuItem 
              key={item.id} 
              selected={currentCategory === item.id}
              disablePadding
            >
              <ListItemButton onClick={() => handleSectionChange(item.id)}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  secondary={item.description}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    sx: { 
                      color: currentCategory === item.id 
                        ? 'rgba(255, 255, 255, 0.7)' 
                        : 'text.secondary'
                    }
                  }}
                />
                {isSectionCompleted(item.id) && (
                  <Tooltip title="Section Completed">
                    <CompletedIcon 
                      fontSize="small" 
                      sx={{ 
                        ml: 1,
                        color: theme.palette.success.main 
                      }} 
                    />
                  </Tooltip>
                )}
              </ListItemButton>
            </MenuItem>
          ))}
        </List>

        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Complete all sections to submit the assessment
          </Typography>
        </Box>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        {children}
      </Box>

      {/* Exit Confirmation Dialog */}
      {isConfirmingExit && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: theme.zIndex.modal
          }}
        >
          <Paper sx={{ p: 3, maxWidth: 400 }}>
            <Typography variant="h6" gutterBottom>
              Exit Assessment?
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your progress ({Math.round(progress)}%) will not be saved if you exit now. Are you sure you want to continue?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={handleCancelExit}>
                Continue Assessment
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={handleConfirmExit}
              >
                Exit
              </Button>
            </Stack>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default AssessmentLayout;