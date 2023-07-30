const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const requirelogin = require("../middlewares/requirelogin");

// const { route } = require("./auth");
// const POST = mongoose.model("POST")


router.get("/allposts", requirelogin,  (req, res) => {
    POST.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name ")
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
    
})
const POST=mongoose.model("POST")
router.post("/createPost",requirelogin, (req, res) => {
    const { body , pic } = req.body;
    if (!body || !pic) {
        return res.status(422).json({error:"pls add all fields"})

    }
    console.log(req.user)
    const post = new POST({
        
        body,
        photo:pic,
        
        postedBy:req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
        
    }).catch(err=>console.log(err))
    

})
router.get("/myposts",requirelogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy","_id name")
        .sort("-createdAt")
        .then(myposts => {
        res.json(myposts)
    })
})
router.put("/like", requirelogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true

    }).populate("postedBy","_id name ")
        .then(result => {
        return res.json(result)
    }).catch(err=>console.log(err))
        // .then((err, result) => {
        //     if (err) {
        //         return res.status(422).json({ error: err })
        //     } else {
        //         res.json(result)
        //     }
        // }).catch(err=>console.log(err))
})

router.put("/unlike", requirelogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy","_id name")
        .then(result => {
        return res.json(result)
    }).catch(err=>console.log(err))
})

router.put("/comment", requirelogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.postedBy", "_id name")
        .populate("postedBy","_id name")
        .then(result => {
            return res.json(result)
        }).catch(err=>console.log(err))
})


// Api to delete post
// router.delete("/deletePost/:postId", requirelogin, (req, res) => {
//     // console.log(req.params.postId)
//     POST.findOne({ _id: req.params.postId })
//         .populate("postedBy", "_id")
//         .then((err,post) => {
//             if (!post) {
//       return res.status(422).json({ error: err});
//     }
//     if (post.postedBy._id.toString() == req.user._id.toString()) {
  
//         post.remove()
//             .then(result => {
//                 return res.json({ message: "Successfully deleted" })
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }
   
    
//   })

    
//         })
router.delete("/deletePost/:postId", requirelogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec()
        .then(post => {
            if (!post) {
                return res.status(422).json({ error: "Post not found" });
            }

            if (post.postedBy._id.toString() !== req.user._id.toString()) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            return post.remove();
        })
        .then(result => {
            return res.json({ message: "Successfully deleted" });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Server error" });
        });
});

// to show following post
router.get("/myfollwingpost", requirelogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})


module.exports=router