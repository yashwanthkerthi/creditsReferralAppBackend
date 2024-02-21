const uniqueString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

const generateReferralCode = (length) =>{
    let code = ""
    for(let i=0;i<length;i++){
        code += uniqueString[Math.floor(Math.random()*uniqueString.length)]
    }
    return code
}

module.exports =  generateReferralCode

