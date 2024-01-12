const sequelize = require('../config/connection');
const Blog = require('../models/Blog'); // Make sure this is the correct path to your Venue model


const blogData = [
  {
    "name": "Marquis Theatre",
    "description": "Music venue in Downtown Denver.",
    "rating": 5
  },
  {
    "name": "Herman's Hideaway",
    "description": "Music venue on South Broadway in Denver.",
    "rating": 4
  },
  {
    "name": "The Squire Lounge",
    "description": "Dive bar with live music.",
    "rating": 3
  }
];

const seedBlog = async () => {
  await sequelize.sync({ force: true });
  await Blog.bulkCreate(blogData, { validate: true });
  console.log('Blog seeded!');
};

seedBlog();
