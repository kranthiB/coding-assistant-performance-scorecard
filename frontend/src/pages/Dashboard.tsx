import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme
} from '@mui/material';
import ToolsGrid from '../components/dashboard/ToolsGrid';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import { useAssessment } from '../context/AssessmentContext';

interface DashboardStats {
  totalTools: number;
  activeTools: number;
  averageScore: number;
  lastAssessment: string | null;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { state } = useAssessment();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalTools: 0,
    activeTools: 0,
    averageScore: 0,
    lastAssessment: null
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulating API call for dashboard data
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Calculate dashboard statistics
        const calculatedStats: DashboardStats = {
          totalTools: 10,
          activeTools: 7,
          averageScore: 84.5,
          lastAssessment: new Date().toISOString()
        };

        setStats(calculatedStats);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setNotification({
          open: true,
          message: 'Error loading dashboard data. Please try again later.',
          severity: 'error'
        });
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 'calc(100vh - 64px)' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Performance Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and assess coding assistant tools performance
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: 'Total Tools',
            value: stats.totalTools,
            color: theme.palette.primary.main
          },
          {
            title: 'Active Tools',
            value: stats.activeTools,
            color: theme.palette.success.main
          },
          {
            title: 'Average Score',
            value: `${stats.averageScore}%`,
            color: theme.palette.info.main
          },
          {
            title: 'Last Assessment',
            value: stats.lastAssessment 
              ? new Date(stats.lastAssessment).toLocaleDateString()
              : 'N/A',
            color: theme.palette.warning.main
          }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  boxShadow: theme.shadows[2]
                }
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {stat.title}
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ color: stat.color, fontWeight: 'medium' }}
              >
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      *}
      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ToolsGrid />
        </Grid>
        <Grid item xs={12}>
          <PerformanceChart />
        </Grid>
      </Grid>

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleNotificationClose} 
          severity={notification.severity}
          elevation={6}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;