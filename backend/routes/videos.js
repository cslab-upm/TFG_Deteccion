const express = require("express");

const VideosController = require("../controllers/videos");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

//router.post("", checkAuth, extractFile, VideosController.createPost);


router.get("/:id", VideosController.getVideo);
router.get("/votoPositivo/:id", VideosController.votoPositivo);
router.get("/votoNegativo/:id", VideosController.votoNegativo);
router.get("/saltar/:id", VideosController.saltar);
router.delete("/:id", VideosController.deleteVideo);

module.exports = router;
