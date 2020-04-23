module.exports = (lengthLimit) => {
    const limit = lengthLimit || 101
    return Math.floor(Math.random() * limit); 
} 