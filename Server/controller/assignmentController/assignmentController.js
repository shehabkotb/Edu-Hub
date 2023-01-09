const { update } = require('../../models/Assignments');
const Assigment = require('../../models/Assignments');

const createAssignment = async (req, res) => {

    const role = req.user.role;

    if (role === 'instructor') {
        try {

            let ass = new Assigment(req.body);
            if (!ass) {
                throw new Error('this an error with ass');
            }
            ass.createdAt = new Date();
            ass.createdBy = req.user.id;
            await ass.save()
            res.status(201).send(ass)
        } catch (e) {
            res.status(400).send();
            console.log(e)
        }
    }
    else {
        res.status(400).send('you are not allow to create assignment');
        console.log('you are not instructor');
    }
}



const getAllAssignment = async (req, res) => {

    try {
        let myAssignment;
        if (req.user.role === 'instructor') {
            myAssignment = await Assigment.find({ createdBy: req.user._id });
        }
        else if (req.user.role === 'student') {
            myAssignment = await Assigment.find({ createdBy: req.user._id, visiable: true });
        }
        else {
            throw new Error('You can\'t open this assignment');
        }
        if (!myAssignment) {
            throw new Error('There is no assignment for you');
        }
        res.status(200).send(myAssignment);
    } catch (e) {
        res.status(400).send('there is no assignment for this course')
    }
}


const getAssignment = async (req, res) => {
    try {
        let myAssignment;
        let Assignment_id = req.params.assigmentId;
        if (req.user.role === 'instructor') {
            myAssignment = await Assigment.findOne({ _id: Assignment_id });
        }
        else if (req.user.role === 'student') {
            myAssignment = await Assigment.findOne({ _id: Assignment_id, visiable: true });

        }
        else {
            throw new Error('You can\'t open this assignment');
        }
        if (!myAssignment) {
            throw new Error('There is no assignment for you');
        }
        res.status(200).send(myAssignment);
    } catch (e) {
        res.status(400).send('there is no assignment for this course')
    }
}


const editStatusForAssignment = async (req, res) => {
    try {
        const id = req.params.assigmentId;
        const updateAssignment = await Assigment.findOneAndUpdate(
            { _id: id ,createdBy: req.user._id},
         
            {
                visiable:!this.visiable
            } ,{
                new: true
              }
        );

        console.log(updateAssignment);
        if (!updateAssignment) {
            throw new Error('updated Assignment is not updated');
        }
        res.status(200).send(updateAssignment);
    }
    catch (e) {
        res.status(400).send();
        console.log(e);
    }
}



const showAssignment = async (req, res) => {
    try {
        const id = req.params.assigmentId;
        const updateAssignment = await Assigment.findOneAndUpdate(
            { _id: id ,createdBy: req.user._id},
         
            {
                visiable:!this.visiable
            } ,{
                new: true
              }
        );
        if (!updateAssignment) {
            throw new Error('updated Assignment is not updated');
        }
        
        res.status(200).send(updateAssignment);
    }
    catch (e) {
        res.status(400).send();
        console.log(e);
    }
}


const editDateForAssignment = async (req, res) => {
    try {
        const id = req.params.assigmentId;
        const updateAssignment = await Assignment.findByIdAndUpdate(
            { _id: id },
            { createdBy: req.user._id },
            {
                $set:
                {
                    startedAt: req.body.startAt,
                    expiredAt: req.body.expiredAt
                }
            },
        );
        console.log(updateAssignment);
        if (!updateAssignment) {
            throw new Error('updated Assignment is not updated');
        }
        res.status(200).send(updateAssignment);
    }
    catch (e) {
        res.status(400).send();
        console.log(e);
    }
}




const deleteAssignment = async (req, res) => {

    const role = req.user.role;
    const id = req.params.assigmentId;
    if (role === 'instructor') {
        try {

            const assignment_delete = await Assigment.findOne({ _id: id, createdBy: req.user._id });
            if (!assignment_delete || (toString(assignment_delete.createdBy) !== toString(req.user._id))) {
                throw new Error('this an error with ass');
            }

            assignment_delete.remove();
            res.status(201).send("deleted")
        } catch (e) {
            res.status(400).send();
            console.log(e)
        }
    }
    else {
        res.status(400).send('you are not allow to delete assignment');
    }
}



module.exports = { createAssignment, getAllAssignment, getAssignment, showAssignment, editStatusForAssignment, editDateForAssignment, deleteAssignment };