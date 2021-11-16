const express = require('express');
const routing = express.Router();
const gamedataController = require('../controllers/controller.js');

/**
 * @swagger
 * /games:
 *      get:
 *        summary: Get all games
 *        description: Returns all the game cards with more like on top
 *        responses:
 *         '200':
 *           description: A successful response with all the game data
 */
routing.get('/games', gamedataController.getAllGameData);
/**
 * @swagger
 * /login:
 *    post:
 *       summary: Login
 *       description: Returns the user data if the login is successful
 *       parameters:
 *       - in: body
 *         example:
 *          uname: "neo"
 *          upasswd: "matrix"
 *         required: true
 *       responses:
 *          '200':
 *             description: A successful response with the user logged in msg
 *             
 */
routing.post('/login',gamedataController.login);
/**
 * @swagger
 * /games/add:
 *          post:
 *             summary : add new games
 *             description : "add new games"
 *             parameters:
 *             - in: "body"
 *               name: " game card object"
 *               required: true
 *               example:
 *                   game_name: "Call of Duty"
 *                   game_description: "Call of Duty"
 *                   game_image_url: "http://cod.game/image.png"
 *                   game_url: "http://cod.game"
 *                   game_minp: "1"
 *                   game_maxp: "2"
 *                   game_category: "FPS"        
 *             responses:
 *               '200':
 *                   description: A successful response with all the added game data. 
 *               
 */
routing.post('/games/add',gamedataController.addGame);
/**
 * @swagger
 * /games/{id}:
 *          get:
 *             summary : get a game by id
 *             description : "acessess a game card through its id"
 *             parameters:
 *             - in: "path"
 *               name: "id" 
 *               required: true
 *               example: "1"  
 *             responses:
 *               '200':
 *                   description: A successful response with the game data for that Id. 
 *               
 */
routing.get('/games/:id',gamedataController.getGameById);
/**
 * @swagger
 * /games/{id}:
 *          put:
 *             summary : Edit a game by id
 *             description : "Edit a game card through its id"
 *             parameters:
 *             - in: "path"
 *               name: "id" 
 *               required: true
 *               example: "1"
 *             - in: "body"
 *               name: " game card object that to be updated"
 *               example:
 *                   game_name: "Super Mario"
 *                   game_description: "Plumber"
 *                   game_image_url: "http://mario.game/image.png"
 *                   game_url: "http://mario.game"
 *                   game_minp: "1"
 *                   game_maxp: "2"
 *                   game_category: "Arcade"    
 *             responses:
 *               '200':
 *                   description: A successful response with all the added game data. 
 *               
 */
routing.put('/games/:id',gamedataController.editGameById);
/**
 * @swagger
 * /games/category/{category}:
 *    get:
 *       summary: "get only games from the selected category"
 *       description: Returns all the game cards with more like on top
 *       parameters:
 *       - in: "path"
 *         name: "category"
 *         required: true
 *         example: "FPS"
 *       responses:
 *          '200':
 *             description: A successful response with all the game data
 */
routing.get('/games/category/:category',gamedataController.getGameByCategory);
/**
 * @swagger
 * /games/{id}/addlike:
 *    put:
 *       summary: "increment likes in the game"
 *       description: Increments the likes for a game card
 *       parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         example: "1"
 *       responses:
 *         '200':
 *             description: A successful response with all the game data
 */
routing.put('/games/:id/addlike',gamedataController.addLike);
/**
 * @swagger
 * /games/{id}/removelike:
 *    put:
 *       summary: "decrement likes in the game"
 *       description: Decrements the likes for a game card
 *       parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         example: "1"
 *       responses:
 *         '200':
 *             description: A successful message on like decrement
 */
routing.put('/games/:id/removelike',gamedataController.removelike);
module.exports = routing;