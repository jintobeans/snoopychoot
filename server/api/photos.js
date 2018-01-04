const router = require('express').Router()
const {Photo} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  console.log('user?', req.session.passport.user)
  Photo.findAll({
    where: {
      UserId: req.session.passport.user
    }
  })
  .then(photos => res.json(photos))
  .catch(next)
})

router.post('/', (req, res, next) => {
  let pic = req.body
  let userid = +req.session.passport.user
  return Photo.create({
    file: pic.file,
    imagePreviewUrl: pic.imagePreviewUrl,
    userId: userid
  })
  .then(newphoto => {
    newphoto.setUser(userid)
    res.json(newphoto)
  })
  .catch(next)
})

router.get('/:photoid', (req, res, next) => {
  console.log('user?', req.session.passport.user)
  Photo.findOne({
    where: {
      id: +req.params.photoid
    }
  })
  .then(photo => {
    if (+photo.UserId === +req.session.passport.user){
      res.json(photo)
    }
    else {
      res.json('You do not have permission to edit this photo!')
    }
  })
  .catch(next)
})

router.delete('/:photoid', (req, res, next) => {
  Photo.destroy({
    where: {
      id: +req.params.photoid
    }
  })
  .then(result => console.log('photos deleted:', result))
  .catch(next)
})

router.post('/:photoid', (req, res, next) => {
  Photo.findOne({
    where: {
      id: +req.params.photoid
    }
  })
  .then(photo => res.json(photo))
  .catch(next)
})

