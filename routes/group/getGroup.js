module.exports = (app, Users, Groups) => {
    app.get('/getGroup/:token', async(req, res) => {
        var result = await Groups.find({ token: req.params.token });
        if (!result) res.status(400).json({ message: 'No Group Found' });
        else res.status(200).json(result);
    })
    app.get('/getUserGroups/:email', async(req, res) => {
        let email = req.params.email;  
        let groups = [];   
        let cnt = 0;
        await Users.findOne({ email: email }, async (err, rawContent)=>{
            if(err) res.status(400).json({ message: err });
            else if(!rawContent) res.status(400).json({ message: 'No User Found' });
            await rawContent.group.forEach(async element => {
                let result = await Groups.findOne({ token: element.token });
                groups.push(result);
                console.log(result);
                cnt++; 
                if (cnt === rawContent.group.length) {
                    res.status(200).json(groups);
                    console.log(groups);
                }
            });
        });
    })
}