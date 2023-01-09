const User = require('../../models/user') ; 
const crypto = require('crypto');


const RECOVER = async(req,res)=>{
    try{
        const user = await User.find({email:req.body.email}) ;
        if(!user)
        {
            throw new Error('invalid Email') ;
        }
        let plainResetToken = crypto.randomBytes(32).toString("hex");

	let passwordResetToken = crypto
		.createHash("sha256")
		.update(plainResetToken)
		.digest("hex");

	let passwordResetValidity = new Date(Date.now() + 15 * 60 * 1000);

        const resetUser = await User.findByIdAndUpdate({"_id":user._id}, 
            { $set:
                {
                    'passwordResetToken':passwordResetToken , 
                    'passwordResetValidity':passwordResetValidity,
                    
                }
            }
        )

        if(!resetUser)
        {
            throw new Error('reset User Err') ;
        }

        res.status(200).send(resetUser) ;     

    }catch(e)
    {
        res.status(400).send('email not founded') ; 
        console.log(e)
    } 
}

const RESET = async(req,res)=>{
    try{
        const user = await User.findOne({
            passwordResetToken: req.params.token, 
            passwordResetValidity : {$gt: Date.now()}
        })
        if(!user)
        {
            throw new Error ('usertoken is invalid or has been expired')
        }

        res.status(200).render('reset' , {user}) ; 
    }catch(e)
    {
        res.status(400).send('Password reset token is invalid or has been expired')
    }
}

const ResetPassword = async(req,res)=>{
    try{
        const user = await User.findOne({
            passwordResetToken: req.params.token, 
            passwordResetValidity : {$gt: Date.now()}
        })
        if(!user)
        {
            throw new Error ('usertoken is invalid or has been expired')
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetValidity = undefined;

        res.status(200).send('Your password has been updated.');
    }catch(e)
    {
        res.status(500).send('Password reset token is invalid or has been expired')
    }
}

module.exports = {RECOVER, RESET , ResetPassword}