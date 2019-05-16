module.exports = (app, Boards) => {
    app.get('/getBoard/:token', async(req, res) => {
        var result = await Boards.find({ token: req.params.token });
        if (!result) res.status(400).json({ message: 'No Board Found' });
        else res.status(200).json(result);
    })
}