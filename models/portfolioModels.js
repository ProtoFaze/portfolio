const mongoose = require('mongoose');

const landingSchema = new mongoose.Schema({
    welcomeText: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
},{collection: 'landing'});

const aboutSchema = new mongoose.Schema({
    lottieURL: {
        type: String,
        required: true,
    },
    description1: {
        type: String,
        required: true,
    },
    description2: {
        type: String,
        required: true,
    },
    skills:{
        type: Array,
        required: true,
    },
},{collection: 'about'});

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        required: true,
    },
    startYear: {
        type: String,
        required: true,
    },
    endMonth: {
        type: String,
        required: true,
    },
    endYear: {
        type: String,
        required: true,
    },
    entity: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},{collection: 'experiences'});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
},{collection: 'projects'});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
},{collection: 'courses'});

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    socials: {
        type: Array,
        required: true,
    },
},{collection: 'contacts'});

module.exports = {
    Landing: mongoose.model('landing', landingSchema),
    About: mongoose.model('about', aboutSchema),
    Experience: mongoose.model('experience', experienceSchema),
    Project: mongoose.model('project', projectSchema),
    Course: mongoose.model('course', courseSchema),
    Contact: mongoose.model('contact', contactSchema),
};