const user = require('./User');
const blog = require('./Blog');

user.hasMany(blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
blog.belongsTo(user, {
  foreignKey: 'user_id'
});

module.exports = { user, blog };