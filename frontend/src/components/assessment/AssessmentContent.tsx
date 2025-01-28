import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Rating,
  Button,
  Stack,
  TextField,
  Divider,
  Chip,
  CircularProgress,
  useTheme,
  Alert,
  IconButton,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as CircleIcon,
  Remove as MinusIcon,
  Cancel as XIcon
} from '@mui/icons-material';
import type { Tool } from '../../api/types';

// Update the navigation direction type
type NavigationDirection = 'next' | 'previous' | 'tab-change';

interface NavigationState {
  canProceed: boolean;
  canGoBack: boolean;
  isLastSection: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface AssessmentContentProps {
  toolDetails: Tool;
  category: string;
  subcategory: string;
  onScoreSubmit: (score: number, notes: string) => void;
  onNavigate: (direction: NavigationDirection) => void;  // Updated this line
  onExit: () => void;
  navigationState: NavigationState;
  isSubmitting: boolean;
}

interface NavigationState {
  canProceed: boolean;
  canGoBack: boolean;
  isLastSection: boolean;
}

interface ScoringGuide {
  exceptional: string[];
  good: string[];
  fair: string[];
  poor: string[];
}

interface CriteriaData {
  description: string;
  criteria: string[];
  scoringGuide: ScoringGuide;
}

interface CategoryCriteria {
  [key: string]: CriteriaData;
}

interface AssessmentCriteriaType {
  [key: string]: CategoryCriteria;
}

// Tab configurations for different categories
const categoryTabs = {
  intelligence: ['Context Awareness', 'Output Quality', 'Autonomy'],
  acceleration: ['Iteration Size', 'Iteration Speed', 'Capabilities'],
  experience: ['Flexibility', 'Ease of Use', 'Reliability'],
  value: ['Value']
};

// Assessment criteria for each category and subcategory
const assessmentCriteria: AssessmentCriteriaType = {
  intelligence: {
    'context-awareness': {
      description: 'Evaluate how well the system understands and utilizes context in its responses',
      criteria: [
        'Project understanding',
        'Context identification',
        'Clarity seeking',
        'Assumption balance',
        'Next steps anticipation',
        'Dependency awareness',
        'Context retention'
      ],
      scoringGuide: {
        exceptional: [
          'Understands project goals, architecture, and code in detail',
          'Accurately identifies unstated needs',
          'Seeks clarity only when necessary',
          'Balances assumptions and inquiries well',
          'Anticipates the next steps effectively',
          'Considers all related code and dependencies',
          'Retains and applies context effortlessly'
        ],
        good: [
          'Maintains continuity across interactions effortlessly',
          'Retrieves relevant details from codebases proactively',
          'Stays well-aligned with context sources',
          'Recognizes when additional input is required',
          'Applies overarching project patterns with ease',
          'Accounts for dependencies and related code naturally'
        ],
        fair: [
          'Retains core context in discussions',
          'Grasps nearby code details',
          'Needs occasional context updates',
          'Prioritizes immediate tasks',
          'Consider broader impacts minimally'
        ],
        poor: [
          'Has a basic grasp of code context',
          'Frequently needs reminders',
          'Struggles to track history across interactions',
          'Limited awareness of dependencies',
          'Fails to apply broader patterns effectively',
          'Lacks automatic context retrieval',
          'Avoids clarifications, leading to errors'
        ]
      }
    },
    'output-quality': {
      description: 'Assess the quality and reliability of generated outputs',
      criteria: [
        'Requirements fulfillment',
        'Code quality',
        'Standards compliance',
        'Performance optimization',
        'Documentation',
        'Tooling integration',
        'Testing coverage',
        'Maintainability'
      ],
      scoringGuide: {
        exceptional: [
          'Exceeds all functional requirements',
          'Delivers robust, production-ready code',
          'Follows language and project standards perfectly',
          'Optimized for performance and efficiency',
          'Self-explanatory with clear, concise comments',
          'Integrates logging, monitoring, and debugging tools',
          'Covers all cases with thorough testing',
          'Designed for scalability and easy maintenance'
        ],
        good: [
          'Meets all functional requirements',
          'Produces clean, well-organized code',
          'Handles errors and edge cases effectively',
          'Aligns with project standards and style',
          'Optimized for performance',
          'Readable and easy to maintain',
          'Updates relevant code and flags potential issues'
        ],
        fair: [
          'Meets most requirements with a basic approach',
          'Lacks comprehensive error handling',
          'Shows inconsistent pattern usage',
          'Requires refinement for production readiness'
        ],
        poor: [
          'Partially meets functional requirements',
          'Provides a basic, functional implementation',
          'Misses error handling and edge cases',
          'Shows inconsistent structure and style',
          'May have performance concerns',
          'Needs significant improvement for production'
        ]
      }
    },
    'autonomy': {
      description: 'Evaluate the system\'s ability to work independently',
      criteria: [
        'Problem decomposition',
        'Multi-track management',
        'Self-correction',
        'Decision making',
        'Solution enhancement',
        'Escalation balance',
        'Communication'
      ],
      scoringGuide: {
        exceptional: [
          'Effectively divides complex problems into manageable tasks',
          'Juggles multiple development tracks seamlessly',
          'Self-corrects and iterates without needing direction',
          'Makes informed architectural and implementation choices independently',
          'Proactively enhances solutions beyond initial requirements',
          'Balances independence with timely escalation',
          'Communicates progress and decisions clearly'
        ],
        good: [
          'Breaks problems into manageable parts effectively',
          'Coordinates changes across multiple components',
          'Drives progress with minimal supervision',
          'Makes independent, sound technical decisions',
          'Knows when to escalate complex issues',
          'Iterates based on feedback constructively'
        ],
        fair: [
          'Completes multi-step tasks with some autonomy',
          'Can sequence related changes with basic understanding',
          'Needs guidance for major decisions',
          'May struggle without seeking help',
          'Limited proactive decision-making or escalation'
        ],
        poor: [
          'Completes tasks with guidance',
          'Has a basic grasp of task relationships',
          'Limited in making independent decisions',
          'Inconsistent in escalating problems',
          'Minimal ability to solve problems autonomously'
        ]
      }
    }
  },
  acceleration : {
    'iteration-size': {
      description: 'Evaluate the amount of work completed in each iteration',
      criteria: [
        'Production readiness',
        'Feature scope',
        'Documentation and testing',
        'Component management',
        'Request handling',
        'Code quality improvement'
      ],
      scoringGuide: {
        exceptional: [
          'Develops fully production-ready applications',
          'Implements complex features across the full stack and services',
          'Creates thorough tests and documentation for all changes',
          'Manages multiple interconnected components simultaneously',
          'Handles numerous requests and changes efficiently',
          'Proactively refactors and improves code quality during iteration'
        ],
        good: [
          'Develops complete features across multiple files',
          'Manages related dependencies and updates',
          'Handles component-level architectural changes',
          'Effectively manages multiple requests and changes simultaneously',
          'Implements changes successfully, even with complex dependencies and messy code'
        ],
        fair: [
          'Builds complete functions or classes',
          'Manages single-file changes efficiently',
          'Updates direct dependencies',
          'Focused on well-defined, specific tasks'
        ],
        poor: [
          'Offers code completions and suggestions',
          'Generates basic code snippets',
          'Makes small, single-line changes',
          'Focuses on localized modifications',
          'Struggles with multi-part changes'
        ]
      }
    },
    'iteration-speed': {
      description: 'Assess the speed of completing each iteration',
      criteria: [
        'Response time',
        'Change management',
        'Context handling',
        'Solution validation',
        'Feedback provision',
        'Update frequency',
        'Refinement efficiency'
      ],
      scoringGuide: {
        exceptional: [
          'Responds instantly, regardless of complexity',
          'Manages large changes without performance loss',
          'Maintains speed with complex contexts and dependencies',
          'Applies changes and validates solutions with zero latency',
          'Provides immediate feedback and verification',
          'Offers real-time updates and previews',
          'Has an extremely efficient feedback loop for refining changes'
        ],
        good: [
          'Responds quickly for most tasks',
          'Consistent performance with moderate changes',
          'Minimal wait time between iterations',
          'Handles multiple requests efficiently',
          'Maintains speed during extended sessions',
          'Streamlined process for reviewing and adjusting'
        ],
        fair: [
          'Reasonable response times for basic tasks',
          'Some delay with larger changes',
          'Performance drops with complexity',
          'Noticeable processing time between iterations',
          'Evaluating and providing feedback requires effort',
          'Occasional refreshing or manual steps may be needed'
        ],
        poor: [
          'Noticeable latency for simple changes',
          'Long processing times for moderate tasks',
          'Performance struggles with larger contexts',
          'Inefficient review and feedback process',
          'Adjustments take considerable time'
        ]
      }
    },
    'capabilities': {
      description: 'Evaluate the range and depth of available features',
      criteria: [
        'Input support',
        'Development lifecycle',
        'Deployment automation',
        'Quality assurance',
        'Tool integration',
        'Collaboration features'
      ],
      scoringGuide: {
        exceptional: [
          'Supports multi-modal inputs (text, voice, image, video)',
          'Covers the entire software development lifecycle',
          'One-click deployment with infrastructure provisioning',
          'Automates testing and quality assurance',
          'Seamless integration with version control',
          'Advanced collaboration features'
        ],
        good: [
          'Comprehensive coverage of key development phases',
          'Multiple efficient input methods',
          'Streamlined environment management',
          'Built-in deployment functionality',
          'Basic monitoring and logging',
          'Supports test generation and execution',
          'Includes useful productivity tools and shortcuts',
          'Version control integration',
          'Team collaboration features'
        ],
        fair: [
          'Primarily focused on code generation',
          'Supports basic input methods like text and images',
          'Manual environment setup with limited automation'
        ],
        poor: [
          'Limited to core coding functions',
          'Single input method',
          'Manual environment and deployment setup',
          'Minimal additional features',
          'Basic development tools'
        ]
      }
    }
  },
  experience : {
    'flexibility': {
      description: 'Assess adaptability to different scenarios and requirements',
      criteria: [
        'Language and framework support',
        'Integration options',
        'Environment compatibility',
        'Customization',
        'Platform independence'
      ],
      scoringGuide: {
        exceptional: [
          'Comprehensive support for major languages, frameworks, and platforms',
          'Complete code portability and export options',
          'Works across all development environments',
          'Extensive workflow and interaction customization',
          'No vendor lock-in, seamless migration'
        ],
        good: [
          'Strong support for major languages and frameworks',
          'Good selection of extensions and plugins',
          'Easy code export and sharing',
          'Supports a variety of AI models',
          'Works in most development environments',
          'Compatible with common standards',
          'Solid customization options',
          'Growing community support',
          'Mostly platform-independent'
        ],
        fair: [
          'Supports major languages only',
          'Some environment or dependency limitations',
          'Limited code portability',
          'Few AI models with basic settings',
          'Basic customization options',
          'Small but active community',
          'Potential for platform lock-in'
        ],
        poor: [
          'Limited language and framework support',
          'Minimal extensibility',
          'Restricted code portability',
          'Fixed AI model configuration',
          'Specific environment requirements',
          'Few customization options',
          'Platform-dependent features'
        ]
      }
    },
    'ease-of-use': {
      description: 'Evaluate user-friendliness and learning curve',
      criteria: [
        'Accessibility',
        'Interface design',
        'Feature progression',
        'Help system',
        'Documentation quality'
      ],
      scoringGuide: {
        exceptional: [
          'No barriers for complete beginners',
          'Intuitive interface with natural guidance',
          'Sophisticated features for power users without sacrificing simplicity',
          'Intelligent contextual help and suggestions',
          'Makes complex tasks feel effortless'
        ],
        good: [
          'Low barrier for new users',
          'Clear interface with a logical flow',
          'Good balance of basic and advanced features',
          'Supports power-user workflows',
          'Quality documentation and tutorials',
          'Helpful contextual assistance',
          'Smooth learning curve',
          'Enables non-developers to complete basic tasks',
          'Minimal friction points'
        ],
        fair: [
          'Effective for a specific user group with a particular skill level',
          'Solid support for core features',
          'May require technical background or have a steep learning curve',
          'Interface could be oversimplified or overwhelming',
          'Advanced features are limited or challenging to learn',
          'Adequate documentation'
        ],
        poor: [
          'Functions well for a specific use case or skill level',
          'Basic functionality may lack intuitiveness',
          'Learning curve is either too flat or too steep',
          'Limited flexibility for diverse users',
          'Interface is either overly simplified or overly complex',
          'Documentation focuses on a single usage pattern'
        ]
      }
    },
    'reliability': {
      description: 'Assess consistency and dependability of the tool',
      criteria: [
        'Result consistency',
        'System stability',
        'Error handling',
        'Status monitoring',
        'Recovery capabilities'
      ],
      scoringGuide: {
        exceptional: [
          'Predictable, consistent results in all scenarios',
          'Near-perfect uptime and stable performance',
          'Seamless handling of interruptions, even during peak usage',
          'Transparent status monitoring and incident communication',
          'Automatic recovery from most errors',
          'Comprehensive backup and restore capabilities'
        ],
        good: [
          'Consistent and predictable results most of the time',
          'Reliable performance with minimal disruptions',
          'Effective failover mechanisms',
          'Clear error messages with recovery guidance',
          'Smooth version transitions'
        ],
        fair: [
          'Generally solid, but output quality, scope, and speed can vary',
          'Stable overall, with occasional issues',
          'Basic error handling and recovery'
        ],
        poor: [
          'Frequent issues and instability',
          'Poor error handling and recovery',
          'Limited uptime and performance consistency',
          'Lack of transparent status monitoring or incident communication',
          'No automated backup or restoration capabilities'
        ]
      }
    }
  },
  value: {
    'value': {
      description: 'Evaluate overall value proposition and ROI',
      criteria: [
        'Cost effectiveness',
        'Feature accessibility',
        'Pricing transparency',
        'Deployment options',
        'ROI impact',
        'Usage scaling'
      ],
      scoringGuide: {
        exceptional: [
          'Exceptional value for the cost',
          'Generous free tier with a robust feature set',
          'Transparent and predictable pricing',
          'No hidden fees or surprise charges',
          'Support for custom API keys, models, and deployment options',
          'Pay only for what you use',
          'Pricing scales reasonably with usage',
          'No critical features hidden behind paywalls'
        ],
        good: [
          'Fair pricing for the capabilities offered',
          'Generous free tier or trial',
          'Straightforward pricing model',
          'Most key features available in base tiers',
          'Some deployment flexibility',
          'Good value compared to alternatives',
          'Reasonable usage-based scaling',
          'Clear feature differentiation across tiers'
        ],
        fair: [
          'Moderate value for the capabilities provided',
          'Limited free tier or trial',
          'Important features restricted to higher tiers',
          'Pricing may be high for certain use cases',
          'Limited flexibility in resource usage'
        ],
        poor: [
          'Basic functionality offered at a reasonable cost',
          'Limited features in lower tiers',
          'May be outpaced by more cost-effective alternatives',
          'Pricing structure could be more transparent',
          'Some features are overpriced for their utility'
        ]
      }
    }
  }
};

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.primary.main,
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.primary.dark,
  },
  '& .MuiRating-icon': {
    fontSize: '1.5rem',
  }
}));

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`assessment-tabpanel-${index}`}
      aria-labelledby={`assessment-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ScoringGuidelines: React.FC<{ criteriaData: CriteriaData }> = ({ criteriaData }) => {
  const theme = useTheme();
  const [expandedLevel, setExpandedLevel] = useState('exceptional');

  const scoringLevels = [
    {
      level: 'exceptional',
      icon: <CheckIcon />,
      title: 'Exceptional',
      range: '9-10',
      color: theme.palette.success.main,
      criteria: criteriaData.scoringGuide.exceptional
    },
    {
      level: 'good',
      icon: <CircleIcon />,
      title: 'Good',
      range: '7-8',
      color: theme.palette.info.main,
      criteria: criteriaData.scoringGuide.good
    },
    {
      level: 'fair',
      icon: <MinusIcon />,
      title: 'Fair',
      range: '5-6',
      color: theme.palette.warning.main,
      criteria: criteriaData.scoringGuide.fair
    },
    {
      level: 'poor',
      icon: <XIcon />,
      title: 'Poor',
      range: '0-4',
      color: theme.palette.error.main,
      criteria: criteriaData.scoringGuide.poor
    }
  ];

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2
      }}
    >
      <Grid container spacing={3}>
        {scoringLevels.map((level) => (
          <Grid item xs={12} sm={6} md={3} key={level.level}>
            <Stack 
              spacing={2}
              sx={{
                height: '100%',
                borderRight: {
                  xs: 'none',
                  md: level.level !== 'poor' ? `1px solid ${theme.palette.divider}` : 'none'
                },
                pr: { xs: 0, md: 2 }
              }}
            >
              <Stack 
                direction="row" 
                spacing={1} 
                alignItems="center"
                sx={{
                  cursor: 'pointer',
                  opacity: expandedLevel === level.level ? 1 : 0.7,
                  transition: 'opacity 0.2s ease-in-out',
                  '&:hover': { opacity: 1 }
                }}
                onClick={() => setExpandedLevel(level.level)}
              >
                <IconButton 
                  size="small" 
                  sx={{ 
                    color: level.color,
                    p: 0
                  }}
                >
                  {level.icon}
                </IconButton>
                <Stack>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {level.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Score: {level.range}
                  </Typography>
                </Stack>
              </Stack>

              <Stack 
                spacing={1} 
                sx={{ 
                  opacity: expandedLevel === level.level ? 1 : 0.5,
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                {level.criteria.map((criterion, index) => (
                  <Typography 
                    key={index} 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      '&:before': {
                        content: '"•"',
                        color: level.color,
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {criterion}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const AssessmentContent: React.FC<AssessmentContentProps> = ({
  toolDetails,
  category,
  subcategory,
  onScoreSubmit,
  onNavigate,
  onExit,
  navigationState,
  isSubmitting
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [score, setScore] = useState<number | null>(5);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const currentTabs = categoryTabs[category as keyof typeof categoryTabs] || [];

  // Update active tab when subcategory changes
  useEffect(() => {
    const subcategoryIndex = currentTabs.findIndex(
      tab => tab.toLowerCase().replace(/\s+/g, '-') === subcategory
    );
    if (subcategoryIndex !== -1) {
      setActiveTab(subcategoryIndex);
    }
  }, [subcategory, currentTabs]);

  // Reset score and notes when category or subcategory changes
  useEffect(() => {
    setScore(5);
    setNotes('');
  }, [category, subcategory]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const newSubcategoryId = currentTabs[newValue]?.toLowerCase().replace(/\s+/g, '-');
    if (newSubcategoryId) {
      setActiveTab(newValue);
      onNavigate('tab-change');
    }
  };

  const handleScoreChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setScore(newValue);
    setError(null);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleSubmit = () => {
    if (!score) {
      setError('Please provide a score before proceeding');
      return;
    }
    onScoreSubmit(score, notes);
  };

  const handlePrevious = () => {
    if (navigationState.canGoBack) {
      onNavigate('previous');
    }
  };

  const handleNext = () => {
    if (!score) {
      setError('Please provide a score before proceeding');
      return;
    }
    handleSubmit();
  };

  const getCriteriaForTab = (): CriteriaData | null => {
    const categoryData = assessmentCriteria[category as keyof typeof assessmentCriteria];
    if (!categoryData) return null;
    const tabId = currentTabs[activeTab]?.toLowerCase().replace(/\s+/g, '-');
    return categoryData[tabId as keyof typeof categoryData] || null;
  };
  
  return (
    <Paper elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {category.charAt(0).toUpperCase() + category.slice(1)} / {toolDetails.name}
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          {[
            { range: '0-4', status: 'Poor' },
            { range: '5-6', status: 'Fair' },
            { range: '7-8', status: 'Good' },
            { range: '9-10', status: 'Exceptional' }
          ].map(({ range, status }) => (
            <Chip
              key={range}
              label={`${range} (${status})`}
              variant="outlined"
              size="small"
            />
          ))}
        </Stack>
  
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          aria-label="assessment tabs"
        >
          {currentTabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Box>
  
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {currentTabs.map((tab, index) => {
          const criteriaData = getCriteriaForTab();
          return (
            <TabPanel key={index} value={activeTab} index={index}>
              <Stack spacing={4}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {tab} Evaluation
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {criteriaData?.description || `Evaluate the tool's ${tab.toLowerCase()} capabilities`}
                  </Typography>
                </Box>
  
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Score
                  </Typography>
                  <StyledRating
                    max={10}
                    value={score}
                    onChange={handleScoreChange}
                    size="large"
                  />
                  {error && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      {error}
                    </Alert>
                  )}
                </Box>

                <Box sx={{ p: 2 }}>
                  <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center"
                  >
                    <Typography color="text.secondary">
                      Current Score: <strong>{score}</strong> / 10
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {navigationState.canGoBack && (
                        <Button
                          variant="outlined"
                          onClick={handlePrevious}
                          disabled={isSubmitting || !navigationState.canGoBack}
                        >
                          Previous
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                      >
                        {navigationState.isLastSection ? 'Complete Assessment' : 'Next'}
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
  
                {criteriaData?.scoringGuide && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Scoring Guidelines
                    </Typography>
                    <ScoringGuidelines criteriaData={criteriaData} />
                  </Box>
                )}

                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Assessment Notes
                  </Typography>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Add your assessment notes here..."
                    variant="outlined"
                  />
                </Box>
              </Stack>
            </TabPanel>
          );
        })}
      </Box>
  
      <Divider />
  
      <Box sx={{ p: 2 }}>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Typography color="text.secondary">
            Current Score: <strong>{score}</strong> / 10
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => onNavigate('previous')}
              disabled={!navigationState.canGoBack || isSubmitting}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {navigationState.isLastSection ? 'Complete' : 'Next'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AssessmentContent;