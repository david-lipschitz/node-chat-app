var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

// http://www.google.com/maps?q=-33.787904,18.4623104
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage, generateLocationMessage};