const db = require("../models");

// Defining methods for the LoomsController
module.exports = {

  // FindAll method that gets all games in existance and sends a response in json format
  findAll: function (req, res) {
    db.Loom
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // FindByID method to get a single game ID response
  findById: function (req, res) {
    db.Loom
      .findById(req.params.uniqueid)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Method to get a limited number of Looms not completed
  // This is for the World Open Games component
  findOpenLooms: function (req, res) {
    db.Loom
      .find(
        // {
        //   $or: [
        //     // Checking if two player games are completed
            {
              $and: [
                // { playerCount: 2 },
                { pImg2: null },
                { private: false }
              ]
            }

            // Checking if three player games are completed
            // {
            //   $and: [
            //     { playerCount: 3 },
            //     {
            //       $or: [
            //         // Open games will show up whether user is player 1 or player 2
            //         { pImg2: null },
            //         { pImg3: null },
            //       ]
            //     },
            //     { private: false }
            //   ]
            // }
        //   ]
        // }
      )
      .sort({ date: 'desc' })
      .limit(8)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // Get incomplete Looms by User
  findUserLooms: function (req, res) {
    db.Loom
      .find(
        // {
        //   $or: [
            // Checking if two player games are completed
            {
              $and: [
                // { playerCount: 2 },
                { playerId1: req.params.uniqueid },
                { pImg2: null }
              ]
            },

            // Checking if three player games are completed
          //   {
          //     $and: [
          //       { playerCount: 3 },
          //       {
          //         $or: [
          //           // Open games will show up whether user is player 1 or player 2
          //           { playerId1: req.params.uniqueid },
          //           { playerId2: req.params.uniqueid }
          //         ]
          //       },
          //       { $or: [
          //         { pImg2: null },
          //         { pImg3: null }
          //       ]}
          //     ]
          //   }
          // ]}
        )
      .limit(8)
      .sort({ date: 'desc' })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // Get COMPLETED Looms by USER
  findCompletedLoomsByUser: function (req, res) {
    db.Loom
      .find(
        // {
        //   $or: [
            // Logic for 2 player game
            {
              $and: [
                // { playerCount: 2 },
                {
                  $or: [
                    { playerId1: req.params.uniqueid },
                    { playerId2: req.params.uniqueid }
                  ]
                },
                { pImg2: { $ne: null } }
              ]
            },

            // Logic for 3 player game
            // {
            //   $and: [
            //     { playerCount: 3 },
            //     {
            //       $or: [
            //         { playerId1: req.params.uniqueid },
            //         { playerId2: req.params.uniqueid },
            //         { playerId3: req.params.uniqueid }
            //       ]
            //     },
            //     {
            //       $and: [
            //         { pImg2: { $ne: null } },
            //         { pImg3: { $ne: null } }
            //       ]
            //     }
            //   ]
            // }] }
          )
      .limit(10)
      .sort({ date: 'desc' })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // Method to get all completed Loom images 
  findCompletedLooms: function (req, res) {
    db.Loom
      .find(
        // {
        // $or: [
          // Checking 2 player games
          {
            $and: [
              // { playerCount: 2 },
              { pImg1: { $ne: null } },
              { pImg2: { $ne: null } }
            ]
          },

          // Checking 3 player games
        //   {
        //     $and: [
        //       { playerCount: 3 },
        //       { pImg1: { $ne: null } },
        //       { pImg2: { $ne: null } },
        //       { pImg3: { $ne: null } }
        //     ]
        //   }
        // ] }
      )
      .sort({ date: 'desc' })
      .limit(20)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  getAllCompletedGames: function (req, res) {
    db.Loom
      .find({ _id: { $in: req.body.data } })
      .sort({ date: 'desc' })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  // Method that posts games to the db
  // This sends all game data available to server
  create: function (req, res) {
    db.Loom
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Method that updates a game based on the ID
  // This is to make sure player2's image and user info are added to the game
  update: function (req, res) {
    db.Loom
      .findOneAndUpdate({ _id: req.params.uniqueid }, { $set: req.body })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Method to delete open games
  // This will be used in the "Your Open Games" component 
  // to get rid of games you don't want to leave open anymore
  remove: function (req, res) {
    db.Loom
      .findById({ _id: req.params.uniqueid })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};