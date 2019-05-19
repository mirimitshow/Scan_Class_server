module.exports = (app, Boards) => {
    app.get('/getBoard/:token', async(req, res) => {
        var result = await Boards.find({ token: req.params.token });
        if (!result) res.status(400).json({ message: 'No Board Found' });
        else res.status(200).json(result);
    })
    .get('/getGroupBoards/:token', async(req, res) => {
        let token = req.params.token;  
        await Boards.find({ group_token: token }, async (err, rawContent)=>{
            if(err) res.status(400).json({ message: err });
            else if(!rawContent) res.status(204).json({ message: 'No Board Found' });
            res.status(200).json({boards: rawContent});
        });
    })
    .post('/aaBoard', async(req, res) => {
        var result = await Boards.find();
        res.send(result);
    });
}