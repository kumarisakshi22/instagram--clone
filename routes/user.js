const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requirelogin = require("../middlewares/requirelogin");

// to get user profile
// router.get("/user/:id", (req, res) => {
//     USER.findOne({ _id: req.params.id })
//         .select("-password")

//         .then(user => {
//             POST.find({ postedBy: req.params.id })
//             .populate("postedBy","_id")
//             if (!user) {
//                 return res.status(404).json({ error: "User not found" });
//             }

//             return POST.find({ postedBy: req.params.id }).populate("postedBy", "_id");
//         })
//          .then(posts => {
//             res.status(200).json({ post: posts });
//         })
//         .catch(err => {
//             console.log(err);
//             return res.status(500).json({ error: "Server error" });
//         });
// });
// const express = require("express");
// const router = express.Router();
// const USER = require("../models/user"); // Assuming you have defined the USER model
// const POST = require("../models/post"); // Assuming you have defined the POST model

// router.get("/user/:id", (req, res) => {
//     USER.findOne({ _id: req.params.id })
//         .select("-password")
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json({ error: "User not found" });
//             }

//             // After finding the user, we now search for the posts by that user
//             return POST.find({ postedBy: req.params.id })
//                 .populate("postedBy", "_id");
//         })
//         .then(posts => {
//             res.status(200).json({ user: user, posts: posts });
//         })
//         .catch(err => {
//             console.log(err);
//             return res.status(500).json({ error: "Server error" });
//         });
// });
// router.get("/user/:id", async (req, res) => {
//     try {
//         const user = await USER.findOne({ _id: req.params.id }).select("-password");
        
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const posts = await POST.find({ postedBy: req.params.id }).populate("postedBy", "_id");

//         res.status(200).json({ user: user, posts: posts });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Server error" });
//     }
// });

// const express = require("express");
// const router = express.Router();
// const USER = require("../models/user"); // Assuming you have defined the USER model
// const POST = require("../models/post"); // Assuming you have defined the POST model

router.get("/user/:id", async (req, res) => {
    try {
        const user = await USER.findOne({ _id: req.params.id }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await POST.find({ postedBy: req.params.id }).populate("postedBy", "_id");

        res.status(200).json({ user: user, posts: posts });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
});

// to follow user
router.put("/follow", requirelogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        USER.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).then(result => {
            res.json(result)

        })
            .catch(err => { return res.status(422).json({ error: err }) })
    }
    )
})


// to unfollow user
router.put("/unfollow", requirelogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        USER.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        }).then(result => res.json(result))
            .catch(err => { return res.status(422).json({ error: err }) })
    }
    )
})


// to upload profile pic
router.put("/uploadProfilePic", requirelogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.pic }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: er})
        } else {
            res.json(result)
        }
    })
})





module.exports = router;