import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { MouseEvent, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import NextLink from 'next/link';
import { isAuthenticated, logout } from '../auth/auth';
import { useRouter } from 'next/router';

const settings = ['Favorites', 'History'];

const LoginAvatar = () => {
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    setUserLogged(isAuthenticated());
  }, []);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    logout();

    router.push('/signin');
  }

  return (
    <>
      {userLogged && <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Scali Dev" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <NextLink href="/profile">
            <MenuItem>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
          </NextLink>

          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}

          <MenuItem onClick={handleLogOut}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>}
      {!userLogged &&
        <NextLink href="/signin">
          <Button color="inherit" sx={{ fontWeight: '600' }}>
            Login
          </Button>
        </NextLink>
      }
    </>
  )
}

export default LoginAvatar;