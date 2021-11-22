const games = require('../models/GameCard');
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const valdiationSchema = require('../utils/validation');


const getAllGameData = async (req, res) => {
        try{
                var allGames = await games.findAll({order:[['game_likes_count','DESC']]});
                res.json(allGames).status(200);
        }catch(err){
                res.json({msg:err}).status(400);
        }
};
const getGameById = async (req, res) => {
        
        try{
                const { id } = req.params;
                var gameById = await games.findOne({where: { id: id }});
                if(gameById){
                res.json(gameById).status(200);
                }else{
                        res.json({msg:'Game not found Check Game Id'}).status(404);
                }
        }catch(err){
                res.json({msg:err}).status(400);
        }
};

const getGameByCategory = async (req, res) => {
        try{
                const { category } = req.params;
                var gameByCategory = await games.findAll({where: {game_category: category}});
                if(gameByCategory.length>0){
                        res.json(gameByCategory).status(200);}
                else{
                        res.json({message:'No games in that category'}).status(404);
                }
        }catch(err){
                res.json({msg:err}).status(400);
        }

};

const editGameById = async (req, res) => {
        try{
                const { id } = req.params;
                const { game_name, game_description, game_url,game_minp,game_maxp,game_category,game_image_url} = req.body;
                const {error} = valdiationSchema.gameSchema.validate(req.body);
                if(error){
                        res.json(error.details[0].message).status(400);
                }
                else{
                        var editGameById = await games.update({
                        game_name: game_name,
                        game_description: game_description,
                        game_url: game_url,
                        game_minp: game_minp,
                        game_maxp: game_maxp,
                        game_category: game_category,
                        game_image_url: game_image_url,
                }, {
                        where: {
                                id: id
                        }
                });
               if(editGameById==1){
                        res.json({"msg":"game edited"}).status(200);
                }else{
                        res.json({"msg":"ID Not Found"}).status(404);
                }
        }
        }catch(err){
                res.json({msg:err}).status(400);
                }
};

const addLike = async (req, res) => {
        try{
                const { id } = req.params;
                var findGame = await games.findOne({where: {id: id}});
                if(findGame){
                        var likes = findGame.game_likes_count + 1;
                        var addLike = await games.update({ game_likes_count: likes},{where: { id: id}});
                        if(addLike==1){
                                res.json({"msg":"like added"}).status(200);
                        }else{
                                res.json({"msg":"Game not found Check Game Id"}).status(404);
                        }

                }else{
                        res.json({msg:"Game not found Check Game Id"}).status(404);
                }       
        }catch(err){
                res.json({msg:err}).status(400);
        }
};

const removelike = async (req, res) => {
        try{
                const { id } = req.params;
                var findGame = await games.findOne({where: {id: id}});
                if(findGame){
                        var likes = findGame.game_likes_count - 1;
                        var addLike = await games.update({ game_likes_count: likes},{where: { id: id}});
                        if(addLike==1){
                                res.json({"msg":"like removed"}).status(200);
                        }else{
                                res.json({"msg":"ID Not Found"}).status(404);
                        }

                }else{
                        res.json({msg:"ID Not Found"}).status(404);
                }       
        }catch(err){
                res.json({msg:err}).status(400);
        }
};

const loginGame = async ( req,res) => {

        try{

                const {user_username,user_password} = req.body;
                const {error} = valdiationSchema.userSchema.validate(req.body);
                if(error){
                        res.json(error.details[0].message).status(400);
                }
                 else{   
                         var login = await user.findOne({where: {username: user_username,}});
                        if(login){
                                if(bcrypt.compareSync(user_password,login.password)){
                                //Create and assign a token
                                        const token = await jwt.sign({id:login.id,username:login.username},"S3CR3T_K3Y",{
                                                expiresIn: '12h'
                                        });
                                        res.header('api-key',token).status(200).json({"msg":"login successful","api-key":token}).send(); 

                        }
                        else{
                                res.json({"msg":"username or password incorrect"}).status(401);
                        }


                }else{  
                        res.json({"msg":"username or password incorrect"}).status(401); 
                }

        }

        }catch(err){
                res.json({msg:err}).status(400);
        }

        

 
};
const signUp = async (req, res) => {

        try{
                const {user_fname,user_username,user_password,user_sname} = req.body;
                const {error} = valdiationSchema.userSchema.validate(req.body);
                if(error){
                        res.json(error.details[0].message).status(400);
                }else{

                        var userFound = await user.findOne({
                                where:{
                                        username:user_username
                                }
                        });
                        if(userFound){
                                 res.json({msg:"user already exists"}).status(400);
                        }else{
                                console.log("user not found in db");
                                const salt = await bcrypt.genSalt(10);
                                const hashedPassword = await bcrypt.hash(user_password, salt);
                                var signup = user.create({
                                        username: user_username,
                                        password: hashedPassword,
                                        fname: user_fname,
                                        sname: user_sname
                                });
                                 res.status(201).json({"msg":"signup successful"});

               }
        }
        }catch(err){
                res.json(err).status(400);
        }
}
const addGame =  async (req, res) => {

        try{
                const{game_name,game_description,game_url,game_minp,game_maxp,game_category,game_image_url} = req.body;
                const {error} = valdiationSchema.gameSchema.validate(req.body);
        if(error){
                res.json(error.details[0].message).status(400);
        }else{          
                                var addGame = await  games.create({
                                game_name: game_name,
                                game_description: game_description,
                                game_url: game_url,
                                game_minp: game_minp,
                                game_maxp: game_maxp,
                                game_category: game_category,
                                game_image_url: game_image_url,
                        });
                        res.json({msg:"game added"}).status(200);
        }
        }catch(err){
                res.json(err).status(400);
        }     
};
module.exports = {
        getAllGameData,
        signUp,
        loginGame,
        addGame, 
        getGameById,
        getGameByCategory,
        editGameById,
        addLike,
        removelike     
};
