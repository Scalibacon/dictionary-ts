import { Box, Tabs, Tab, Chip } from '@mui/material';
import { useState, SyntheticEvent } from 'react';

let words = [ 'aaaaaaa', 'bbbbbbb', 'cccccccc', 'dddddddddddddddddddd', 'eeeeeeeee' ]
words = [...words, ...words, ...words, ...words];
words = [...words, ...words, ...words, ...words];

export default function CenteredTabs() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setSelectedTab(newValue);
  };

  const handleOpenWordInfo = (word: string) => {
    
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
            { words.map( (word, index) => (
              <Chip key={index} label={word} sx={{ flex: 1 }}/>
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
    </Box>
  );
}
