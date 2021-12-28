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
  Paper,
  Container,
  ListItemAvatar,
  Box
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import RefreshIcon from '@mui/icons-material/Refresh';
import { mangas } from './components/mangas';

function App() {
  // const [mangaList, setMangaList] = useState(null);

  // useEffect(() => {
  //   fetch('/api/user/1')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMangaList(data.user.mangas)
  //     });
  // }, []);

  // setMangaList(mangas);
  console.log(mangas);

  const updatedMangas = mangas.filter(manga => manga.IsUpdated);
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
          width: 500,
          alignSelf: 'center'
        }}
      >
        <p>Total Updated: {updatedMangas.length}</p>
        {!updatedMangas? <div><HourglassBottomIcon /></div> :
          <List>
            {updatedMangas.filter(manga => manga.IsUpdated ).map((manga, index) =>
                <ListItem
                  key={index}
                  onClick={() => handleClick(manga.Url)}
                >
                  <ListItemAvatar>
                    <Avatar src={manga.ImageUrl} variant='square' />
                  </ListItemAvatar>
                  <ListItemText
                    primary={manga.Title}
                    secondary={
                      <React.Fragment>
                        <span><strong>Latest Chapter:</strong> {manga.LatestChapter}</span><br/>
                        <span><strong>Current Chapter:</strong> {manga.CurrentChapter}</span>
                      </React.Fragment>
                    }
                  />

                </ListItem>
            )}
          </List>}
      </Box>
      <Button><RefreshIcon /> Check Updates</Button>
    </div>
  );
}

export default App;
