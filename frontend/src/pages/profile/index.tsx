import nookies from 'nookies';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DraftsIcon from '@mui/icons-material/Drafts';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Header from "../../components/Header";
import { GetServerSideProps, NextPage } from 'next';
import { TOKEN_KEY } from '../../auth/auth';

type ProfileProps = {
  name: string,
  user_id: string,
  email: string
}

const Profile: NextPage<ProfileProps> = ({
  name, user_id, email
}: ProfileProps) => {
  return (
    <>
      <Header />

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FingerprintIcon />
                </ListItemIcon>
                <ListItemText primary={user_id} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />        
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const response = await fetch('http://localhost:3333/user/me', {
    headers: {
      'x-access-token': cookies[TOKEN_KEY] ?? ''
    }
  });
  const result = await response.json();

  return {
    props: {
      user_id: result.user_id,
      name: result.name,
      email: result.email
    }
  }
}

export default Profile;