import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { experimentalStyled } from '@material-ui/core';
import { ThemeProvider } from 'react-jss';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayoutRoot = {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  };

const DashboardLayoutWrapper = {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  };

const DashboardLayoutContainer = {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
};

const DashboardLayoutContent = {
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
};

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <ThemeProvider theme={DashboardLayoutRoot}>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <ThemeProvider theme={DashboardLayoutWrapper}>
        <ThemeProvider theme={DashboardLayoutContainer}>
          <ThemeProvider theme={DashboardLayoutContent}>
            <Outlet />
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;