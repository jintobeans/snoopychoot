const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Photo = db.define('photo', {
  file: {
    type: Sequelize.TEXT,
    get: function() {
        return JSON.parse(this.getDataValue('file'));
    },
    set: function(val) {
        return this.setDataValue('file', JSON.stringify(val));
    }
},
  imagePreviewUrl: {
    type: Sequelize.TEXT
  },
  // geometry: {
  //   type: Sequelize.GEOMETRY
  // }
})

module.exports = Photo

/**
 * instanceMethods
 */


/**
 * classMethods
 */

/**
 * hooks
 */

