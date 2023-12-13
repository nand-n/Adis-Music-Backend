const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { SongService } = require('../services');

// Create a song
const createSong = catchAsync(async (req, res) => {
    const song = await SongService.createSong(req.body);
    res.status(httpStatus.CREATED).send(song);
});

// List all songs
const getSongs = catchAsync(async (req, res) => {
    const result = await SongService.querySongs();
    res.send(result);
});
//List Songs Bt album
const getSongByAlbum=catchAsync(async (req,res)=>{
    const result = await SongService.querySongsByAlbum()
    res.send(result)
})
//List Songs Bt album
const getSongByArtist=catchAsync(async (req,res)=>{
    const result = await SongService.querySongsByArtist()
    res.send(result)
})
//List Songs Bt album
const getSongByGenre=catchAsync(async (req,res)=>{
    const result = await SongService.querySongsByGenre()
    res.send(result)
})
//Fetch Single Song
const getSong = catchAsync(async (req, res) => {
    const result = await SongService.getSongById(req.params.id);
    if (!result) {
        throw new ApiError(400, 'Song not found');
    }
    res.status(200).json({
        status: "Success",
        data: result
    });
});
//Get Statistics
const getStatistics =catchAsync(async (req, res) => {
    const result = await SongService.getStatistics();
    res.status(200).json({
        status: "Success",
        data: result
    });
});

//Update  a song
const updateSongById = catchAsync(async (req, res) => {
    const result = await SongService.updateSongById(req.params.id, req.body);
    res.status(200).send(result);

});
//Delete Song By ID
const deleteSongById = catchAsync(async (req, res) => {
    const result = await SongService.deleteSongById(req.params.id);
    res.status(200).send(result);
});

module.exports = {
    createSong,
    getSongs,
    getSong,
    updateSongById,
    deleteSongById,
    getStatistics,
    getSongByAlbum,
    getSongByArtist,
getSongByGenre
};
