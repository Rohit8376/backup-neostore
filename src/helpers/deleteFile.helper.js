const fs = require('fs');

const deleteFile = async path => {
    try {
        fs.unlink(path, (err => {
            if (err){
                console.log('from deletefile helper -',err);
                return true;
            } 
            else{
                console.log('successfully deleted the image');
                return true;
            }
        }));
    } catch (error) {
        console.log('there was an error while deleting the file:', error.message);
        return true
    }
}

module.exports = deleteFile;