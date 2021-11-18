const games = require('../models/GameCard');
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const valdiationSchema = require('../utils/validation');


const getAllGameData = async (req, res) => {
        try{
                var allGames = await games.findAll({order:[['game_likes_count','DESC']]});
                res.json(allGames);
        }catch(err){
                res.json({message:err});
        }
};
const getGameById = async (req, res) => {
        
        try{
        const { id } = req.params;
        var gameById = await games.findOne({
                where: { id: id }
        });
        if(gameById){
                res.json(gameById);
        }else{
                res.json({message:'Game not found Check Game Id'});
        }
        }catch(err){
                res.json({message:err});
        }
};

const getGameByCategory = async (req, res) => {
        try{
                const { category } = req.params;
                var gameByCategory = await games.findAll({
                        where: {
                                game_category: category
                        }
                });
                if(gameByCategory.length>0){
                res.json(gameByCategory).status(200);}
                else{
                        res.json({message:'No games in that category'});
                }
        }catch(err){
                res.json({message:err}).status(400);
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
                        res.json({"msg":"game edited"});
                }else{
                        res.json({"msg":"ID Not Found"});
                }
        }
}catch(err){
                res.json({message:err});
        }
};

const addLike = (req, res) => {
        const { id } = req.params;
        var addLike = games.findOne({
                where: {
                        id: id
                }
        });
        addLike.then((result) => {
                var likes = result.game_likes_count + 1;
                var addLike = games.update({
                        game_likes_count: likes
                }, {
                        where: {
                                id: id
                        }
                });
                addLike.then((result) => {
                        res.json({"msg":"like added"});
                        }
                ).catch((err) => {
                        res.json(err);
                        }
                );
                }
        ).catch((err) => {
                res.json(err);
                }
        );
};

const removelike = (req, res) => {
        const { id } = req.params;
        var removelike = games.findOne({
                where: {
                        id: id
                }
        });
        removelike.then((result) => {
                var likes = result.game_likes_count - 1;
                var removelike = games.update({
                        game_likes_count: likes
                }, {
                        where: {
                                id: id
                        }
                });
                removelike.then((result) => {
                        res.json({"msg":"like removed"});
                        }
                ).catch((err) => {
                        res.json(err);
                        }
                );
                }
        ).catch((err) => {
                res.json(err);
                }
        );
};

const loginGame = ( req,res) => {

        const {user_username,user_password} = req.body;
        const {error} = valdiationSchema.userSchema.validate(req.body);
        if(error){
                res.json(error.details[0].message).status(400);
        }
        else{
                var login = user.findOne({
                        where: {
                                username: user_username,
                        }
                });
                login.then((result) => {
                        if(result){
                                if(bcrypt.compareSync(user_password,result.password)){
                                        //Create and assign a token
                                        const token = jwt.sign({id:result.id,username:result.username},"S3CR3T_K3Y",{
                                                expiresIn: '12h'
                                        });
                                        res.header('api-key',token).status(200).json({"msg":"login successful","api-key":token}).send(); 

                                }
                                else{
                                        res.json({"msg":"username or password incorrect"}).status(401);
                                }
                        }
                        else{
                                res.json({"msg":"login failed"});
                        }
                        }
                ).catch((err) => {
                        res.json(err);
                        }
                );
        }

 
};
const signUp = async (req, res) => {

        try{
        const {user_fname,user_username,user_password,user_sname} = req.body;
        const {error} = valdiationSchema.userSchema.validate(req.body);
        if(error){
                res.json(error.details[0].message).status(400);
        }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user_password, salt);
                var signup = user.create({
                        username: user_username,
                        password: hashedPassword,
                        fname: user_fname,
                        sname: user_sname
                });
                res.status(200).json({"msg":"signup successful"});
        }
        }catch(err){
                res.json(err);
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
