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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});