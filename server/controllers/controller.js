const games = require('../../database/models/GameCard');
const users = require('../../database/models/User');
const routing = require('../routes/router');
const getAllGameData = (req, res) => {
       var allGames = games.findAll({
        order:[['game_likes_count','DESC']]
});
        allGames.then((result) => {
                res.json(result);
                }
        ).catch((err) => {
                res.json(err);
                }
        );

};
const addGame = (req, res) => {
       const { game_name, game_description, game_url,game_minp,game_maxp,game_category,game_image_url} = req.body;
       var newGame = games.create({
        game_name: game_name,
        game_description: game_description,
        game_url: game_url,
        game_minp: game_minp,
        game_maxp: game_maxp,
        game_category: game_category,
        game_image_url: game_image_url,
        }).then((result) => {
                res.send(result);
                }
        ).catch((err) => {
                res.send(err);
                }
        );
};
const getGameById = (req, res) => {
        const { id } = req.params;
        var gameById = games.findOne({
                where: {
                        id: id
                }
        });
        gameById.then((result) => {
                res.json(result);
                }
        ).catch((err) => {
                res.json(err);
                }
        );
};
const getGameByCategory = (req, res) => {
        const { category } = req.params;
        var gameByCategory = games.findAll({
                where: {
                        game_category: category
                }
        });
        gameByCategory.then((result) => {
                res.json(result);
                }
        ).catch((err) => {
                res.json(err);
                }
        );
};
const editGameById = (req, res) => {
        const { id } = req.params;
        const { game_name, game_description, game_url,game_minp,game_maxp,game_category,game_image_url} = req.body;
        var editGameById = games.update({
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
        editGameById.then(() => {
                res.json({"msg":"edited successfully"});
                }
        ).catch((err) => {
                res.json(err);
                }
        );
};
const addLike = (req, res) => {
        const { id } = req.params;
        var addLike = games.findOne({
                where: {
                        id: id
                }
        });
        console.log(addLike);
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
const login = ( req,res) => {
         var userName = "neo";
        var password = "matrix";
        const {uname,upasswd} = req.body;
        if(uname == userName && upasswd == password){
                res.json({"msg":"login successful"});
        }
        else{
                res.json({"msg":"login failed"});
        }
};
module.exports = {

        getAllGameData,
        login,
        addGame,
        getGameById,
        getGameByCategory,
        editGameById,
        addLike,
        removelike
        
};