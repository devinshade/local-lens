const sequelize = require('../config/connection');
const { user, blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const b of blogData) {
    await blog.create({
      ...b,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

