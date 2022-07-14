const router = require("express").Router();
const auth = require('../middleware/auth');
const ArticleModel = require('../models/Article.model');

router.get("/", async (req, res) => {
    try {
        const articles = await ArticleModel.find();
        res.json(articles);
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: "No Article Present"});
    }
}); // Route to Get All Articles

router.post("/", auth, async (req, res) => {
    try {
        const {title, description} = req.body;
        const newArticle = new ArticleModel({title, description, user: req.user.id});
        await newArticle.save();
        res.json({msg: "Article Created Successfully"});
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: "Failed to Create Article"});
    }
});

router.put("/like/:articleID", auth, async (req, res) => {
    try {
        const article = await ArticleModel.findById(req.params.articleID);

        // Check If User Should Not Like His Own Article
        if(article.user.toString() === req.user.id) {
            return res.status(203).json({error: "You Can't Like Your Own Articles"});
        }

        article.likes.filter(like => console.log(like._id))
        // Check If Other User has Already Liked Particular Article
        if(article.likes.filter((like) => like._id.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: "Post Already Liked"});
        }

        // Updating Likes Array in Model
        article.likes.unshift({ userID: req.user.id });

        // Saving Article Back Into DB
        await article.save();
        
        res.json(article);
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Failed to Like Article"});
    }
}); // Route to Like Article

module.exports = router;