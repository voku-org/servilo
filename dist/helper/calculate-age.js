const calculateAge = (birthday) => {
    let birhtDate = new Date(birthday);
    let today = new Date();
    let age = today.getFullYear() - birhtDate.getFullYear();
    let monthDifference = today.getMonth() - birhtDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate())) {
        age--;
    }
    return age;
};
module.exports = {
    calculateAge
};
//# sourceMappingURL=calculate-age.js.map