import {
  Box,
  Container,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  useScrollTrigger,
  Zoom,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import { loremIpsum } from 'lorem-ipsum';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { AppMenu } from '../components/AppMenu';
import { UserIcon } from '../components/UserIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  console.log('win', window);
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    // console.log('tyt', document, event.target.ownerDocument);

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export const ChatPage = (props) => (
  <Box>
    <AppMenu greeting="Hello, User">
      <UserIcon />
    </AppMenu>
    <Box my={1} height="110vh" overflow="scroll">
      <Toolbar id="back-to-top-anchor" />
      <List>
        {[...new Array(102)]
          .map(
            (item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary={loremIpsum()} />
              </ListItem>
            ),
          )}
      </List>
    </Box>
    <ScrollTop {...props}>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  </Box>
);