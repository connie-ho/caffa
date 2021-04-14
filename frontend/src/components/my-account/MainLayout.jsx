// import { Outlet } from 'react-router-dom';
import MainNavbar from './MainNavBar.jsx';
import './MainLayout.scss'
import { ThemeProvider } from 'react-jss';
import { white } from 'chalk';


const MainLayoutRoot = {
    backgroundColor: white,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  };

const MainLayoutWrapper = {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64
};

const MainLayoutContainer = {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
};

const MainLayoutContent ={
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
};


const MainLayout = () => (
  <ThemeProvider theme={MainLayoutRoot} >
    <MainNavbar />
    <ThemeProvider theme={MainLayoutWrapper} >
      <ThemeProvider theme={MainLayoutContainer} >
        <ThemeProvider theme={MainLayoutContent} >
          {/* <Outlet /> */}
        </ThemeProvider>
      </ThemeProvider>
    </ThemeProvider>
  </ThemeProvider>
);

export default MainLayout;