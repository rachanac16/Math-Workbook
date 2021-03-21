var x = Math.floor(Math.random()*1000);
var y = Math.floor(Math.random()* 1000);
var i=0;

var questionArray = [];
var answers = [];
var score = new Array(11);
score[0] = 0

function check(x,y,i){
    if(i>0){

        var t = "progress-" + i.toString();
        if(document.getElementsByClassName(t)[0].classList.contains("right")){
            document.getElementsByClassName(t)[0].classList.remove("right");
        }
        if(document.getElementsByClassName(t)[0].classList.contains("wrong")){
            document.getElementsByClassName(t)[0].classList.remove("wrong");
        }

        ans = document.getElementsByTagName("input")[0];
        answers[i] = ans.value;
        console.log(i);
        if(ans.value == x+y){
            //var t = "progress-" + i.toString();
            score[i] = 1;
            document.getElementsByClassName(t)[0].classList.add("right");
        }else{
            //var t = "progress-" + i.toString();
            score[i] = 0;
            document.getElementsByClassName(t)[0].classList.add("wrong");
        }
        ans.value = "";
        console.log(questionArray);
    }
    
}

function toggle(i){
    var t = "progress-" + i.toString();
    document.getElementsByClassName(t)[0].classList.toggle("active");
}

var b;

function nextQuestion(){

    //butt = document.getElementById("nextQ");
    if(i<10){
        check(x,y,i);
        // butt.classList.remove();
        // butt.classList.add("btn-info");
        // butt.innerHTML = "<strong style=\"margin-right:5px;\">Next Question</strong><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>"
        i++;
        if(i===1){
            toggle(i);
        }else{
            toggle(i-1);
            toggle(i);
        }
        if(questionArray.length >= 2*i){
            x = questionArray[2*(i-1)];
            y = questionArray[2*(i-1) + 1];
        }else{
            x = Math.floor(Math.random() * 1000);
            y = Math.floor(Math.random() * 1000);
            questionArray.push(x);
            questionArray.push(y);
        }

        document.getElementById("x").innerHTML = x;
        document.getElementById("y").innerHTML = y;
        if(answers.length > i){
            document.getElementsByTagName("input")[0].value = answers[i];
        }
    }

    if(i == 10){
        b = document.getElementById("hidden");
        b.style.display = "block";
        console.log(questionArray);
    }
}

function prevQuestion(){
    if(i<=1){
        return;
    }
    b = document.getElementById("hidden");
    b.style.display = "none";
    i--;
    toggle(i+1);
    toggle(i);
    x = questionArray[2*(i-1)];
    y = questionArray[2*(i-1) + 1];
    document.getElementsByTagName("input")[0].value = answers[i];
    document.getElementById("x").innerHTML = x;
    document.getElementById("y").innerHTML = y;
    check();
}

function seeResult(){
    if(x+y == document.getElementsByTagName("input")[0].value){
        score[10] = 1;
    }else{
        score[10] = 0;
    }
    console.log(score);
    var sum = score.reduce((a,b)=>a+b,0);
    console.log(sum);
    res = document.getElementById("result");
    res.style.display = "flex";
    res.style.flexDirection = "row";
    res.style.justifyContent = "center";
    res.style.alignItems = "center";
    
    var message = sum + "/10";

    var stars = sum*10 + 500;

    document.getElementById("message").innerHTML = message;
    document.getElementById("stars").innerHTML = stars;
    document.getElementsByTagName("body")[0].style.width = "100%";
    document.getElementsByClassName("progress-wrapper")[0].style.display = "none";
    document.getElementsByClassName("display")[0].style.display = "none";
    document.getElementsByClassName("hint")[0].style.display = "none";

}

function showHint(){
    document.getElementById("hover").style.display = "inline";
}

function hideHint(){
    document.getElementById("hover").style.display = "none";

}