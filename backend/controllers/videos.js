const Video = require("../models/videos");







exports.getVideo = (req, res, next) => {
  console.log("Estamos en controllers getVideo by id");
  Video.findById(req.params.id).then(Video => {
    if (Video) {
      res.status(200).json({
        Video
      });
    } else {
      res.status(404).json({ message: "Video not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Video failed!"
      });
    });
};

exports.deleteVideo = (req, res, next) => {
  Video.deleteOne(req.params.id)
    .then(result => {
      console.log(result);
      if (result === "OK") {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting Videos failed!"
      });
    });
};


exports.votoPositivo = (req, res, next) => {
  Video.votoPositivo(req.params.id).then(Video => {
    if (Video) {
      res.status(200).json({
        message: "Voto positivo recibido!"
      });
    } else {
      res.status(404).json({ message: "Video not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Video failed!"
      });
    });
};
exports.votoNegativo = (req, res, next) => {
  Video.votoNegativo(req.params.id, req.query.avion, req.query.rayo, req.query.eei, req.query.otro)
    .then(Video => {
      if (Video) {
        res.status(200).json({
          message: "Voto negativo recibido!"
        });
      } else {
        res.status(404).json({ message: "Video not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Video failed!"
      });
    });
};
exports.saltar = (req, res, next) => {
  Video.saltar(req.params.id).then(Video => {
    if (Video) {
      res.status(200).json({
        message: "Salto recibido!"
      });
    } else {
      res.status(404).json({ message: "Video not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Video failed!"
      });
    });
};
