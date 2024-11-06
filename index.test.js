const request = require('supertest');
const app = require('./src/app'); // Ensure you're pointing to the correct path for app
const  {db}  = require('./db/connection'); // Import the db and model
const {Musician, Band} = require('./models/index')

beforeAll(async () => {
    // Sync the database before running any tests
    await db.sync({ force: true }); // Resets the database for tests
});



describe('Musician Routes', () => {

    // Test GET /musicians (fetch all musicians)
    it('should return all musicians', async () => {
        // First, create a musician to test the GET /musicians route
        await Musician.create({ name: 'John Doe', genre: 'Rock' });

        const response = await request(app).get('/musicians');

        expect(response.status).toBe(200); // Status code should be 200
        expect(Array.isArray(response.body)).toBe(true); // Should return an array of musicians
        expect(response.body.length).toBeGreaterThan(0); // Should contain at least 1 musician
        
    });

    // Test GET /musicians/:id (fetch a single musician by ID)
    it('should return a musician by ID', async () => {
        const musician = await Musician.create({ name: 'Jane Doe', genre: 'Pop' });

        const response = await request(app).get(`/musicians/${musician.id}`);

        expect(response.status).toBe(200);
        
    })
    // Test GET /musicians/:id for a non-existent musician
    it('should return 404 for a non-existent musician', async () => {
        const response = await request(app).get('/musicians/99999'); // Random ID that doesn't exist

        expect(response.status).toBe(404); // Should return 404 for non-existent resource
       
    });

    // Test POST /musicians (create a new musician)
    it('should create a new musician', async () => {
        const newMusician = { name: 'David Bowie', genre: 'Rock' };

        const response = await request(app)
            .post('/musicians')
            .send(newMusician);

        expect(response.status).toBe(201); // Should return 201 for successful creation
        
    });

    // Test PUT /musicians/:id (update an existing musician)
    it('should update a musician', async () => {
        const musician = await Musician.create({ name: 'Elvis Presley', genre: 'Rock' });

        const updatedMusician = { name: 'Elvis Presley', genre: 'Pop' };

        const response = await request(app)
            .put(`/musicians/${musician.id}`)
            .send(updatedMusician);

        expect(response.status).toBe(200);
        
    });

    // Test DELETE /musicians/:id (delete a musician)
    it('should delete a musician', async () => {
        const musician = await Musician.create({ name: 'Freddie Mercury', genre: 'Rock' });

        const response = await request(app).delete(`/musicians/${musician.id}`);

        expect(response.status).toBe(204); // Should return 204 for successful deletion (no content)
    });

    // Test DELETE /musicians/:id for a non-existent musician
    it('should return 404 when trying to delete a non-existent musician', async () => {
        const response = await request(app).delete('/musicians/99999'); // Random ID

        expect(response.status).toBe(404);
        
    });
});

describe('Band Routes', () => {
    it('should return all bands', async () => {
        
        await Band.create({ name: 'John Doe', genre: 'Rock' });

        const response = await request(app).get('/bands');

        expect(response.status).toBe(200); // Status code should be 200
        expect(Array.isArray(response.body)).toBe(true); // Should return an array of bands
        expect(response.body.length).toBeGreaterThan(0); // Should contain at least 1 band
        
    });

    it('GET /bands/:id should return a band and its musicians', async () => {
        const band = await Band.create({ name: 'Test', genre: 'Test' });

        const response = await request(app).get(`/bands/${band.id}`);

        expect(response.status).toBe(200);
    });

    it('GET /bands/:id should return 404 if band is not found', async () => {
        const response = await request(app).get('/bands/99999'); // Non-existing ID

        expect(response.status).toBe(404);
        
    });
});