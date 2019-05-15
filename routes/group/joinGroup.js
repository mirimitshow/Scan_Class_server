module.exports = async (app, Users, Groups) => {
    app.post('/joinGroup', async(req, res) => {   
        let token = req.body.token;     
        let email = req.body.email;     
        await Groups.findOne({ token: token }, function(err, rawContent){
            if(err) throw err;
            rawContent.members.unshift({ email: email });
            rawContent.save(function(err){
                if(err) res.status(400).json({ message: 'No Group Found' });
            });
        });
        
        await Users.findOne({ email: email }, function(err, rawContent){
            if(err) throw err;
            rawContent.group.unshift({ token: token });
            rawContent.save(function(err){
                if(err) res.status(400).json({ message: 'Unable to add group' });
            });
        });

        res.status(200).json({ message: 'success!' });
    })
}