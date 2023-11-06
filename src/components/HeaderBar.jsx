// HOOKS
import { useContext, useState } from 'react';

// CONTEXT
import { AuthContext } from '../context/AuthContext';

// LIB
import { stringAvatar } from '../lib';

// MUI
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Box, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

export default function HeaderBar({ disabled, searchValue, setSearchValue, handleSearchClients, setIsCreateModalOpen, title }) {

  const { userState } = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createVisitHandler = () => {
    setIsCreateModalOpen(true)
  }
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: 'space-between' }}>
        <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={createVisitHandler}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6" component="div" >
            {title}
          </Typography>
        </Box>
        <Search
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
          handleSearchClients(e.target.value)
          }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
           disabled={disabled}
            value={searchValue}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          {userState && (
            <Box sx={{ m: 1 }}>
              <Avatar onClick={handleMenu} {...stringAvatar(`${userState.firstName} ${userState.lastName}`)} />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Menu>

            </Box>
          )}
          {userState && <Typography>{`${userState.firstName} ${userState.lastName}`}</Typography>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}