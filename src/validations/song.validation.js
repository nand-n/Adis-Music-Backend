const Joi = require('joi');

const createSong = Joi.object({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    album: Joi.string().required(),
    genre: Joi.string().required(),
  });

module.exports = {
    createSong
};
