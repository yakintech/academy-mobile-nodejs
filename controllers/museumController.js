const { validationResult } = require("express-validator");
const { museum } = require("../models/Museum")




const museumController = {
    getAll: (req, res) => {

        museum.find({}, (err, docs) => {
            if (!err) {
                res.json(docs);
            }
            else {
                res.status(500).json(err);
            }
        })

    },
    add: (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        let muse = new museum({
            title: req.body.title,
            description: req.body.description
        });

        muse.save((err, doc) => {
            if (!err) {
                res.status(201).json(doc);
            }
            else {
                res.status(500).json(err);
            }
        })
    },
    getById: (req, res) => {
        let id = req.params.id;

        museum.findOne({ isdeleted: false, id: id }, (err, doc) => {
            if (!err) {

                if (doc) {
                    res.json(doc)
                } else {
                    res.status(404).json({ 'message': 'Not found!' })
                }

            }
            else {
                res.status(500).json(err)
            }
        })

    },
    deleteById: (req, res) => {
        let id = req.params.id;

        museum.findById(id, (err, doc) => {
            if (!err) {
                doc.isdeleted = true;
                doc.save();
                res.json(doc);
            }
            else
                res.status(500).json(err)
        })
    }
}

module.exports = {
    museumController
}