import { useEffect } from 'react';
import { Box, Button } from '@mui/material';

type WordInfoProps = {
  word: string | null;
  goBackFunction: Function
}

const WordInfo = ({ word, goBackFunction }: WordInfoProps) => {

  const handleGoBack = () => {
    goBackFunction();
  }

  useEffect(() => {
    // fetch api
  }, [word]);

  return (
    <>
      {word && <Box sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'deepskyblue'
      }}>
        {word}

        <Button onClick={handleGoBack}>Voltar</Button>
      </Box>
      }
    </>
  )
}

export default WordInfo;