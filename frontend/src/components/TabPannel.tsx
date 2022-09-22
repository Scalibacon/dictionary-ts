import { Box, Tabs, Tab, Chip, Typography } from '@mui/material';
import { useState, SyntheticEvent, useEffect, useCallback } from 'react';
import { getToken } from '../auth/auth';
import WordInfo from './WordInfo';

type WordHistoryType = {
  user_id: string,
  word: string,
  added: Date
}

export default function CenteredTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [wordList, setWordList] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<WordHistoryType[] | undefined>();
  const [wordHistory, setWordHistory] = useState<WordHistoryType[] | undefined>();

  const fetchWordList = useCallback(async () => {
    const response = await fetch(`http://localhost:3333/entries/en?limit=${limit}&page[${page}]`);
    const result = await response.json();

    if (!Array.isArray(result.results)) return;

    setWordList(prevList => [...prevList, ...result.results]);
  }, [limit, page]);

  const fetchHistory = async () => {
    const token = getToken();
    if (!token) return;

    const response = await fetch(`http://localhost:3333/user/me/history`, {
      headers: {
        'x-access-token': getToken() ?? undefined
      }
    });
    const result = await response.json();

    if (!Array.isArray(result)) return;

    setWordHistory(prevList => result);
  }

  const fetchFavorites = async () => {
    const token = getToken();
    if (!token) return;

    const response = await fetch(`http://localhost:3333/user/me/favorites`, {
      headers: {
        'x-access-token': getToken() ?? undefined
      }
    });
    const result = await response.json();

    if (!Array.isArray(result)) return;

    setFavorites(prevList => result);
  }

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setSelectedTab(newValue);
  };

  const handleOpenWordInfo = (word: string) => {
    setSelectedWord(word);
  }

  const handleGoBack = () => {
    setSelectedWord(null);

    fetchHistory();
    fetchFavorites();
  }

  useEffect(() => {
    fetchWordList();
    fetchHistory();
    fetchFavorites();
  }, [fetchWordList]);

  return (
    <Box sx={{ flex: 1, bgcolor: 'background.paper' }}>
      <Tabs value={selectedTab} onChange={handleChangeTab} centered>
        <Tab label="Word List" />
        <Tab label="Favorites" />
        <Tab label="History" />
      </Tabs>

      <Box>
        {selectedTab === 0 &&
          <Box sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            pt: '0.7rem',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {wordList.map((word, index) => (
              <Chip key={index} label={word} sx={{ flex: 1, borderRadius: 0, border: 'solid 1px rgba(1,1,1,0.2)' }} onClick={e => handleOpenWordInfo(word)} />
            ))}
          </Box>
        }

        {selectedTab === 1 &&
          <Box sx={{ 
            pt: '0.7rem',
            maxHeight: '300px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
         }}>
            {favorites === undefined &&
              <Typography>Log in to see your favorites</Typography>
            }

            {favorites && favorites.map((wordFav, index) => (
              <Chip key={index} label={wordFav.word} sx={{ borderRadius: 0, border: 'solid 1px rgba(1,1,1,0.2)' }} onClick={e => handleOpenWordInfo(wordFav.word)} />
            ))}
          </Box>
        }

        {selectedTab === 2 &&
          <Box sx={{ 
            pt: '0.7rem',
            maxHeight: '300px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
         }}>
            {wordHistory === undefined &&
              <Typography>Log in to see your history</Typography>
            }

            {wordHistory && wordHistory.map((wordHist, index) => (
              <Chip key={index} label={wordHist.word} sx={{ borderRadius: 0, border: 'solid 1px rgba(1,1,1,0.2)' }} onClick={e => handleOpenWordInfo(wordHist.word)} />
            ))}
          </Box>
        }
      </Box>

      <WordInfo word={selectedWord} goBackFunction={handleGoBack} />
    </Box>
  );
}
