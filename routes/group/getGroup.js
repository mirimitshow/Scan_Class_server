module.exports = (app, Users, Groups) => {
    app.get('/getGroup', async(req, res) => {
        var result = await Groups.find({ token: req.body.token });
        if (!result) res.status(400).json({ message: 'No Group Found' });
        else res.status(200).json(result);
    })
}