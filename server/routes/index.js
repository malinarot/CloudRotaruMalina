const express = require("express");
const router = express.Router();
const { experience, auth, reset } = require("../controllers");

//reset
router.get("/reset", reset.reset);

//user
router.post("/login", auth.login);
router.get("/logout", auth.middleware.checkLogin, auth.logout);
router.post("/register", auth.rgister);

router.put("/user", auth.middleware.checkLogin, auth.editUser);

router.delete("/user", auth.middleware.checkLogin, auth.deleteAccount);

//experience
router.post(
  "/experiences",
  auth.middleware.checkLogin,
  experience.addExperience
);
router.delete(
  "/experiences",
  auth.middleware.checkLogin,
  experience.deleteExperience
);
router.put(
  "/experiences",
  auth.middleware.checkLogin,
  experience.editExperience
);
router.get(
  "/experiences",
  auth.middleware.checkLogin,
  experience.getExperiences
);

router.get(
  "/experiences/all",
  auth.middleware.checkLogin,
  experience.getAllExperiences
);

module.exports = router;
