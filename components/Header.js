import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';

const StyledButton = styled(Button)`
  margin-left: auto !important;
`;

function Header(props) {
  return (
    <AppBar position={'relative'}>
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Typography variant="h6" color="inherit">
            <a>ABX</a>
          </Typography>
        </Link>
        <Link href="/signup">
          <StyledButton color="inherit">Sign Up</StyledButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
