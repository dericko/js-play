import express from 'express';
const app = express();
const port = 3333;

app.get('/', (req, res) => {
    // show all the routes in the response with links to each
    const routes = app._router.stack
        .filter((r) => r.route)
        .map((r) => {
            return {
                method: Object.keys(r.route.methods)[0].toUpperCase(),
                path: r.route.path,
            };
        });
    const html = routes.reduce((acc, r) => {
        return `${acc}<div><a href="${r.path}">${r.method} - ${r.path}</a></div>`;
    }, '');
    res.send(html);
});

// add query params to route
app.get('/authenticate', (req, res) => {
    const { username, password } = req.query;
    if (username === 'admin' && password === 'password') {
        res.send({ message: `Welcome ${username}!` });
    } else if (username !== 'admin') {
        res.status(401).send({ error: 'Invalid username' });
    } else if (password !== 'password') {
        res.status(401).send({ error: 'Invalid password' });
    } else {
        res.status(401).send({ error: 'Unauthorized' });
    }
});

app.get('/users', (req, res) => {
    const usersWithEmails = [
        { name: 'John', email: 'test1@test.com', id: 1 },
        { name: 'Jane', email: 'test2@test.com', id: 2 },
        { name: 'Joe', email: 'test3@test.com', id: 3 },
    ];
    res.send(usersWithEmails);
});

app.get('/nestedData', (req, res) => {
    // a nested array of objects with nested objects and strings and comma-separated lists of attributes
    const data = [
        {
            id: 1,
            name: 'John',
            age: 20,
            address: {
                street: '123 Park St',
                city: 'Anytown',
                state: 'NY',
                zip: 12345
            },
            hobbies: ['guitar', 'hiking', 'biking'],
            longSentenceWithManyCommas: 'This, is, a, long, sentence, with, many, commas',
        },
        {
            id: 2,
            name: 'Jane',
            age: 25,
            address: {
                street: '456 Main St',
                city: 'Othertown',
                state: 'CA',
                zip: 67890
            },
            hobbies: ['running', 'biking', 'swimming'],
            longSentenceWithManyCommas: 'This, is, another, long, sentence, with, many, commas',
        },
        {
            id: 3,
            name: 'Joe',
            age: 30,
            address: {
                street: '789 Broadway',
                city: 'Somewhere',
                state: 'TX',
                zip: 13579
            },
            hobbies: ['movies', 'music', 'swimming'],
            longSentenceWithManyCommas: 'This, is, yet, another, long, sentence, with, many, commas',
        }
    ];
    res.send(data);
});

app.get('/stringData', (req, res) => {
    // a long string of comma-separated words from the start of a book
    const data = 'It, was, the, best, of, times, it, was, the, worst, of, times, it, was, the, age, of, wisdom, it, was, the, age, of, foolishness, it, was, the, epoch, of, belief, it, was, the, epoch, of, incredulity, it, was, the, season, of, Light, it, was, the, season, of, Darkness, it, was, the, spring, of, hope, it, was, the, winter, of, despair, we, had, everything, before, us, we, had, nothing, before, us, we, were, all, going, direct, to, Heaven, we, were, all, going, direct, the, other, way, in, short, the, period, was, so, far, like, the, present, period, that, some, of, its, noisiest, authorities, insisted, on, its, being, received, for, good, or, for, evil, in, the, superlative, degree, of, comparison, only';
    res.send(data);
});

app.get('/testCGInvalid', (req, res) => {
    const data = {
        data: {
          isValid: false,
          c2dTransactionId: null,
          c2dRecordLocator: null,
          partnerOfferUrl: null,
          existingP2PListing: null,
          carDetails: null,
          failedLookup: true,
          lookupUnavailable: null,
          rateLimitError: null,
          vin: null
        },
        errors: []
      }
    res.send(data);
});

app.get('/testCGValid', (req, res) => {
    const data = {
        data: {
            isValid: true,
            c2dTransactionId: '1234567890',
            c2dRecordLocator: { id: '1234567890' },
            partnerOfferUrl: 'https://www.google.com',
            existingP2PListing: { id: '1234567890', status: 'ACTIVE' },
            carDetails: {
                vin: '1234567890',
                year: '2019',
                make: 'Honda',
                model: 'Civic',
                trim: 'EX',
                mileage: 10000,
                exteriorColor: 'Black',
                interiorColor: 'Black',
                engine: '4 Cylinder',
                transmission: 'Automatic',
                drivetrain: 'FWD',
                fuelType: 'Gasoline',
                doors: 4,
                seats: 5,
                description: 'This is a description',
                images: ['https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'],
                options: ['Sunroof', 'Backup Camera'],
                features: ['Bluetooth', 'Navigation'],
                condition: 'USED',
                price: 20000
            },
            failedLookup: null,
            lookupUnavailable: null,
            rateLimitError: null,
            vin: '1234567890'
        },
        errors: []
    }
    res.send(data);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});