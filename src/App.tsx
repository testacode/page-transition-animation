import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { motion, useIsPresent } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import {
  Routes,
  Route,
  Outlet,
  NavLink,
  useLocation,
  useRoutes,
} from 'react-router-dom';

export default function App() {
  const location = useLocation();

  const element = useRoutes([
    {
      path: '/*',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: '*',
          element: <NoMatch />,
        },
      ],
    },
  ]);

  if (!element) return null;

  return (
    <Flex className="app" position="relative" h="100vh" w="100vw">
      <AnimatePresence mode="wait" initial={false}>
        {React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </Flex>
  );
}

function Layout() {
  const isPresent = useIsPresent();

  const handleLinkStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive && 'rgb(49, 130, 206)',
      color: isActive && 'white',
    };
  };

  return (
    <Flex className="layout" h="100vh" w="100vw">
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <Flex
        p={6}
        direction="column"
        borderRight="1px solid #ddd"
        position="fixed"
        h="100vh"
        gap="15px"
        w={1 / 5}
        className="menu-nav"
      >
        <Button as={NavLink} to="/" style={handleLinkStyle}>
          Home
        </Button>
        <Button as={NavLink} to="/about" style={handleLinkStyle}>
          About
        </Button>
        <Button as={NavLink} to="/dashboard" style={handleLinkStyle}>
          Dashboard
        </Button>
        <Button as={NavLink} to="/nothing-here" style={handleLinkStyle}>
          Nothing Here
        </Button>
      </Flex>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Flex
        className="outlet"
        ml="20%"
        p={6}
        w="100%"
        as={motion.article}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 2, ease: 'circIn' } }}
        layout
      >
        <Outlet />
      </Flex>

      {/* A <motion.element> will be used for the transition animation */}
      <Flex
        as={motion.div}
        initial={{ scaleX: 1, backgroundColor: 'rgba(0,107,207,1)' }}
        animate={{
          scaleX: 0,
          transition: { duration: 0.3, ease: 'circIn' },
          backgroundColor: 'rgba(0,107,207,1)',
        }}
        exit={{
          scaleX: 1,
          transition: { duration: 0.3, ease: 'circIn' },
          backgroundColor: 'rgba(0,107,207,1)',
        }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="motion-object"
        position="fixed"
        top="0"
        left="0"
        bottom="0"
        right="0"
        zIndex="2"
      />
    </Flex>
  );
}

function Home() {
  return (
    <Flex>
      <Heading>Home</Heading>
    </Flex>
  );
}

function About() {
  return (
    <Flex>
      <Heading>About</Heading>
    </Flex>
  );
}

function Dashboard() {
  return (
    <Flex>
      <Heading>Dashboard</Heading>
    </Flex>
  );
}

function NoMatch() {
  return (
    <Flex direction="column">
      <Heading>Nothing to see here!</Heading>
      <Text>
        <NavLink to="/">Go to the home page</NavLink>
      </Text>
    </Flex>
  );
}
