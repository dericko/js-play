import express from 'express';
const app = express();
const port = 3333;

app.get('/', (req, res) => {
    res.send('Hello!');
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

app.get('/data', (req, res) => {
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
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});