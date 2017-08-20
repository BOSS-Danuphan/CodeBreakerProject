function guess() {
    let answer = document.getElementById('answer').value;
    let attempt = document.getElementById('attempt').value;
    let maxTrial = 10;
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer == '' && attempt == '')
        setHiddenFields();

    if(!validateInput(input.value)){
        return false;
    }else{
        attempt++;
        document.getElementById('attempt').value = attempt;
    }

    if(getResults(input.value)){ // win
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }else if(attempt > maxTrial){ // lose
        setMessage("You Lose! :(");
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
    while(code.length<4){
        code = '0' + code;
    }
    document.getElementById('answer').value = code;
    document.getElementById('attempt').value = 0;
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
    let html = '';
    html +=
    '<div class="row">' +
        '<span class="col-md-6">' + input + '</span>' +
        '<div class="col-md-6">';

    code = document.getElementById('answer').value;
    correct = true;
    for (let i = 0, len = input.length; i < len; i++) {
        if(input[i] == code[i]){
            html += '<span class="glyphicon glyphicon-ok"></span>';
        }else if(code.indexOf(input[i]) > -1){
            correct = false;
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        }else{
            correct = false;
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';
    results.innerHTML += html;
    return correct;
}

function showAnswer(win) {
    let code = document.getElementById('code');
    code.innerHTML = document.getElementById('answer').value;
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
