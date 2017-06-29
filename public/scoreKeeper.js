attemptsCounter = 0;
scoreCounter = 0;

//when click 'try', attemptsCounter ++

        if (attemptsCounter === 1 && tryValue == backText) {
            scoreCounter += 5;
        } else if (attemptsCounter === 2 && tryValue == backText) {
            scoreCounter += 3;
        } else if (attemptsCounter === 3 && tryValue == backText) {
            scoreCounter += 1;
        } else if (attemptsCounter > 3 && tryValue != backText) {
            console.log("The answer is " + backText);
            $('.tryText').hide();
        }
        attemptsCounter = 0


        