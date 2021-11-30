const express = require('express');
const routing = express.Router();
const gamedataController = require('../controllers/controller.js');
const passport = require('passport');
const auth = require('../utils/auth');
const oauth = require('../utils/oauth');
auth.jwtv(passport);
oauth(passport);
/**
 * @swagger
 * securityDefinitions:
 *    api-key:
 *       type: apiKey
 *       name: api-key
 *       in: header
 *       description: "API key to access the API"
 *       required: true
 *    oauth2:
 *       type: oauth2
 *       flow: implicit
 *       authorizationUrl: http://localhost/auth/google
 *       description: "Use Google to login and get the api key and paste it in above api-key holder"
 * 
 * security:
 *    - api-key: []  
 * /games:
 *      get:
 *        tags:
 *              - Games Endpoint
 *        summary: Get all games
 *        description: Returns all the game cards with more likes on top
 *        responses:
 *         '200':
 *           description: A successful response with all the game data
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *        security:
 *          - api-key: [] 
 */
routing.get('/games', passport.authenticate('jwt',{session:false}),gamedataController.getAllGameData);                    
/**
 * @swagger
 * /games:
 *          post:
 *             tags:
 *                  - Games Endpoint
 *             summary : Add a new game
 *             description : " Add new game to Database "
 *             parameters: 
 *             - in: "body"
 *               name: " game card object that to be added"
 *               example:
 *                   game_name: "Call of Duty"
 *                   game_description: "Fight with other Players with guns"
 *                   game_image_url: "http://cod.game/image.png"
 *                   game_url: "http://cod.game"
 *                   game_minp: "1"
 *                   game_maxp: "4"
 *                   game_category: "FPS"    
 *             responses:
 *               '200':
 *                   description: A successful response with all the added game data.
 *               '400':
 *                   description: Bad request 
 *               '401':
 *                   description: Access Denied
 *             security:
 *                - api-key: []    
 *               
 */
routing.post('/games',passport.authenticate('jwt',{session:false}),gamedataController.addGame);
/**
 * @swagger
 * /games/{id}:
 *          delete:
 *             tags:
 *                  - Games Endpoint
 *             summary : get a game by id
 *             description : "acessess a game card through its id"
 *             parameters: 
 *             - in: "path"
 *               name: "id" 
 *               required: true
 *               example: "1"  
 *             responses:
 *               '200':
 *                   description: A successful response about the deleted game. 
 *               '400':
 *                   description: Bad request
 *               '404':
 *                   description: Game not found
 *               '401':
 *                   description: Access Denied
 *             security:
 *                - api-key: []
 *                            
 */
routing.delete('/games/:id',passport.authenticate('jwt',{session:false}),gamedataController.deleteGameById);
/**
 * @swagger
 * /games/{id}:
 *          get:
 *             tags:
 *                  - Games Endpoint
 *             summary : get a game by id
 *             description : "acessess a game card through its id"
 *             parameters: 
 *             - in: "path"
 *               name: "id" 
 *               required: true
 *               example: "1"  
 *             responses:
 *               '200':
 *                   description: A successful response with the game data for the Id. 
 *               '400':
 *                   description: Bad request
 *               '401':
 *                   description: Access Denied
 *             security:
 *                - api-key: []
 *                            
 */
routing.get('/games/:id',passport.authenticate('jwt',{session:false}),gamedataController.getGameById);
/**
 * @swagger
 * /games/{id}:
 *          put:
 *             tags:
 *                  - Games Endpoint
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
 *                   description: A successful response with all the updated game data. 
 *               '400':
 *                   description: Bad request
 *               '404':
 *                   description: Game not found Check Game Id
 *               '401':
 *                   description: Access Denied
 *             security:
 *                - api-key: []              
 */
routing.put('/games/:id',passport.authenticate('jwt',{session:false}),gamedataController.editGameById);
/**
 * @swagger
 * /games/category/{category}:
 *    get:
 *       tags:
 *            - Games Endpoint
 *       summary: "get only games from the selected category"
 *       description: Returns all the game cards with more like on top from a category
 *       parameters:   
 *       - in: "path"
 *         name: "category"
 *         required: true
 *         example: "FPS"
 *       responses:
 *          '200':
 *             description: A successful response with all the game data from that category
 *          '400':
 *             description: Bad request
 *          '404':
 *             description: No games found in that category
 *          '401':
 *             description: Access Denied
 *       security:
 *          - api-key: []
 */
routing.get('/games/category/:category',passport.authenticate('jwt',{session:false}),gamedataController.getGameByCategory);
/**
 * @swagger
 * /games/{id}/addlike:
 *    put:
 *       tags:
 *            - Games Endpoint
 *       summary: "increment likes in the game"
 *       description: Increments the likes for a game card through its id
 *       parameters:     
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         example: "1"
 *       responses:
 *         '200':
 *             description: A successful response on like increment
 *         '400':
 *             description: Bad request
 *         '404':
 *             description: Game not found Check Game Id
 *         '401':
 *             description: Access Denied
 *       security:
 *          - api-key: []      
 */
routing.put('/games/:id/addlike',passport.authenticate('jwt',{session:false}),gamedataController.addLike);
/**
 * @swagger
 * /games/{id}/removelike:
 *    delete:
 *       tags:
 *              - Games Endpoint
 *       summary: "decrement likes in the game"
 *       description: Decrements the likes for a game card through its id
 *       parameters:  
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         example: "1"
 *       responses:
 *         '200':
 *             description: A successful message on like decrement
 *         '400':
 *             description: Bad request
 *         '404':
 *             description: Game not found Check Game Id
 *         '401':
 *             description: Access Denied
 *       security:
 *          - api-key: []       
 */
routing.delete('/games/:id/removelike',passport.authenticate('jwt',{session:false}),gamedataController.removelike);
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
 *              '201':
 *                  description: A successful response saying user signup successful.
 *              '400':
 *                  description: Bad request  
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
 *               '400':
 *                   description: Bad request
 *               '401':
 *                   description: msg saying username or password is incorrect               
 */
 routing.post('/games/login',gamedataController.loginGame);

 routing.get('/auth/google',passport.authenticate('google',{scope:['profile','email'],session:false}));

routing.get('/auth/google/callback', passport.authenticate('google',{
   session: false,
   scope: ['profile','email']}),
   gamedataController.googleLogin);

 routing.get('/',(req,res)=>{
    res.redirect('/api-docs');
 });
module.exports = routing;
