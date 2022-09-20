import { Box, Tabs, Tab, Chip } from '@mui/material';
import { useState, SyntheticEvent, useEffect, useCallback } from 'react';
import WordInfo from './WordInfo';

let words = ['aaaaaaa', 'bbbbbbb', 'cccccccc', 'dddddddddddddddddddd', 'eeeeeeeee']
words = [...words, ...words, ...words, ...words];
words = [...words, ...words, ...words, ...words];

export default function CenteredTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [wordList, setWordList] = useState<string[]>([]);

  const fetchWordList = useCallback(async () => {
    const response = await fetch(`http://localhost:3333/entries/en?limit=${limit}&page[${page}]`);
    const result = await response.json();

    setWordList(prevList => [...prevList, ...result.results]);
    console.log(result);
  }, [limit, page]);

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setSelectedTab(newValue);
  };

  const handleOpenWordInfo = (word: string) => {
    setSelectedWord(word);
  }

  useEffect(() => {
    fetchWordList();
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
            color: 'white',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.2rem'
          }}>
            {wordList.map((word, index) => (
              <Chip key={index} label={word} sx={{ flex: 1 }} onClick={e => handleOpenWordInfo(word)} />
            ))}
          </Box>
        }

        {selectedTab === 1 &&
          <Box sx={{ pt: '0.7rem', background: 'purple', color: 'white' }}>sou 2</Box>
        }

        {selectedTab === 2 &&
          <Box sx={{ pt: '0.7rem', background: 'orange', color: 'white' }}>sou 3</Box>
        }
      </Box> 

      <WordInfo word={selectedWord} goBackFunction={() => setSelectedWord(null) }/>     
    </Box>
  );
}
