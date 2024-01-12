const router = require("express").Router();
const { blog } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await blog.findAll();

    res.status(200).json(blogData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving blog data", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogById = await blog.findByPk(req.params.id);

    res.status(200).json(blogById);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retreiving blog with id ${req.params.id}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBlog = await blog.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});1

router.delete("/:id", async (req, res) => {
  try {
    const blogData = await blog.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;