const CHARACTERS =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Encode Number to Base62
 */

function encodeBase62(number) {

    if (number === 0) {
        return "0";
    }

    let shortCode = "";

    while (number > 0) {

        const remainder = number % 62;

        shortCode =
            CHARACTERS[remainder] + shortCode;

        number = Math.floor(number / 62);
    }
    

    return shortCode;
}


module.exports = {
    encodeBase62,
};