const User = require('./user')
const Photo = require('./photo')
const Sequelize = require('sequelize')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Photo.belongsTo(User, {as: 'User'});
User.hasMany(Photo, {
	foreignKey: 'UserId',
	onDelete: 'cascade',
	hooks: true});

module.exports = {
  User,
  Photo
}
