import React, { useState, useEffect} from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  Tooltip as MuiTooltip,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  InfoOutlined as InfoIcon,
  RefreshOutlined as RefreshIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Legend,
  Tooltip,
} from 'recharts';
import { toolsApi } from '../../api/apiClient';
import { PerformanceData, BarConfig } from '../../api/types';

const renderCustomTooltip = (props: any) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Paper sx={{ p: 2, boxShadow: 2 }}>
        <Stack spacing={1}>
          <Typography variant="subtitle2">{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</Typography>
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              Total Score: {data.total.toFixed(1)}/100
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Intelligence: {data.intelligence.toFixed(1)}/30
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Acceleration: {data.acceleration.toFixed(1)}/30
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Experience: {data.experience.toFixed(1)}/30
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Value: {data.value.toFixed(1)}/10
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    );
  }
  return null;
};

const renderCustomBarLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width + 5}
      y={y + 15}
      fill="#666"
      textAnchor="start"
      fontSize={12}
      fontWeight={500}
    >
      {value.toFixed(1)}
    </text>
  );
};

type ViewMode = 'detailed';

const PerformanceChart: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [viewMode] = useState<ViewMode>('detailed');
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformanceData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await toolsApi.performance();
      setPerformanceData(data.sort((a, b) => b.total - a.total));
    } catch (err) {
      setError('Failed to load performance data. Please try again.');
      console.error('Error fetching performance data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const handleRefresh = () => {
    fetchPerformanceData();
  };

  const getBarData = (): BarConfig[] => {
    return [
      { 
        dataKey: 'intelligence', 
        name: 'Intelligence (30)',
        fill: theme.palette.success.main, 
        stackId: 'stack',
        maxValue: 30
      },
      { 
        dataKey: 'acceleration', 
        name: 'Acceleration (30)',
        fill: theme.palette.info.main, 
        stackId: 'stack',
        maxValue: 30
      },
      { 
        dataKey: 'experience', 
        name: 'Experience (30)',
        fill: theme.palette.warning.main, 
        stackId: 'stack',
        maxValue: 30
      },
      { 
        dataKey: 'value', 
        name: 'Value (10)',
        fill: theme.palette.error.main, 
        stackId: 'stack',
        maxValue: 10
      }
    ];
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 3, m: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, m: 2 }}>
        <Alert 
          severity="error" 
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={handleRefresh}
            >
              <RefreshIcon />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        m: 2, 
        bgcolor: 'background.default',
        height: '100%' 
      }}
    >
      <Stack spacing={3}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Typography variant="h5" fontWeight="medium">
            Performance Overview
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              size="small"
            >
              <ToggleButton value="detailed">
                Component Scores
              </ToggleButton>
            </ToggleButtonGroup>
            
            <MuiTooltip title="Performance metrics across different assessment criteria">
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </MuiTooltip>
          </Stack>
        </Stack>

        <Box sx={{ width: '100%', height: isMobile ? 500 : 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={performanceData}
              layout="vertical"
              margin={{ 
                top: 20, 
                right: 150, 
                left: 120, 
                bottom: 5 
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={renderCustomTooltip} />
              <Legend 
                verticalAlign="middle"
                align="right"
                layout="vertical"
                wrapperStyle={{ paddingLeft: '10px' }}
              />
              {getBarData().map((bar) => (
                <Bar
                  key={bar.dataKey}
                  dataKey={bar.dataKey}
                  name={bar.name}
                  fill={bar.fill}
                  radius={0}
                  barSize={20}
                  stackId={bar.stackId}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Performance scores are calculated based on Intelligence (30 points), Acceleration (30 points), Experience (30 points), and Value (10 points) metrics, totaling a maximum of 100 points. 
          The chart shows the detailed breakdown of scores across different assessment criteria.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default PerformanceChart;