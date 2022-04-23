const User = require('../models/user');

module.exports.list = function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log("error in fetching contacts from db", err);
        }
        // console.log(contacts);
        return res.render('user_management', {
            title: 'users',
            users: users,
        })
    });
}

module.exports.addUser = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('error in checking if the user already signup before', err);
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up', err);
                    return;
                }

                return res.redirect('/users');
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.editUser = function(req, res){
    User.findOneAndUpdate(req.body.email, req.body, { new: true }, function(err, user){
        if(err){
            console.log('error in updating the user', err);
            return;
        }
        user.save();
        return res.redirect('/users');
    })
}

module.exports.removeUser = function(req, res){
    console.log(req.query);
    let id = req.query.id;
    User.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in removing user', err);
            return;
        }
        return res.redirect('/users');
    })
}