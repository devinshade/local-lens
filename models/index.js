const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
blog.belongsTo(user, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog };