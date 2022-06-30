import React, { Fragment } from 'react'
import { Box } from "@mui/system"
import { AppBar, Toolbar, Typography } from '@mui/material';
import ChatIcon from "@mui/icons-material/Chat"

const Bar = () => {
  return (
    <Fragment>
      <Box mb={4}>
        <AppBar position='static'>
          <Toolbar>
            <Box mr={2}>
              <ChatIcon fontSize={'large'} />
            </Box>
            <Typography variant="h6">
              React Chat app
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  )
}

export default Bar;