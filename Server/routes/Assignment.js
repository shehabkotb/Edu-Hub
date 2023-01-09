const express = require('express') ; 
const auth = require('../middleware/auth')
const router = new express.Router()
const {createAssignment ,getAllAssignment,getAssignment,showAssignment,editStatusForAssignment,editDateForAssignment ,deleteAssignment} = require('../controller/assignmentController/assignmentController') ; 

router.post('/:courseId/CreateAssignment',auth,createAssignment) ; 
router.get('/:courseId/gettingAllAssignment' , auth , getAllAssignment) ; 
router.get('/:courseId/getAssignment/:assigmentId', auth , getAssignment) ; 
router.patch('/:courseId/editStatus/:assigmentId' , auth , editStatusForAssignment);
router.patch('/:courseId/showAssignment/:assigmentId' , auth , showAssignment);
router.patch('/:courseId/editDate/:assigmentId' , auth , editDateForAssignment);
router.delete('/:courseId/deleteAssignment/:assigmentId' , auth , deleteAssignment) ;

module.exports = router

