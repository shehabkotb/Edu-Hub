const Course = require('../../models/course')
const Discussions = require('../../models/Discussions')



const getAllDiscussions = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findOne({_id: courseId}).exec()
        const discussions = await Discussions.find({ course: course })
          .populate('user')
          .populate('comments.user')
          .exec()
        res.status(200).send(discussions)
    } catch (e) {
        res.status(400).send("cant get discussions: "+e)
    }
}

const addDiscussion = async (req, res) => {
    try {
        const user = req.user;
        const courseId = req.body.courseId;
        const data = req.body.data;
        const course = await Course.findOne({_id: courseId}).exec()
        const discussion = new Discussions({user: user, course: course, data: data});
        await discussion.save()
        res.status(201).send(discussion)
    } catch (e) {
        res.status(400).send("cant create discussion: "+e)
    }
}

const editDiscussion = async (req, res) => {
    try {
        const id = req.body.id;
        const disNew = req.body.new;
        await Discussions.findByIdAndUpdate(id, disNew).exec()
        disNew = await Discussions.findById(disNew._id)
          .populate('user')
          .populate('comments.user')
          .exec()
        res.status(201).send(disNew)
    } catch (e) {
        res.status(400).send("cant edit discussion: "+e)
    }
}

const removeDiscussion = async (req, res) => {
    try {
        const id = req.params.id;
        await Discussions.findByIdAndDelete(id).exec()
        res.status(201).send("removed")
    } catch (e) {
        res.status(400).send("cant remove discussion: "+e)
    }
}

const addComment = async (req, res) => {
    try{
        const user = req.user;
        const discussionId = req.body.discussionId;
        const comment = req.body.comment;
        comment.user = user;
        const discussion = await Discussions.findById(discussionId)
          .populate('user')
          .populate('comments.user')
          .exec()
        discussion.comments.push(comment);
        await Discussions.findByIdAndUpdate(discussionId,discussion).exec()
        res.status(201).send(discussion)
    } catch (e){
        res.status(400).send("cant create comment: "+e)
    }
}

const removeComment = async (req, res) => {
    try{
        const discussionId = req.params.discussionId;
        console.log(discussionId)
        const commentId = req.params.commentId;
        console.log(commentId)
        const discussion = await Discussions.findById(discussionId)
          .populate('user')
          .populate('comments.user')
          .exec()
        discussion.comments = discussion.comments.filter((value)=>{ 
            return value._id != commentId;
        });
        await Discussions.findByIdAndUpdate(discussionId,discussion).exec()
        res.status(201).send(discussion)
    } catch (e){
        res.status(400).send("cant remove comment: "+e)
    }
}

const editComment = async (req, res) => {
    try{
        const discussionId = req.body.discussionId;
        const commentNew = req.body.new;
        const commentOld = req.body.old;
        const discussion = await Discussions.findById(discussionId)
          .populate('user')
          .populate('comments.user')
          .exec()
        discussion.comments = discussion.comments.map((value)=>{ 
            if (value._id===commentOld._id){return commentNew}
            else{return value}
        });
        await Discussions.findByIdAndUpdate(discussionId,discussion).exec()
        res.status(201).send(discussion)
    } catch (e){
        res.status(400).send("cant remove comment: "+e)
    }
}

module.exports = { getAllDiscussions, addDiscussion, addComment,
     removeComment, removeDiscussion, editDiscussion, editComment }