let tableList = require('../data/employees');


module.exports = function (app) {

    /**
     * GET the employees
     */
    app.get('/api/epmployees', function (req, res) {
        res.json(epmployees);
    });

    /**
     * GET the tablelist 
     */
    app.get('/api/epmployees', function (req, res) {
        res.json(tableList);
    });

    //gets the closest match
    const closeMatch = {
        name: '',
        photo: '',
        scoreDiff: Infinity
    };

    var userInput = req.body;
    var userScores = userInput.scores;

    //calculates difference
    let calcDiff;

    for (let i = 0; i < employees.length; i++) {
        const eachEmployee = employees[i];
        calcDiff = 0;


        for (let j = 0; j < eachEmployee.scores.length; j++) {
            const eachEmployeeScore = eachEmployee.scores[j];
            const eachUserScore = userScores[j];


            calcDiff += Math.abs(parseInt(eachUserScore) - parseInt(eachEmployeeScore));
        }

        //I
        if (calcDiff <= closeMatch.scoreDiff) {

            closeMatch.name = eachEmployee.name;
            closeMatch.photo = eachEmployee.photo;
            closeMatch.scoreDiff = calcDiff;
        }
    }

    //save users data
    employees.push(userInput);

    //json with match
    res.json(closeMatch);
}


