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
import { DataGrid } from '@mui/x-data-grid';

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

  var updatedMangas = mangas.filter(manga => manga.isUpdated);
  const [ rows, setRows ] = useState(updatedMangas);
  const columns = [
    { field: 'imageUrl', headerName: 'Image', width: 200, renderCell: (params) => <img src={params.value} width="100"/>},
    { field: 'title', headerName: 'Title', width: 300, renderCell: (params) => <strong>{params.value}</strong>},
    { field: 'currentChapter', headerName: 'Current Chapter', width: 150},
    { field: 'latestChapter', headerName: 'Latest Chapter', width: 150},
    { field: 'completed', headerName: 'New Chapters to Read', width: 300, renderCell: (params) => <Button>Complete</Button>}
  ]

  const handleClick = (url) => {
    window.open(url);
  }

  const handleCellClick = (param, event) => {
    if (param.field === 'title') {
      window.open(param.row.url);
    }
    if (param.field === 'completed') {
      const index = rows.findIndex(m => m.id == param.id);
      
      setRows(() => {
        return [
          ...rows.slice(0, index),
          ...rows.slice(index + 1)
        ]
      });
    }
  }

  return (
    <div className="manga-reader-container">
      <h1>Manga Library</h1>
      <Box
        sx={{
          alignSelf: 'center'
        }}
      >
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
          width: 1000,
          height: 1000,
          alignSelf: 'center'
        }}
      >
        {/* <p>Total Updated: {updatedMangas.length}</p> */}
        { !updatedMangas? <div><HourglassBottomIcon/></div> :
          <DataGrid 
            onCellClick={handleCellClick}
            rows={rows} 
            columns={columns}/>
        }
        {/* {!updatedMangas? <div><HourglassBottomIcon /></div> :
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
          </List>} */}
      </Box>
      <Button><RefreshIcon /> Check Updates</Button>
    </div>
  );
}

export default App;
