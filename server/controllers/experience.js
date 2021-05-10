const { User, Experience } = require("../models");

const controller = {
  addExperience: async (req, res) => {
    try {
      const {
        satisfaction,
        observation,
        crowdLevel,
        travelDuration,
        time,
        transportMean,
        start,
        end,
      } = req.body;

      const errors = [];

      if (!satisfaction) {
        errors.push("satisfaction is empty");
      }

      if (!crowdLevel) {
        errors.push("crowdLevel is empty");
      }
      if (!travelDuration) {
        errors.push("travelDuration is empty");
      }
      if (!time) {
        errors.push("time is empty");
      }
      if (!transportMean) {
        errors.push("transportMean is empty");
      }
      if (!start) {
        errors.push("start is empty");
      }
      if (!end) {
        errors.push("end is empty");
      }

      if (errors.length === 0) {
        const experience = await Experience.create({
          satisfaction,
          observation,
          crowdLevel,
          travelDuration,
          time,
          transportMean,
          start,
          end,
          userId: req.session.id,
        });
        res.status(201).send({
          message: `Experience was sucessfull created`,
        });
      } else {
        res.status(400).send({ errors });
      }
      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },
  getExperiences: async (req, res) => {
    try {
      const experiences = await Experience.findAll({
        where: { userId: req.session.id },
      });
      res.status(200).send(experiences);

      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  getAllExperiences: async (req, res) => {
    try {
      const experiences = await Experience.findAll();
      res.status(200).send(experiences);

      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },
  editExperience: async (req, res) => {
    try {
      const {
        satisfaction,
        observation,
        crowdLevel,
        travelDuration,
        time,
        transportMean,
        start,
        end,
        id,
      } = req.body;

      const errors = [];
      const experience = await Experience.findOne({ where: { id } });

      if (!experience) {
        errors.push("experience doesn't exists");
      }

      if (!satisfaction) {
        errors.push("satisfaction is empty");
      }

      if (!crowdLevel) {
        errors.push("crowdLevel is empty");
      }
      if (!travelDuration) {
        errors.push("travelDuration is empty");
      }
      if (!time) {
        errors.push("time is empty");
      }
      if (!transportMean) {
        errors.push("transportMean is empty");
      }
      if (!start) {
        errors.push("start is empty");
      }
      if (!end) {
        errors.push("end is empty");
      }

      if (errors.length === 0) {
        await experience.update({
          ...experience,
          satisfaction,
          observation,
          crowdLevel,
          travelDuration,
          time,
          transportMean,
          start,
          end,
        });

        res.status(200).send({
          message: `Experience was sucessfull edited`,
        });
      } else {
        res.status(400).send({ errors });
      }
      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },
  deleteExperience: async (req, res) => {
    try {
      const { id } = req.body;

      const errors = [];
      const experience = await Experience.findOne({ where: { id } });

      if (!experience) {
        errors.push("experience doesn't exists");
      }

      if (errors.length === 0) {
        await experience.destroy();

        res.status(200).send({
          message: `Experience was sucessfull deleted`,
        });
      } else {
        res.status(400).send({ errors });
      }
      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },
};

module.exports = controller;
