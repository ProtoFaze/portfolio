const router = require('express').Router();
const { Landing, About, Experience, Project, Course, Contact } = require('../models/portfolioModels');
const { Users } = require('../models/user');
// GET /api/portfolio/get-portfolio-data
router.get('/get-portfolio-data', async (req, res) => {
    try {
        // Fetch all data from the database
        const landings = await Landing.find();
        const abouts = await About.find();
        const experiences = await Experience.find();
        const projects = await Project.find();
        const courses = await Course.find();
        const contacts = await Contact.find();

        //check response
        res.status(200).send({
            landing: landings[0],
            about: abouts[0],
            experiences: experiences,
            projects: projects,
            courses: courses,
            contact: contacts[0]
        })
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST /api/portfolio/update-landing
router.post('/update-landing', async (req, res) => {
    try {
        // Update the landing data
        const landing = await Landing.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: landing,
            success: true,
            message: 'Landing section updated successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
router.post('/update-about', async (req, res) => {
    try {
        // Update the about data
        const landing = await About.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: landing,
            success: true,
            message: 'About section updated successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

//add experience
router.post('/add-experience', async (req, res) => {
    try {
        // Create new experience
        const experience = new Experience(req.body);
        await experience.save();
        res.status(200).send({
            success: true,
            message: 'Experience added successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

//update experience
router.post('/update-experience', async (req, res) => {
    try{
        //find experience from database and update it with new data from req.body
        const experience = await Experience.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: 'Experience updated successfully'
        });
    }catch(err){
        res.status(500).send(err);
    }
});

//delete experience
router.post('/delete-experience', async (req, res) => {
    try{
        //find experience from database and delete it
        const experience = await Experience.findOneAndDelete(
            {_id: req.body._id}
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: 'Experience deleted successfully'
        });
    }catch(err){
        res.status(500).send(err);
    }
});

//add project
router.post('/add-project', async (req, res) => {
    try {
        // Create new project
        const project = new Project(req.body);
        await project.save();
        res.status(200).send({
            success: true,
            message: 'Project added successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

//update project
router.post('/update-project', async (req, res) => {
    try{
        //find project from database and update it with new data from req.body
        const project = await Project.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: project,
            success: true,
            message: 'Project updated successfully'
        });
    }catch(err){
        res.status(500).send(err);
    }
});

//delete project
router.post('/delete-project', async (req, res) => {
    try{
        //find project from database and delete it
        const project = await Project.findOneAndDelete(
            {_id: req.body._id}
        );
        res.status(200).send({
            data: project,
            success: true,
            message: 'Project deleted successfully'
        });
    }catch(err){
        res.status(500).send(err);
    }
});

//add courses
router.post('/add-course', async (req, res) => {
    try {
        // Create new courses
        const courses = new Course(req.body);
        await courses.save();
        res.status(200).send({
            success: true,
            message: 'Courses added successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

//update courses
router.post('/update-course', async (req, res) => {
    try{
        //find courses from database and update it with new data from req.body
        const courses = await Course.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: courses,
            success: true,
            message: 'Courses updated successfully'
        });
    }catch(err){
        res.status(500).send(err);
    }
});

//delete courses
router.post('/delete-course', async (req, res) => {
    try{
        //find courses from database and delete it
        const courses = await Course.findOneAndDelete(
            {_id: req.body._id}
        );
        res.status(200).send({
            data: courses,
            success: true,
            message: 'Courses deleted successfully'
        });
    }catch(err){
        res.status(500).send(err);
    }
});

//update contact
router.post('/update-contact', async (req, res) => {
    try {
        // Update the contact data
        const contact = await Contact.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: contact,
            success: true,
            message: 'Contact section updated successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/admin-login', async (req, res) => {
    try {
        const user = await Users.findOne({username: req.body.username, password: req.body.password});
        user.password = undefined;
        if(user){
            res.status(200).send({
                data:user,
                success: true,
                message: 'Login successful'
            });
        }else{
            res.status(200).send({
                success: false,
                message: 'Invalid username or password'
            });
        }
    }catch (err) {
        res.status(500).send(err);
    }
    }        
);
module.exports = router;