const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
// const { body, validationResult } = require("express-validator");
const Notes = require("../model/Notes");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Create a new note using: POST "/api/notes/addnotes". No login required
router.post("/addnotes", fetchuser, 
    // body("title","Title must contain 5 characters").isLength({ min: 5 }),
    // body("description", "Description must contain 5 characters").isLength({ min: 5,}),
  async (req, res) => {

    try {
    // //cheaking for error regarding validation
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    // const salt = await bcrypt.genSalt(10);
    // const noteTitle = await bcrypt.hash(req.body.title,salt);
    // const noteDesc = await bcrypt.hash(req.body.description,salt);
    // const noteTag = await bcrypt.hash(req.body.tag,salt);

    let notes = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
    });

    res.json(notes);
} catch (error) {
    // catch block for showing the error message
    console.error(error.message);
    res.status(500).send("Something went wrong ");
}
});


// ROUTE 2: Fetch all notes of a user using: GET "/api/notes/fetchnotes". No login required

router.get("/fetchnotes", fetchuser, async (req, res) => {

    try {
        const allNotes = await Notes.find({user: req.user.id})
        res.json(allNotes);

    } catch (error) {
        // catch block for showing the error message
        console.error(error.message);
        res.status(500).send("Something went wrong ");
    }
});


// ROUTE 3: Update notes of a user using: PUT "/api/notes/updatenotes". No login required

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    try {
        const {title,description,tag} = req.body;

        const newnote = {}; // creating a new note object to store/update new data 
        if(title){
            newnote.title = title;
        }
        if(description){
            newnote.description = description;
        }
        if(tag){
            newnote.tag = tag;
        }
        
        // checking weather the note exist or not
        let note = await Notes.findById(req.params.id);
        // if not then send error
        if(!note) {
            return res.status(404).send("Error: not found")
        }

        // checking weather the user editing the notes is the same as notes owner or not
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed"); // if not then permission denied 
        }

        // updating the note using findByIdAndUpdate
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new: true})
        res.json({note});

    } catch (error) {
        // catch block for showing the error message
        console.error(error.message);
        res.status(500).send("Something went wrong ");
    }
});


// ROUTE 4: Delete notes of a user using: DELETE "/api/notes/updatenotes". No login required

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
    try {
        // checking weather the note exist or not
        let note = await Notes.findById(req.params.id);
        // if not then send error
        if(!note) {
            return res.status(404).send("Error: not found")
        }

        // checking weather the user editing the notes is the same as notes owner or not
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed"); // if not then permission denied 
        }

        // updating the note using findByIdAndUpdate
        note = await Notes.findByIdAndDelete(req.params.id, {new: true})
        res.json({note});

    } catch (error) {
        // catch block for showing the error message
        console.error(error.message);
        res.status(500).send("Something went wrong ");
    }
});

// // ROUTE 5: Show note of a user using: GET "/api/notes/shownote". No login required

// router.get("/shownote/:id", fetchuser, async (req, res) => {
//     try {
//         // checking weather the note exist or not
//         let note = await Notes.findById(req.params.id);
//         // if not then send error
//         if(!note) {
//             return res.status(404).send("Error: not found")
//         }

//         // checking weather the user editing the notes is the same as notes owner or not
//         if(note.user.toString() !== req.user.id){
//             return res.status(401).send("Not Allowed"); // if not then permission denied 
//         }

//         // updating the note using findByIdAndUpdate
//         // note = await Notes.findByIdAndUpdate(req.params.id, {new: true})
//         // res.json({note});

//         const Note = await Notes.find({_id: req.params.id})
//         res.json(Note);

//     } catch (error) {
//         // catch block for showing the error message
//         console.error(error.message);
//         res.status(500).send("Something went wrong ");
//     }
// });

module.exports = router;

