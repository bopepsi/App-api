const express = require('express');
const { check } = require('express-validator');
const fileUploadPost = require('../middleware/post-img-upload');
const checkAuth = require('../middleware/check-auth');
const upload = require('../services/aws-upload');
const singleUpload = upload.single('image');

const { getPostById, getPostsByUserId, createPost, updatePost, deletePost, likeOrDislkePost, addOrRemovePostFromCollection, addComment, addPostToLikes, removePostFromLikes, dislikePost, getPosts, getFollowingsPostByUserId, getPostsByTag, getNearbyPosts, getRecByUser } = require('../controllers/posts-controller');

const router = express.Router();

router.get('/', getPosts)
//!
router.get('/post/:uid/:pid', getPostById);

router.get('/user/:uid', getPostsByUserId);

router.get('/followings/:uid', getFollowingsPostByUserId);

router.get('/rec/:uid', getRecByUser);

router.get('/tags/:tag', getPostsByTag);

router.get('/nearby/:uid', getNearbyPosts);

//* Check req body, then handler error in the controller if any
// router.post('/', fileUploadPost.single('image'), [check('title').not().isEmpty(), check('description').isLength({ min: 1 })], checkAuth, createPost);
router.post('/', singleUpload, [check('title').not().isEmpty(), check('description').isLength({ min: 1 })], checkAuth, createPost);

router.patch('/:pid', fileUploadPost.single('image'), [check('title').not().isEmpty(), check('description').isLength({ min: 1 })], checkAuth, updatePost);

router.patch('/dislike/:pid', dislikePost);

router.patch('/fav/:uid/:pid', addPostToLikes);

router.patch('/unfav/:uid/:pid', removePostFromLikes);

router.patch('/comment/:pid', addComment);

router.delete('/:pid', deletePost);

module.exports = router;