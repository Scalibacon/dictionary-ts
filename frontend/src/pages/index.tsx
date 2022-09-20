import Header from '../components/Header';
import TabPannel from '../components/TabPannel';
import { Box, Container } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <Header />
      <Container maxWidth="xl" sx={{ pt: '1rem'}}>
        <TabPannel />
      </Container>
    </Box>
  )
}
