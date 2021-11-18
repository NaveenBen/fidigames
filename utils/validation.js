const Joi = require('@hapi/joi');

const gameSchema = Joi.object({
    game_name: Joi.string().min(3).max(20).required(),
    game_description: Joi.string().min(3).max(100).required(),
    game_url: Joi.string().min(3).max(100).required(),
    game_image_url: Joi.string().min(3).max(100).required(),
    game_minp: Joi.number().min(1).max(10).required(),
    game_maxp: Joi.number().min(1).max(20).required(),
    game_category: Joi.string().min(3).max(20).required(),
});

const userSchema = Joi.object({
        user_fname: Joi.string().min(3).max(20),
        user_sname: Joi.string().min(3).max(20),
        user_username: Joi.string().min(3).max(20).required(),
        user_password: Joi.string().min(3).max(20).required(),
 });
module.exports = {gameSchema, userSchema};