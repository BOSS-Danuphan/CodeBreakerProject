let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let maxTrial = 10;

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == '' && attempt.value == '')
        setHiddenFields();

    if(!validateInput(input.value)){
        return false;
    }else{
        attempt.value = attempt.value+1;
    }

    if(getResults(input.value)){
        setMessage("You Win! :)");
        showAnswer(true);
    }else if(attempt.value > maxTrial){
        setMessage("You lose! :(");
        showAnswer(false);
        showReplay();
    }else{
        setMessage("Incorrect, try again.");
    }

}

//implement new functions here
function setHiddenFields() {
    let code = Math.floor(Math.random()*10000);
    code = code.toString();
    while(code.length>4){
        code = '0' + code;
    }
    answer.value = code;
    attempt.value = "0";
}

function setMessage(msg) {
    let message = document.getElementById('message');
    message.innerHTML = msg;

}

function validateInput(input){
    if( input.length == 4 )
        return true;
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
}

function getResults(input) {
    let results = document.getElementById('results');
    results.innerHTML +=
    '<div class="row">' +
        '<span class="col-md-6">' + input + '</span>' +
        '<span class="col-md-6">';

    code = answer.value;
    correct = true;
    for (let i = 0, len = input.length; i < len; i++) {
        if(input[i] == code[i]){
            results.innerHTML += '<span class="glyphicon glyphicon-ok"></span>';
        }else if(code.indexOf(input[i])){
            correct = false;
            results.innerHTML += '<span class="glyphicon glyphicon-transfer"></span>';
        }else{
            correct = false;
            results.innerHTML += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    results.innerHTML += '</span></div>';
    return correct;
}

function showAnswer(win) {
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    if(win){
        code.className += " success";
    }else{
        code.className += " failure";
    }
}

function showReplay() {
    let guess = document.getElementById('guessing-div');
    let replay = document.getElementById('replay-div');
    guess.style.display = "none";
    replay.style.display = "block";
}
