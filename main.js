const text = document.getElementById("text");
const main = document.getElementById("main");

const audio = new Audio("k1key.mp3");
const audioBackspace = new Audio("k2backspace.mp3");

const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Блок повторного набора текста на клаве.
 */
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

/**
 * 1 символ раз в 90мс. Затем его посимвольное удаление.
 * Ниже текст, который будет выводиться на экран.
 */
async function writeText(content) {
   const letters = new Array();
   audio.play();
   for (let c = 0; c < content.length; c++) {
        const letter = content[c];
        if (letter === '^') {
            audio.pause();
            await sleep(1000);
            audio.play();
        } else {
            letters.push(letter);
            text.innerHTML = letters.join("");
            await sleep(90);
        }
    }
    audio.pause();
    await sleep(1600);
    audioBackspace.play();
    await sleep(150);
    while (letters.pop()) {
        text.innerHTML = letters.join("");
        await sleep(20);
    }
    await sleep(150);
}

/**
 * Этот блок отвечает за реверс фона и текста. Если текст белый, то фон темным - и наоборот.
 * @returns Promise, который завершается спустя 650мс (0.65с) после вызова.
 */
async function reverse() {
    return new Promise(res => {
        main.style.backgroundColor == "rgb(25, 25, 25)" ? main.style.backgroundColor = "white" : main.style.backgroundColor = "rgb(25, 25, 25)";
        console.log("bg color is " + main.style.backgroundColor);
        text.style.color == "white" ? text.style.color = "black" : text.style.color = "white";
        setTimeout(res, 650);
    });
}

const startButton = document.getElementById("start");
const panelTop = document.getElementById("overlay-top");
const panelBottom = document.getElementById("overlay-bottom");

/**
 * Начало.
 */
 async function startExecution() {
    startButton.style.opacity = "0";
    await sleep(1200);
    startButton.style.display = "none";
    panelTop.style.height = "0px";
    panelBottom.style.height = "0px";
    await sleep(1200);
    startTextWriter().then(async () => {
        await sleep(1200);
        panelTop.style.height = "50%";
        panelBottom.style.height = "50%";
    })
}

/**
 * Магия.
 */
async function startTextWriter() {
    await writeText("Привет.");
    await writeText("Собственно, это моё первое знакомство с Git...");
    await writeText("Даже не знаю, чем дополнить этот текст...");
    await reverse();
    await writeText("Взглянув на 2022 год, я понял одно - поздно уже учиться программированию");
    await writeText("Да, ну а что поделать - курсы нынче дорогие, а самоучение даст по нервам, что будь здоров :D");
    await reverse();
    await writeText("Чем бы ещё дополнить?");
    await writeText("Ну, у меня есть свой сервер в Дискорд, где я собрал много дружелюбных участников, с которыми можно поиграть во что-нибудь. Практически каждый из них мой друг. ❤️ вас!")
    await reverse();
}

//document.addEventListener("DOMContentLoaded", startExecution);
