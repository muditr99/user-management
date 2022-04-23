const User = require('../models/user');

module.exports.home = function(req, res){
    return res.send('<h1>hello</h1>')
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users');
    }
    return res.render('user_sign_in', {
        title: 'Sign In',
    });
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users');
    }
    return res.render('user_sign_up', {
        title: 'Sign Up',
    });
}

module.exports.create = function(req, res){
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

                return res.redirect('/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){
    return res.redirect('/users');
}