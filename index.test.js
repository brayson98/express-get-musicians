// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    it("should return a status of 200 and a JSON array of musicians", async () => {
        const response = await request(app).get("/musicians");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    it("should return at least one musician with correct properties", async () => {
        const response = await request(app).get("/musicians");
        expect(response.body.length).toBeGreaterThan(0);

        // Check that each musician has specific properties (name, instrument)
        const musician = response.body[0];
        expect(musician).toHaveProperty("name");
        expect(musician).toHaveProperty("instrument");
    });




    
})
