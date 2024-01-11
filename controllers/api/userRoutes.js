const router = require("express").Router();
const { user } = require("../../models");

router.get("/", async (req, res) => {
  console.log("Hi");
  try {
    const userData = await user.findAll();

    res.status(200).json(userData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userById = await user.findByPk(req.params.id);

    res.status(200).json(userById);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retreiving user with id ${req.params.id}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await user.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await user.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await user.destroy({
      where: { id: id}
    });
    if (deleted) {
      res.status(200).json({message: `User with id of ${id} was successfully deleted.`})
    } else {
      res.status(404).json({message: `No user found with id ${id}`})
    }
  } catch (error) {
    res.status(500).json({message: `An error occurred while deleting the user.`})
  }
})

module.exports = router;
