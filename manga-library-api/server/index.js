const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const mangas = [
    {
        id: 1,
        title: 'BJ Alex',
        thumbnail: null,
        url: 'https://www.mangago.me/read-manga/bj_alex/',
        latestChapter: 'ch 47',
        latestUpdated: '12/17/2021'
    },
    {
        id: 2,
        title: 'Under the Greenlight',
        thumbnail: null,
        url: 'https://www.mangago.me/read-manga/under_the_green_light/',
        latestChapter: 'ch 47',
        latestUpdated: '12/17/2021'
    },
    {
        id: 3,
        title: 'Cherry Blossoms After Winter',
        thumbnail: "https://i2.mangapicgallery.com/r/coverlink/rROHYYKHa8HlWy3U7kHm8eI5JAZfMCdioYbozUncwmDVB-N.jpg?4",
        url: 'https://www.mangago.me/read-manga/cherry_blossoms_after_winter/',
        latestChapter: 'ch 47',
        latestUpdated: '12/17/2021'
    },
]

app.get("/api/mangas", (req, res) =>{
    res.json({ mangas });
});

app.get("/api/manga/:id", (req, rest) =>{
    const manga = manga.find(id => req.params.id);
    res.json({ manga });
})


app.get("/api/status", (req, res) => {
    res.json({
       status: [
           { id: 1, status: 'To Read'},
           { id: 2, status: 'On-going'},
           { id: 3, status: 'Dropped'},
           { id: 4, status: 'Completed'},
       ] 
    })
});

app.get("/api/user/:id", (req, res) =>{
    const users = [
        { id: 1, 
          mangas: [
              { mangaId: 3, currentCh: 'ch 3', statusId: 2, addedDate: '12/27/2021', favorited: false, upToDate: false },
              { mangaId: 1, currentCh: 'ch 45', statusId: 2, addedDate: '12/01/2021', favorited: false, upToDate: true }
          ]
        }
    ]

    const user = users.find( u => u.id == req.params.id);
    const mangaInfoList = user.mangas.map( userManga => {
        const mangaInfo = mangas.find(manga => manga.id == userManga.mangaId);

        return { ...userManga, ...mangaInfo};
    })

    user.mangas = mangaInfoList;

    
    res.json({ user });
});