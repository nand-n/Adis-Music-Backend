const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Song = require('../models/song.model');

const createSong = async (body) => {
    console.log(body);
    try {
        const song = new Song(body);
    return await song.save() 
    } catch (error) {
        throw new ApiError(400, 'Error creating song', error);    }
    
};
const querySongs = async () => {
    try {
        const songs = await Song.find();
        return songs
    } catch (error) {
        throw new ApiError(400, 'Error fetching songs', error); 
       }
};

const querySongsByAlbum =async ()=>{
  try {
    const result = await Song.aggregate([
      {
        $group: {
          _id: '$album',
          songs: { $push: '$$ROOT' }, // Push the entire song document to the songs array
        },
      },
    ]);

    // Map the result to create an array of objects with albumTitle and songs
    const albumsAndSongs = result.map(({ _id, songs }) => ({
      albumTitle: _id,
      songs,
    }));

    return albumsAndSongs;
  } catch (error) {
    throw new ApiError(400, 'Error fetching songs per album', error); 
    
  }
}

const querySongsByArtist = async () => {
  try {
    // Use the `aggregate` method to group songs by artist
    const result = await Song.aggregate([
      {
        $group: {
          _id: '$artist',
          songs: { $push: '$$ROOT' }, // Push the entire song document to the songs array
        },
      },
    ]);

    // Map the result to create an array of objects with artistName and songs
    const artistsAndSongs = result.map(({ _id, songs }) => ({
      artistName: _id,
      songs,
    }));

    return artistsAndSongs;
  } catch (error) {
    // Throw an ApiError if there's an error fetching songs by artist
    throw new ApiError(400, 'Error fetching songs by artist', error);
  }
};

const querySongsByGenre = async () => {
  try {
    // Use the `aggregate` method to group songs by genre
    const result = await Song.aggregate([
      {
        $group: {
          _id: '$genre',
          songs: { $push: '$$ROOT' }, // Push the entire song document to the songs array
        },
      },
    ]);

    // Map the result to create an array of objects with genreName and songs
    const genresAndSongs = result.map(({ _id, songs }) => ({
      genreName: _id,
      songs,
    }));

    return genresAndSongs;
  } catch (error) {
    // Throw an ApiError if there's an error fetching songs by genre
    throw new ApiError(400, 'Error fetching songs by genre', error);
  }
};


const getSongById = async (id) => {
    try {
        const song = await Song.findById(id);
        return song
      } catch (error) {
        throw new ApiError(400, 'Song fetching fail!', error);
      }};

const getStatistics = async () => {
    try {
      const totalSongs = await Song.countDocuments();

    const totalArtists = await Song.aggregate([
      { $group: { _id: null, artists: { $addToSet: '$artist' } } },
      { $project: { count: { $size: '$artists' } } }
    ]);

    const totalGenres = await Song.aggregate([
      { $group: { _id: null, genres: { $addToSet: '$genre' } } },
      { $project: { count: { $size: '$genres' } } }
    ]);

    const totalAlbums = await Song.aggregate([
      { $group: { _id: null, albums: { $addToSet: '$album' } } },
      { $project: { count: { $size: '$albums' } } }
    ]);

    const songsPerGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } }
    ]);

    const songsPerArtist = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } }
    ]);

    const songsPerAlbum = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } }
    ]);

    return {
      totalSongs,
      totalArtists: totalArtists[0]?.count || 0,
      totalAlbums: totalAlbums[0]?.count || 0,
      totalGenres: totalGenres[0]?.count || 0,
      songsPerGenre,
      songsPerArtist,
      songsPerAlbum,
    };
      } catch (error) {
        throw new ApiError(400, 'Song statistics fetching', error);
      }};
const updateSongById = async (id, updateBody) => {
   try {
    const updatedSong = await Song.findByIdAndUpdate(id, updateBody, { new: true });
    return updatedSong;

   } catch (error) {
    throw new ApiError(400, 'Song with the given id found');
   }
   
};

const deleteSongById = async (id) => {
    try {
    const deletedSong = await Song.findOneAndDelete({_id :id});
    if (!deletedSong) {
        throw new ApiError(httpStatus.NOT_FOUND ,"Song not found!");
      }
    return deletedSong;
        
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR ,`Error deleting song + ${error.message}`);
    }
    
};

module.exports = {
    createSong,
querySongs,
getSongById,
updateSongById,
deleteSongById,
getStatistics,
querySongsByAlbum,
querySongsByArtist,
querySongsByGenre
};