const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Databases connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // MY USER ID
            author: '6406193add2a775a601ea8ab',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut impedit earum facere? Veniam soluta reprehenderit temporibus est nihil ut. Ipsam ratione id nesciunt ad porro voluptatibus, eum ut alias quis?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djjx7w0h9/image/upload/v1678182756/YelpCamp/fsi47qirj5igf7nuyfzz.jpg',
                    filename: 'YelpCamp/fsi47qirj5igf7nuyfzz',
                },
                {
                    url: 'https://res.cloudinary.com/djjx7w0h9/image/upload/v1678181650/YelpCamp/wyslqlovy2tciizxy7u2.jpg',
                    filename: 'YelpCamp/wyslqlovy2tciizxy7u2',
                },
                {
                    url: 'https://res.cloudinary.com/djjx7w0h9/image/upload/v1678181650/YelpCamp/mq5oipunjqcpai8zhmrk.jpg',
                    filename: 'YelpCamp/mq5oipunjqcpai8zhmrk'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})