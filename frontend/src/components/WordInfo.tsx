import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { getToken } from '../auth/auth';

type WordInfoProps = {
  word: string | null;
  goBackFunction: Function
}

type WordInfos = {
  word: string,
  phonetic: string,
  phonetics: any[],
  meanings: any[],  
}

const WordInfo = ({ word, goBackFunction }: WordInfoProps) => {
  const [wordInfo, setWordInfo] = useState<WordInfos | undefined>();

  const handleGoBack = () => {
    goBackFunction();
  }

  const fetchWordInfo = async (word: string) => {
    const response = await fetch(`http://localhost:3333/entries/en/${word}`, {
      headers: {
        'x-access-token': getToken() ?? undefined
      }
    });
    const result = await response.json();

    setWordInfo(result);
  }

  useEffect(() => {
    if(word) fetchWordInfo(word);    
  }, [word]);

  return (
    <>
      {word &&
        <Box sx={{
          padding: '0.7rem',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'white'
        }}>
          <CloseIcon color="primary" onClick={handleGoBack}/>
          
          <Box 
            sx={{ 
              width: '100%', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.7rem',
              border: 'solid 2px rgba(1,1,1,0.3)', position: 'relative'
            }}
          >
            <Box sx={{ position: 'absolute', top: '7px', right: '7px' }}>
              <FavoriteBorderOutlinedIcon/>
              <FavoriteIcon/>
            </Box>

            <Typography>{wordInfo && wordInfo.word}</Typography>
            <Typography>{wordInfo && wordInfo.phonetic}</Typography>
          </Box>
          
          <Typography sx={{ marginTop: '1.3rem', fontWeight: "800", fontSize: '1.5rem'}}>Meanings</Typography>

          <Typography sx={{ marginTop: '0.5rem' }}>{ word }</Typography>

          <Box
            sx={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignIntems: 'center',
              gap: '0.4rem'
            }}
          >
            <Button variant="outlined" onClick={handleGoBack}>Voltar</Button>
            <Button variant="outlined">Próximo</Button>
          </Box>          
        </Box>
      }
    </>
  )
}

export default WordInfo;