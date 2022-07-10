const express = require('express');
const { check } = require('express-validator');
const fileUploadPost = require('../middleware/post-img-upload');

const { getPostById, getPostsByUserId, createPost, updatePost, deletePost, likeOrDislkePost, addOrRemovePostFromCollection, addComment, addPostToLikes, removePostFromLikes, dislikePost } = require('../controllers/posts-controller');

const router = express.Router();

router.get('/:pid', getPostById);

router.get('/user/:uid', getPostsByUserId);

//* Check req body, then handler error in the controller if any
router.post('/', fileUploadPost.single('image'), [check('title').not().isEmpty(), check('description').isLength({ min: 1 })], createPost);

router.patch('/:pid', fileUploadPost.single('image'), [check('title').not().isEmpty(), check('description').isLength({ min: 1 })], updatePost);

router.patch('/dislike/:pid', dislikePost);

router.patch('/fav/:uid/:pid', addPostToLikes);

router.patch('/unfav/:uid/:pid', removePostFromLikes);

router.patch('/comment/:pid', addComment);

router.delete('/:pid', deletePost);

module.exports = router;