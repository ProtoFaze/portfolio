const mongoose = require('mongoose');
require('dotenv').config();

const { Landing, About, Experience, Project, Course, Contact } = require('./models/portfolioModels');
const { Users } = require('./models/user');

// Connect to MongoDB
mongoose.connect(process.env.mongo_url, { dbName: process.env.dbName });

const fetchData = async () => {
    try {
        console.log('Fetching data from MongoDB Atlas...\n');

        // List database names
        const admin = mongoose.connection.db.admin();
        const { databases } = await admin.listDatabases();
        console.log('Available Databases:');
        databases.forEach(db => console.log(` - ${db.name}`));
        console.log(`Currently connected to: ${mongoose.connection.db.databaseName}\n`);

        // Fetch Landing data
        const landing = await Landing.find({});
        console.log('📄 Landing Data:');
        console.log(JSON.stringify(landing, null, 2));
        console.log(`✓ Found ${landing.length} landing record(s)\n`);

        // Fetch About data
        const about = await About.find({});
        console.log('👤 About Data:');
        console.log(JSON.stringify(about, null, 2));
        console.log(`✓ Found ${about.length} about record(s)\n`);

        // Fetch Experience data
        const experiences = await Experience.find({});
        console.log('💼 Experience Data:');
        console.log(JSON.stringify(experiences, null, 2));
        console.log(`✓ Found ${experiences.length} experience record(s)\n`);

        // Fetch Projects data
        const projects = await Project.find({});
        console.log('🚀 Projects Data:');
        console.log(JSON.stringify(projects, null, 2));
        console.log(`✓ Found ${projects.length} project record(s)\n`);

        // Fetch Courses data
        const courses = await Course.find({});
        console.log('📚 Courses Data:');
        console.log(JSON.stringify(courses, null, 2));
        console.log(`✓ Found ${courses.length} course record(s)\n`);

        // Fetch Contact data
        const contacts = await Contact.find({});
        console.log('📧 Contact Data:');
        console.log(JSON.stringify(contacts, null, 2));
        console.log(`✓ Found ${contacts.length} contact record(s)\n`);

        // Fetch Users data
        const users = await Users.find({});
        console.log('👥 Users Data:');
        console.log(JSON.stringify(users, null, 2));
        console.log(`✓ Found ${users.length} user record(s)\n`);

        console.log('==========================================');
        console.log('Summary:');
        console.log(`Landing: ${landing.length}`);
        console.log(`About: ${about.length}`);
        console.log(`Experiences: ${experiences.length}`);
        console.log(`Projects: ${projects.length}`);
        console.log(`Courses: ${courses.length}`);
        console.log(`Contacts: ${contacts.length}`);
        console.log(`Users: ${users.length}`);
        console.log('==========================================');

        mongoose.connection.close();
        console.log('\n✓ Database connection closed');
        
    } catch (error) {
        console.error('Error fetching data:', error);
        mongoose.connection.close();
    }
};

// Wait for connection before fetching
mongoose.connection.on('connected', () => {
    console.log('✓ Connected to MongoDB Atlas\n');
    fetchData();
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});