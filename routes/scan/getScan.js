module.exports = (app, Scans) => {
    app.get('/getScans/:email/:cartegory', async(req, res) => {
        var result = await Scans.find({ cartegory: req.params.cartegory, email: req.params.email });
        if (!result) res.status(209).json({ message: 'No Scans Found' });
        else res.status(200).json({scans: result});
    })
    .post('/aaScan', async(req, res) => {
        var result = await Scans.find();
        res.send(result);
    });
}