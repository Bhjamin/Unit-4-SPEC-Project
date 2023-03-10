const { DataTypes } = require('sequelize')
const {sequelize} = require('../util/database')
const { User } = require('../models/user')
const { Post } = require('../models/post')


module.exports = {


    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            })
            res.status(200).send(posts)
        } catch(err){
            console.log('Cannot get posts')
            console.log(err)
            res.sendStatus(400)
        }
    
    },

    getCurrentUserPosts: async (req, res) => {

        console.log(req.params)

        try {
            const { userId } = req.params
            const posts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            })
            res.status(200).send(posts)
        } catch(err){
            console.log(err)
            res.sendStatus(400)
        }
        
    },

    addPost: async (req, res) => {
        
        try{

            const {title, content, privateStatus, userId} = req.body
            await Post.create({title, content, privateStatus, userId}) 

            res.sendStatus(200)

        } catch(err){
            console.log(err)
            res.status(400).send()
        }
    },

    editPost: async (req, res) => {
        try {
            const {id} = req.params
            const {status} = req.params
            await Post.update({privateStatus: status}, {
                where: {id: +id}
            })
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deletePost: async (req, res) => {
        try {
            const {id} = req.params
            await Post.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    }

}

