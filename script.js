//All
//----------------------------------------
let r = i => Math.random()*(i||1);
setInterval(function() {


    let star = document.createElement('div');
    document.body.append(star);
    let s = star.style;
    s.width = `${30+r(30)}px`
    s.height = `${30+r(30)}px`
    s.backgroundColor = `hsl(${r(360)},${25+r(50)}%,${25+r(50)}%)`
    s.position = `absolute`
    s.transition = `${5+r(5)}s cubic-bezier(${r()},${r()},${r()},${r()}) `
    s.left = `${r(window.innerWidth) - 80}px`
    s.top = `-50px`
    s.zIndex = `-5`

    setTimeout(a => {
        s.top = `${window.innerHeight - 80 - r(60)}px`;
        s.transform = `rotate(${r(1500)-1000}deg)`
        s.backgroundColor = `hsl(${r(360)},${25+r(50)}%,${25+r(50)}%)`
        //s.transform = `translate(${r(200)-100}px) rotate(${r(1000)-500}deg)`
    }, 100)

    setTimeout(a => s.backgroundColor = `hsl(${r(360)},${25+r(50)}%,${25+r(50)}%)`, r(500) + 100)
    setTimeout(a => s.opacity = 0, 3000);
    setTimeout(a => star.remove(), 10000);

}, 300)
//----------------------------------------
//Art station
//----------------------------------------

//----------------------------------------
//Main
//----------------------------------------
const text = 'Final project';

const createLetterArray = (string) => {
    return string.split('');
}

const createLetterLayers = (array) => {
    return array.map((letter) => {
        let layer = '';
        //specify # of layers per letter
        for (let i = 1; i <= 2; i++) {
            // if letter is a space
            if(letter == ' '){
                layer += '<span class="space"></span>';
            }else{
                layer += '<span class="letter-'+i+'">'+letter+'</span>';
            }
        }
        return layer;
    });
}

const createLetterContainers = (array) => {
    return array.map((item) => {
        let container = '';
        container += '<div class="wrapper">'+item+'</div>';
        return container;
    });
}

const outputLayers = new Promise(function(resolve, reject) {
    document.getElementById('text').innerHTML = createLetterContainers(createLetterLayers(createLetterArray(text))).join('');
    resolve();
});

const spans = Array.prototype.slice.call(document.getElementsByTagName('span'));
outputLayers.then(() => {
    return spans.map((span) => {
        setTimeout(() => {
            span.parentElement.style.width = span.offsetWidth+'px';
            span.parentElement.style.height = span.offsetHeight+'px';
        }, 250);
    });
}).then(() => {
    let time = 250;
    return spans.map((span) => {
        time += 75;
        setTimeout(() => {
            span.parentElement.style.top = '0px';
        }, time);
    });
});
//----------------------------------------
//Refrigerator
//----------------------------------------
const ventiles = document.querySelectorAll('.ventil');

function turn(elem) {
    if (getDegreeElementById(elem.id) == 0)
        elem.style.transform = `rotate(${elem.d = (elem.d | 0) + 90}deg)`;
    else if (getDegreeElementById(elem.id) == 90)
        elem.style.transform = `rotate(${elem.d = (elem.d | 0) - 90}deg)`;
}
function getDegreeElementById(id_element){
    let element = document.getElementById(id_element);
    let style = window.getComputedStyle(element, null);
    let valueStyle = style.getPropertyValue("-webkit-transform") ||
        style.getPropertyValue("-moz-transform") ||
        style.getPropertyValue("-ms-transform") ||
        style.getPropertyValue("-o-transform") ||
        style.getPropertyValue("transform");
    if(valueStyle == 'none') return 0;
    let values = valueStyle.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    let cos = values[0];
    let sin = values[1];
    let degree = Math.round(Math.asin(sin) * (180/Math.PI));
    if(cos<0){
        addDegree = 90 - Math.round(Math.asin(sin) * (180/Math.PI));
        degree = 90 + addDegree;
    }
    if(degree < 0){
        degree = 360 + degree;
    }
    return degree;
}
function turnLines_() {
    turnLines(this);
}
function turnLines(element) {
    console.log(element.id);
    turn(element);
    let obj = element.className;
    let line = obj[7];
    let column = obj[9];
    for (let i = 0; i < ventiles.length; i++) {
        if((ventiles[i].className[7] == line) && (ventiles[i].className[9] == column)) {
        }
        else if(ventiles[i].className[7] == line) {
            turn(ventiles[i]);
        }
        else if(ventiles[i].className[9] == column){
            turn(ventiles[i]);
        }
    }
}
function restart() {
    for(let i = 0; i < ventiles.length; i++) {
        if(getDegreeElementById(ventiles[i].id) == 90){
            turn(ventiles[i]);
        }
    }
}
function start() {

    for (let j = 0; j < 10; j++) {
        let r = Math.floor(Math.random() * 10);
        turnLines(ventiles[r]);
        console.log(r);
    }
}
ventiles.forEach(ventil => ventil.addEventListener('click', turnLines_))
//----------------------------------------
//Timer
//----------------------------------------
let hours_input = document.querySelector(".hours");
let minutes_input = document.querySelector(".minutes");
let seconds_input = document.querySelector(".seconds");

let button = document.querySelector(".start");
button.addEventListener("click", StartTheFire);

let ms_timer = document.querySelector(".timer");

function GetTimeInSeconds()
{
    let hours = hours_input.value;
    let minutes = minutes_input.value;
    let seconds = seconds_input.value;
    let value = Number(hours)*3600 + Number(minutes)*60 + Number(seconds);
    return value;
}


function UpdateMsTimer(new_time)
{
    ms_timer.innerText = new_time + "ms";
}

function StartTheFire()
{
    if(GetTimeInSeconds() <= 0)
        return;
    button.removeEventListener("click", StartTheFire);
    button.innerText = "Подождите окончания таймера";
    let timer = new Promise(function(resolve, reject)
    {
        let start_time = Date.now();
        let ref_time = start_time;
        let time_left_in_ms = GetTimeInSeconds()*1000;
        UpdateMsTimer(time_left_in_ms);
        let timerId = setInterval(function()
        {
            let dt = Date.now() - ref_time;
            ref_time += dt;
            time_left_in_ms = time_left_in_ms - dt;
            UpdateMsTimer(time_left_in_ms);
            console.log(time_left_in_ms);
            if(time_left_in_ms <= 0)
            {
                UpdateMsTimer(0)
                resolve();
            }

        }, 100);
        setTimeout(() => {clearInterval(timerId);}, GetTimeInSeconds()*1000);
    })

    timer.then(function()
    {
        alert('Время вышло!');
        button.addEventListener("click", StartTheFire);
        button.innerText = "Старт";
        ms_timer.innerText = '';
    });
}