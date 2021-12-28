import './App.scss';
import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Box
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import RefreshIcon from '@mui/icons-material/Refresh';


function App() {
  const [mangaList, setMangaList] = useState(null);

  useEffect(() => {
    fetch('/api/user/1')
      .then((res) => res.json())
      .then((data) => {
        setMangaList(data.user.mangas)
      });
  }, []);

  const handleClick = (url) => {
    window.open(url);
  }

  return (
    <div className="manga-reader-container">
      <h1>Manga Library</h1>
      <Box
        sx={{
          alignSelf: 'center'
        }}
      >
        <TextField type="text" label="Search"></TextField>
        <IconButton>
          <SortIcon />
        </IconButton>
        <IconButton>
          <FilterAltIcon />
        </IconButton>
      </Box>
      <Button><AddIcon /> Add New</Button>
      <Box
        sx={{
          width: 300,
          alignSelf: 'center'
        }}
      >
        {!mangaList ? <div><HourglassBottomIcon /></div> :
          <List>
            {mangaList.map((manga, index) =>
              <ListItem 
                alignItems="center" 
                key={index}
                onClick={() => handleClick(manga.url)}
              >
                <ListItemAvatar>
                  <Avatar src={manga.thumbnail} variant='square'/>
                </ListItemAvatar>
                <ListItemText
                  primary={manga.title}
                  secondary={
                    <React.Fragment>
                      {manga.latestChapter}
                    </React.Fragment>
                  }
                />
              </ListItem>
            )}
          </List>}
      </Box>
      <Button><RefreshIcon/> Check Updates</Button>
    </div>
  );
}

export default App;
