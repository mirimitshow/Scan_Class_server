module.exports = (app, Users) => {
    app.get('/getUser/:email', async(req, res) => {
        var result = await Users.findOne({ email: req.params.email });
        if (!result) res.status(209).json({ message: 'No Users Found' });
        else res.status(200).json(result);
    })
}