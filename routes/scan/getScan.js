module.exports = (app, Scans) => {
    app.get('/getScan/:email/:cartegory', async(req, res) => {
        var result = await Scans.find({ cartegory: req.params.cartegory, email: req.params.email });
        if (!result) res.status(204).json({ message: 'No Scans Found' });
        else res.status(200).json({scans: result});
    })
}