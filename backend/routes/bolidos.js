const express = require("express");

const BolidosController = require("../controllers/bolidos");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

//router.post("", checkAuth, extractFile, BolidosController.createPost);

router.get("/getTotal", BolidosController.getTotal);
router.get("/setRatio", BolidosController.changeRatio);
router.get("/getRatio", BolidosController.getRatioVotos);
router.get("/:id", BolidosController.getBolidos);

router.delete("/:id",checkAuth, BolidosController.deleteBolido);

module.exports = router;
