const checkReqBody = async function (content){
    if(!content || content.length===0){
        return `Provide enough information to add a new product`
    }
}

module.exports = checkReqBody;