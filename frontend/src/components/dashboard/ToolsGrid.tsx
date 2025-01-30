import { useState,useEffect } from 'react';
import {
  Grid,
  Card,
  Typography,
  Radio,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  InfoOutlined as InfoIcon,
  CheckCircleOutline as ActiveIcon,
  Cancel as InactiveIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toolsApi } from '../../api/apiClient';
import { Tool } from '../../api/types';


const ToolsGrid = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState('');
  useEffect(() => {
      const fetchTools = async () => {
          try {
              setLoading(true);
              const response = await toolsApi.getAllTools();
              setTools(response);
          } catch (err) {
              setError('Failed to fetch tools data');
              console.error('Error fetching tools:', err);
          } finally {
              setLoading(false);
          }
      };
      fetchTools();
  }, []);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'success.main';
    if (score >= 70) return 'info.main';
    if (score >= 50) return 'warning.main';
    return 'error.main';
  };

  const handleStartAssessment = () => {
    if (selectedTool) {
      navigate(`/assessment/${selectedTool}`);
    }
  };

  return (
    <Stack spacing={2}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        px={2}
        spacing={1}
      >
        <Typography variant="h5" fontWeight="medium">
          Coding Assistant Tools
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tools.filter(t => t.status === 'active').length} Active Tools
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {tools.map((tool) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={tool.id}
          >
            <Card 
              elevation={selectedTool === tool.id ? 2 : 0}
              onClick={() => setSelectedTool(tool.id)}
              sx={{
                p: { xs: 1.5, sm: 2 },
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: t => `1px solid ${selectedTool === tool.id ? 'primary.main' : 'divider'}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Stack spacing={1.5}>
                <Stack 
                  direction="row" 
                  alignItems="center" 
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Radio
                      checked={selectedTool === tool.id}
                      size={isMobile ? "small" : "medium"}
                      sx={{ p: 0.5 }}
                    />
                    <Typography 
                      variant={isMobile ? "body1" : "subtitle1"} 
                      noWrap
                    >
                      {tool.name}
                    </Typography>
                  </Stack>
                  <Chip
                    icon={tool.status === 'active' ? <ActiveIcon /> : <InactiveIcon />}
                    label={tool.status}
                    size="small"
                    color={tool.status === 'active' ? 'success' : 'default'}
                    variant="outlined"
                    sx={{ 
                      minWidth: 80,
                      display: { xs: 'none', sm: 'flex' }
                    }}
                  />
                </Stack>

                <Stack 
                  direction="row" 
                  alignItems="center" 
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography 
                    variant={isMobile ? "h5" : "h4"}
                    color={tool.status === 'active' ? getScoreColor(tool.assessment.score.total) : 'text.disabled'}
                  >
                    {tool.assessment.score.total > 0 ? tool.assessment.score.total.toFixed(1) : '-'}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={tool.status}
                      size="small"
                      color={tool.status === 'active' ? 'success' : 'default'}
                      variant="outlined"
                      sx={{ 
                        display: { xs: 'flex', sm: 'none' }
                      }}
                    />
                    <Tooltip title={tool.description} placement="top">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                <Stack spacing={1}>
                  {tool.lastAssessment && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        display: { xs: 'none', sm: 'block' }
                      }}
                    >
                      Last assessed: {new Date(tool.lastAssessment).toLocaleDateString()}
                    </Typography>
                  )}
                  <Chip 
                    label={tool.category}
                    size="small"
                    sx={{ alignSelf: 'flex-start' }}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedTool && (
        <Box 
          display="flex" 
          justifyContent="flex-end" 
          px={2}
          sx={{
            position: { xs: 'sticky', md: 'static' },
            bottom: { xs: 16, md: 'auto' },
            zIndex: { xs: 10, md: 1 }
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartAssessment}
            endIcon={<ArrowIcon />}
            sx={{ 
              px: { xs: 3, sm: 4 }, 
              py: { xs: 1, sm: 1.5 },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Start Assessment
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default ToolsGrid;