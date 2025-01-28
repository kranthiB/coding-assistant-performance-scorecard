import React, { useState } from 'react';
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
  useMediaQuery
} from '@mui/material';
import {
  InfoOutlined as InfoIcon,
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

interface PerformanceData {
  id: string;
  name: string;
  total: number;
  intelligence: number;
  acceleration: number;
  experience: number;
  value: number;
}

interface BarConfig {
  dataKey: string;
  name: string;
  fill: string;
  stackId?: string;
  maxValue?: number;
}

const performanceData: PerformanceData[] = [
  {
    id: 'github',
    name: 'GitHub',
    total: 98,
    intelligence: 29.5,
    acceleration: 29,
    experience: 30,
    value: 9.5
  },
  {
    id: 'codiumai',
    name: 'CodiumAI',
    total: 96.7,
    intelligence: 29,
    acceleration: 29,
    experience: 29,
    value: 9.7
  },
  {
    id: 'googlecloud',
    name: 'Google Cloud',
    total: 96.4,
    intelligence: 29,
    acceleration: 29.4,
    experience: 28.5,
    value: 9.5
  },
  {
    id: 'tencentcloud',
    name: 'Tencent Cloud',
    total: 85,
    intelligence: 25,
    acceleration: 25.5,
    experience: 26,
    value: 8.5
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    total: 78,
    intelligence: 24,
    acceleration: 23,
    experience: 23.5,
    value: 7.5
  },
  {
    id: 'codeium',
    name: 'Codeium',
    total: 65,
    intelligence: 20,
    acceleration: 19,
    experience: 19.5,
    value: 6.5
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    total: 58.6,
    intelligence: 18,
    acceleration: 17.6,
    experience: 17.5,
    value: 5.5
  }
].sort((a, b) => b.total - a.total);

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

type ViewMode = 'total' | 'detailed';

const PerformanceChart: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [viewMode, setViewMode] = useState<ViewMode>('total');

  const handleViewModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: ViewMode | null) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const getBarData = (): BarConfig[] => {
    if (viewMode === 'total') {
      return [{ dataKey: 'total', name: 'Total', fill: theme.palette.primary.main }];
    }
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
              onChange={handleViewModeChange}
              size="small"
            >
              <ToggleButton value="total">
                Total Score
              </ToggleButton>
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
                right: viewMode === 'total' ? 120 : 150, 
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
              {viewMode === 'detailed' && (
                <Legend 
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  wrapperStyle={{ paddingLeft: '10px' }}
                />
              )}
              {getBarData().map((bar) => (
                <Bar
                  key={bar.dataKey}
                  dataKey={bar.dataKey}
                  name={bar.name}
                  fill={bar.fill}
                  radius={viewMode === 'total' ? [0, 4, 4, 0] : 0}
                  barSize={20}
                  stackId={bar.stackId}
                >
                  {viewMode === 'total' && (
                    <LabelList 
                      content={renderCustomBarLabel}
                      fill={theme.palette.text.secondary}
                    />
                  )}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Performance scores are calculated based on Intelligence (30 points), Acceleration (30 points), Experience (30 points), and Value (10 points) metrics, totaling a maximum of 100 points. 
          Toggle between total and component views to see the detailed breakdown of scores across different assessment criteria.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default PerformanceChart;