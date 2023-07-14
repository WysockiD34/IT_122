const videoGames = [
    {
        title: "Dark Souls 3",
        developer: "FromSoftware",
        release: "March 24, 2016",
        genre: "Action role-playing game"
    },
    {
        title: "Apex Legends",
        developer: "Respawn Entertainment",
        release: "February 4, 2019",
        genre: "First-person shooter, Battle royale"
    },
    {
        title: "Left 4 Dead 2",
        developer: "Valve",
        release: "November 17, 2009",
        genre: "First-person shooter, Horror"
    },
    {
        title: "Elden Ring",
        developer: "FromSoftware",
        release: "February 25, 2022",
        genre: "Action role-playing game"
    },
    {
        title: "God of War",
        developer: "Santa Monica Studio",
        release: "April 20, 2018",
        genre: "Action-adventure game"
    }
];

const getAll = () => {
    return videoGames;
}

const getItem = (title) => {
    return videoGames.find(videoGame => videoGame.title === title);
}

export { getAll, getItem };