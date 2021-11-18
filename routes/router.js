const express = require('express');
const routing = express.Router();
const verifyToken = require('../utils/verify');
const gamedataController = require('../controllers/controller.js');

/**
 * @swagger
 * /games:
 *      get:
 *        tags:
 *              - Games Endpoint
 *        summary: Get all games
 *        parameters:
 *          - name: api-key
 *            in: header
 *            required: true 
 *        description: Returns all the game cards with more likes on top
 *        responses:
 *         '200':
 *           description: A successful response with all the game data
 */
routing.get('/games', verifyToken,gamedataController.getAllGameData);                    
/**
 * @swagger
 * /games/add:
 *          post:
 *             tags:
 *                  - Games Endpoint
 *             summary : Add a new game
 *             description : " Add new game to Database "
 *             parameters:
 *             - name: api-key
 *               in: header
 *               required: true    
 *               example: "apikey" 
 *             - in: "body"
 *               name: " game card object that to be added"
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
routing.post('/games/add',verifyToken,gamedataController.addGame);
/**
 * @swagger
 * /games/{id}:
 *          get:
 *             tags:
 *                  - Games Endpoint
 *             summary : get a game by id
 *             description : "acessess a game card through its id"
 *             parameters:
 *             - name: api-key
 *               in: header
 *               example: "apikey"
 *               required: true    
 *             - in: "path"
 *               name: "id" 
 *               required: true
 *               example: "1"  
 *             responses:
 *               '200':
 *                   description: A successful response with the game data for the Id. 
 *               
 */
routing.get('/games/:id',verifyToken,gamedataController.getGameById);
/**
 * @swagger
 * /games/{id}:
 *          put:
 *             tags:
 *                  - Games Endpoint
 *             summary : Edit a game by id
 *             description : "Edit a game card through its id"
 *             parameters:
 *             - name: api-key
 *               in: header
 *               required: true
 *               example: "apikey"   
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
 *                   description: A successful response with all the updated game data. 
 *     
 */
routing.put('/games/:id',verifyToken,gamedataController.editGameById);
/**
 * @swagger
 * /games/category/{category}:
 *    get:
 *       tags:
 *            - Games Endpoint
 *       summary: "get only games from the selected category"
 *       description: Returns all the game cards with more like on top from a category
 *       parameters:
 *       - name: api-key
 *         in: header
 *         required: true
 *         example: "apikey"    
 *       - in: "path"
 *         name: "category"
 *         required: true
 *         example: "FPS"
 *       responses:
 *          '200':
 *             description: A successful response with all the game data from that category
 */
routing.get('/games/category/:category',verifyToken,gamedataController.getGameByCategory);
/**
 * @swagger
 * /games/{id}/addlike:
 *    put:
 *       tags:
 *            - Games Endpoint
 *       summary: "increment likes in the game"
 *       description: Increments the likes for a game card through its id
 *       parameters:
 *       - name: api-key
 *         in: header
 *         required: true 
 *         example: "apikey"      
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         example: "1"
 *       responses:
 *         '200':
 *             description: A successful response on like increment
 */
routing.put('/games/:id/addlike',verifyToken,gamedataController.addLike);
/**
 * @swagger
 * /games/{id}/removelike:
 *    put:
 *       tags:
 *              - Games Endpoint
 *       summary: "decrement likes in the game"
 *       description: Decrements the likes for a game card through its id
 *       parameters:
 *       - name: api-key
 *         in: header
 *         required: true 
 *         example: "apikey"  
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         example: "1"
 *       responses:
 *         '200':
 *             description: A successful message on like decrement
 */
routing.put('/games/:id/removelike',verifyToken,gamedataController.removelike);
/**
 * @swagger
 * /games/signup:
 *      post:
 *          tags:
 *              - Login Endpoint
 *          summary: "signup a new user"
 *          description: "signup a new user"
 *          parameters:    
 *          - in: "body"
 *            name: "signup object"
 *            example:
 *              user_username: "neo"
 *              user_password: "matrix"
 *              user_fname: "neo"
 *              user_sname: "matrix" 
 *          required: true
 *          responses:
 *              '200':
 *                  description: A successful response saying user added.
 *              
 */
routing.post('/games/signup',gamedataController.signUp);
/**
 * @swagger
 * /games/login:
 *          post:
 *             tags:
 *                  - Login Endpoint
 *             summary : login end point
 *             description :  login end point
 *             parameters:
 *             - in: "body"
 *               name: " login object"
 *               required: true
 *               example:
 *                   user_username: "neo"
 *                   user_password: "123"      
 *             responses:
 *               '200':
 *                   description: A successful response with api-key in header and json response.            
 */
 routing.post('/games/login',gamedataController.loginGame);
 routing.get('/',(req,res)=>{

    res.redirect('/api-docs');

 });
module.exports = routing;
