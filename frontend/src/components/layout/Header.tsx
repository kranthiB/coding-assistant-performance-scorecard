import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Settings as SettingsIcon,
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1e3a5f',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 40
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1)
}));

const iconButtonStyles = {
  '&:hover': { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
  }
};

interface HeaderProps {
  userName?: string;
  userImage?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={handleLogoClick}
        >
          <LogoContainer>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              Ai
            </Typography>
          </LogoContainer>

          {!isMobile && (
            <Box>
              <Typography variant="subtitle1" sx={{ color: 'white', lineHeight: 1.2 }}>
                Coding Assistant
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                Performance Scorecard
              </Typography>
            </Box>
          )}
        </Stack>

        <IconContainer>
          <IconButton 
            color="inherit" 
            size="small"
            sx={iconButtonStyles}
          >
            <SettingsIcon />
          </IconButton>
          
          <IconButton 
            color="inherit" 
            size="small"
            sx={iconButtonStyles}
          >
            <NotificationsIcon />
          </IconButton>
          
          <IconButton 
            color="inherit" 
            size="small"
            sx={iconButtonStyles}
          >
            <SearchIcon />
          </IconButton>

          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center" 
            sx={{ ml: 2 }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                bgcolor: 'primary.dark'
              }}
            >
              <PersonIcon sx={{ fontSize: 20 }} />
            </Avatar>
          </Stack>
        </IconContainer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;