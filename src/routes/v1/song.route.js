const express = require('express');
const validate = require('../../middlewares/validate');
const { songValidation } = require('../../validations');
const { SongController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .post(SongController.createSong)
    .get( SongController.getSongs);
    
router
    .route('/stat')
    .get( SongController.getStatistics)
router
    .route('/songbyalbum')
    .get(SongController.getSongByAlbum)

router
    .route('/songbygenre')
    .get(SongController.getSongByGenre)
router
    .route('/songbyartist')
    .get(SongController.getSongByArtist)

router
    .route('/:id')
    .get( SongController.getSong)
    .patch( SongController.updateSongById)
    .delete( SongController.deleteSongById);

module.exports = router;

