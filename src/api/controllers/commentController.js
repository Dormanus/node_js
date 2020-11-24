const Comment = require('../models/commentModel');

exports.list_all_comments = (req, res) => {
    Comment.find({}, (error, comments) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comments)
        }
    })
}

exports.create_a_comment = (req, res) => {
    let new_comment = new Comment(req.body);

    new_comment.save((error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(201);
            res.json(comment)
        }
    })
}

exports.get_a_comment = (req, res) => {
    Post.findById(req.params.comment_id, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(201);
            res.json(comment)
        }
    })
}

exports.update_a_comment = (req, res) => {
    Post.findByIdAndUpdate(req.params.comment_id, req.body, {new: true}, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comment)
        }
    })
}

exports.delet_a_comment = (req, res) => {
    Post.findByIdAndRemove(req.params.comment_id, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json({message: "Message supprimé."})
        }
    })
}