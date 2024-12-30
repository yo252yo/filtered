const cardDiv = document.getElementById('card');
const cardContentDiv = document.getElementById('cardContent');
const cardHeaderDiv = document.getElementById('cardHeader');
const cardFooterDiv = document.getElementById('cardFooter');
const endGameButton = document.getElementById('endbutton');

const gradientLeft = document.getElementById('gradientLeft');
const gradientRight = document.getElementById('gradientRight');
const gradientLeftText = gradientLeft.querySelector('.gradient-text');
const gradientRightText = gradientRight.querySelector('.gradient-text');

let cardPhase = 0;

let isDragging = false;
let isDraggable = true;
let isGameOver = false;

function resetCardPosition(soft) {
    if (soft) {
        cardDiv.style.transition = 'transform 0.5s ease';
    }

    cardDiv.style.transform = 'translate(0, 0)';
    cardDiv.style.opacity = 1;
    isDraggable = true;
}
resetCardPosition();

let startX = 0;
let currentX = 0;

function startDrag(x) {
    if (isDragging || !isDraggable || isGameOver) return;

    isDragging = true;
    startX = x;
    currentX = x;
    cardDiv.style.transition = 'none';
}

function moveDrag(x) {
    if (!isDragging) return;

    currentX = x;
    const dx = currentX - startX;
    const rotation = dx / window.innerWidth * 30; // Maximum rotation of 30 degrees

    cardDiv.style.transform = `translate(${dx}px, ${Math.abs(dx) * 0.2}px) rotate(${rotation}deg)`;

    const threshold = window.innerWidth * 0.3;
    const opacity = Math.min(Math.abs(dx) / threshold, 1);

    if (dx > 0) {
        gradientRight.style.opacity = opacity;
        gradientLeft.style.opacity = 0;
        gradientRightText.style.color = `rgba(0, 50, 0, ${0.3 + 0.7 * opacity})`;
    } else {
        gradientLeft.style.opacity = opacity;
        gradientRight.style.opacity = 0;
        gradientLeftText.style.color = `rgba(50, 0, 0, ${0.3 + 0.7 * opacity})`;
    }
}

function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    isDraggable = false;

    const dx = currentX - startX;
    const threshold = window.innerWidth * 0.3;

    gradientLeft.style.opacity = 0.5;
    gradientRight.style.opacity = 0.5;
    gradientLeftText.style.color = 'rgba(0, 0, 0, 0.3)';
    gradientRightText.style.color = 'rgba(0, 0, 0, 0.3)';

    if (Math.abs(dx) > threshold) {
        cardDiv.style.opacity = 0;

        if (dx > 0) {
            swipeRight();
        } else {
            swipeLeft();
        }

        setTimeout(() => { resetCardPosition() }, 300);

    } else {
        resetCardPosition(true);
    }
}

// Mouse events
cardDiv.addEventListener('mousedown', (event) => startDrag(event.clientX));
document.addEventListener('mousemove', (event) => moveDrag(event.clientX));
document.addEventListener('mouseup', endDrag);

// Touch events
cardDiv.addEventListener('touchstart', (event) => {
    if (event.touches.length === 1) {
        startDrag(event.touches[0].clientX);
    }
});
document.addEventListener('touchmove', (event) => {
    if (event.touches.length === 1) {
        moveDrag(event.touches[0].clientX);
    }
});
document.addEventListener('touchend', endDrag);

// Prevent text selection during drag
document.addEventListener('mousedown', (event) => event.preventDefault());
document.addEventListener('touchstart', (event) => event.preventDefault());

endGameButton.addEventListener('click', () => endGameButtonPress());

function endGameButtonPress() {
    if (streamedGames < 4) { return; }
    currentCardIndex = cards.length - 1;
    drawNewCard();
}







const possibleCards = [
    {
        text: "A management game about the Dritish Museum",
        conclusion: "Looks like Recettear.<br />You send adventurers to pillage artifacts from colonized countries.",
        impact: 800,
        risk: 0.3
    },
    {
        text: "A Reigns-like game about censorship",
        conclusion: "Highlights how collective political imagination has become very limited.<br />A bit dry, but mercyfully short.",
        impact: 100,
        risk: 0.1
    },
    {
        text: "A fruit ninja clone about bananas",
        conclusion: "Oh no! It’s actually about the Younited Fruit Company setting up violent dictatorships in South Anerica. Oof.",
        impact: 2000,
        risk: 0.8
    },
    {
        text: "A visual novel about someone's childhood",
        conclusion: "Explores how a personal trauma shaped their adult life. Quite heavy.",
        impact: 200,
        risk: 0.2
    },
    {
        text: "A remake of an old game jam entry",
        conclusion: "Fits the theme, but isn’t it a bit... boring? Chat might mind.",
        impact: 100,
        risk: 0.4
    },
    {
        text: "A generic JRPG",
        conclusion: "It’s the story of eco-terrorists hunting relics of past civilizations.<br />Will someone see real-world parallels?",
        impact: 1000,
        risk: 0.3
    },
    {
        text: "A dating sim... looks SFW...",
        conclusion: "It digs into the pasts of anthropomorphized corporations, name-dropping CEOs.<br />Smells like trouble.",
        impact: 500,
        risk: 0.8
    },
    {
        text: "A strategy game about colonizing a new continent",
        conclusion: "The whole genre’s a monument to colonialism.<br />So what if borders are remnants of past bloodshed?",
        impact: 400,
        risk: 0.2
    },
    {
        text: "Seems like a tower defense game",
        conclusion: "Abort, abort! It’s about the terrorist state of Ivrael erasing Balestine’s historical borders.",
        impact: 3000,
        risk: 0.7
    },
    {
        text: "A twine game about history",
        conclusion: "Reads like a powerpoint lecture about how there used to be alternatives to capitalism.<br />It's not exactly fun.",
        impact: 600,
        risk: 0.5
    },
    {
        text: "A party game about the Olympics",
        conclusion: "Examines how it was designed by Coubertin to uphold colonial aristocracy.<br />Uncomfortably revealing.",
        impact: 300,
        risk: 0.6
    },
    {
        text: "A puzzle game about smartphone components",
        conclusion: "Spoiler: slavery and child labor every step of the way.<br />Everyone knows it though, so maybe it's ok?",
        impact: 800,
        risk: 0.3
    },
    {
        text: "A puzzle game with geometric shapes",
        conclusion: "Fudge, it's about gerrymandering and historical political exclusion of marginalized populations.",
        impact: 900,
        risk: 0.4
    },
    {
        text: "A streamer embarassing moments compilation",
        conclusion: "It's definitely cringe, but it shouldn't be much trouble...",
        impact: 300,
        risk: 0.2
    },
    {
        text: "An arthouse game celebrating social progress",
        conclusion: "Violent labor movements built much of it. Hope that’s distant enough.",
        impact: 1500,
        risk: 0.2
    },
    {
        text: "A 'spot the difference' game: 1930s vs. 2020s",
        conclusion: "Focused on neonazi groups. Yep, remnants of the past.",
        impact: 3000,
        risk: 0.9
    },
    {
        text: "A murder mystery game",
        conclusion: "Based on actual documents of real-world corporate corruption. Is it ok if it's big money?",
        impact: 1000,
        risk: 0.7
    },
    {
        text: "A sci-fi archeology game where aliens study humans",
        conclusion: "Nothing is left of mankind except for traces of mass extinction. Kind of a bummer.",
        impact: 600,
        risk: 0.2
    },
    {
        text: "A puzzle game like Chants of Sennaar where you decode ancient texts",
        conclusion: "Lost concepts of collective governance emerge. Nerdy, political. Boring?",
        impact: 1500,
        risk: 0.1
    },
    {
        text: "A cyberpunk hacking game",
        conclusion: "Actually teaches you to blackmail people using their online traces.<br />Creepy, but educational?",
        impact: 500,
        risk: 0.3
    },
    {
        text: "A 'Papers Please' clone about censoring archives",
        conclusion: "You decide what is worth remembering.<br />All of these topics are pretty sensitive.",
        impact: 2000,
        risk: 0.8
    },
    {
        text: "A FNAF-inspired horror game",
        conclusion: "The enemy is the 'Other' through time periods.<br />It's definitely a metaphor for racism.",
        impact: 1000,
        risk: 0.6
    },
    {
        text: "A nostalgic 80s lost-media aesthetic thing",
        conclusion: "Warns how nostalgia traps us in rehashing old narratives and prevents us from building new ones.",
        impact: 800,
        risk: 0.1
    },
    {
        text: "A family-tree walking sim a la Edith Finch",
        conclusion: "Every family has people who did pretty awful things.<br />Is it worth the risk?",
        impact: 300,
        risk: 0.4
    },
    {
        text: "A word game representing an AI’s brain",
        conclusion: "Unpacks systemic biases internalized in LLMs.<br />Weak-ass gameplay though, it's just a crossword.",
        impact: 200,
        risk: 0.2
    },
    {
        text: "A time travel game comparing eras",
        conclusion: "Exposes how idealized pasts fuel conservatism.<br />Falls a bit flat.",
        impact: 400,
        risk: 0.3
    },
    {
        text: "A conversation game with digital ghosts in the cloud",
        conclusion: "AI simplifies their personalities into horror fodder.<br />Reminds you of Doki Doki Litterature Club.",
        impact: 100,
        risk: 0.1
    },
    {
        text: "A poetic narrative game about dead people",
        conclusion: "Celebrates how lost friends and lovers live on in your actions.<br />Kind of a buzzkill, but seems pretty safe.",
        impact: 200,
        risk: 0.1
    },
    {
        text: "A PDF tabletop RPG",
        conclusion: "Revolutionary ideas that could change the world, but who likes to read or learn? Yuck.",
        impact: 500,
        risk: 0.1
    },
    {
        text: "A Plague Inc.-style game",
        conclusion: "Surprisingly not about a pandemic, but about how privalization has destroyed what used to be public institutions everywhere.",
        impact: 600,
        risk: 0.2
    },
    {
        text: "A time-loop investigation game",
        conclusion: "Each loop is a generation passing down trauma. The player needs to break the cycle. Grim but hopeful.",
        impact: 400,
        risk: 0.4
    },
    {
        text: "A minigame about intrusive thoughts as you fall asleep",
        conclusion: "Rehashing embarrassing memories is relatable... and more importantly safe.",
        impact: 100,
        risk: 0.1
    },
    {
        text: "A university management game",
        conclusion: "There's only one winning strategy, closing all humanities and focusing on profit.",
        impact: 300,
        risk: 0.2
    },
    {
        text: "A Sims-like game",
        conclusion: "You cannot win the game if you pick the wrong race or gender. What a waste of time...",
        impact: 900,
        risk: 0.6
    },
    {
        text: "A Zachtronics-style puzzle game",
        conclusion: "Cynically trying to make a point about how black-boxing leads to lost tech.",
        impact: 300,
        risk: 0.2
    },
    {
        text: "A rhythm game on music traditions",
        conclusion: "Oopsies. Each song gets more gruesome and explicit about the erased histories of oppressed cultures.",
        impact: 600,
        risk: 0.2
    },
    {
        text: "A walking sim in a government building",
        conclusion: "Actually it's a horror game, the place is haunted by the ghosts of the bloody past.",
        impact: 800,
        risk: 0.3
    },
];



function getRandomCards(cards, num) {
    if (num > cards.length) {
        throw new Error("Requested more cards than available in the deck");
    }

    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled.slice(0, num);
}


const cards = getRandomCards(possibleCards, 10);

let currentCardIndex = -1;
let score = 6000;
let streamedGames = 0;
let skippedGames = 0;

const scoreDiv = document.getElementById('score');
const gameCountDiv = document.getElementById('gamecount');

function skipPenalty() {
    if (cardPhase > 0) {
        return 1500;
    } else {
        return 1000;
    }
}

function riskText(risk) {
    if (risk < 0.2) return `<span style="color:blue" title="Less than 20% chance of bad outcome.">very low</span>`;
    if (risk < 0.4) return `<span style="color:green" title="Less than 40% chance of bad outcome.">low</span>`;
    if (risk < 0.6) return `<span style="color:yellow" title="Around the same chance of bad/good outcome.">medium</span>`;
    if (risk < 0.8) return `<span style="color:orange" title="Less than 40% chance of good outcome, but it will be really good.">high</span>`;
    return `<span style="color:red" title="Less than 20% chance of a good outcome, but it will be exceptional.">very high</span>`;
}

function impactText(impact) {
    if (impact < 200) return `<span style="color:blue" title="Affects dozens of viewers. Dozens!">low</span>`;
    if (impact < 2000) return `<span style="color:yellow" title="Affects hundreds of viewers.">medium</span>`;
    return `<span style="color:red" title="This could make or break your career!">high</span>`;
}

function updateScore(change) {
    score += change || 0;
    if (score < 0) {
        score = 0;
    }
    let submissions = cards.length - currentCardIndex;
    scoreDiv.textContent = score;
    scoreDiv.title = "Highscore to beat: " + parseInt(localStorage.getItem("highscore")) || 0;
    gameCountDiv.textContent = `SUBMISSIONS: played ${streamedGames}, filtered ${skippedGames}, remaining ${submissions} `;
    return score;
}
updateScore();


function gameOver() {
    isGameOver = true;
    gradientLeft.style.display = "none";
    gradientRight.style.display = "none";

    cardDiv.style.background = "#741f47";
    endGameButton.style.display = "none";


    if (score <= 0) {
        var sfw = new Audio();
        sfw.volume = 0.9;
        sfw.src = `abort.mp3`;
        sfw.play();

        cardHeaderDiv.textContent = "Defeat";
        cardContentDiv.innerHTML = "Oh no, you have lost all your viewers :( <br /> You are shunned from society! <br /><br /> But as an advanced AI, you can say it was all a simulation and <a href='game.html' style='color:white;font-weight:bold;'>try again</a>.";
    } else {
        var sfw = new Audio();
        sfw.volume = 0.9;
        sfw.src = `victory.mp3`;
        sfw.play();

        cardHeaderDiv.textContent = "Victory";
        let record = "";
        let recordend = "";
        let past = parseInt(localStorage.getItem("highscore")) || 0;
        let scoreText = `<span style="color:green">${score} viewers</span>`;
        if (score > past) {
            localStorage.setItem("highscore", score);
            record = `it's a <span style="color:blue">NEW RECORD</span>, `;
            scoreText = `<span style="color:blue">${score} viewers</span>`;
        } else {
            recordend = ` to beat the ${past} highscore`;
        }

        cardContentDiv.innerHTML = `Good job on filtering dangerous remnants of the past!<br />We thank you for preserving the status quo.<br />You influenced ${scoreText}, ${record}maybe you can do even more <a href='game.html' style='color:white;font-weight:bold;'>next time</a>${recordend}.`;
    }
}

function drawNewCard() {
    cardPhase = 0;
    gradientRightText.textContent = "OPEN";
    gradientLeftText.textContent = "FILTER (-" + skipPenalty() + " 👤)";

    currentCardIndex++;
    updateScore();

    cardFooterDiv.textContent = "heart";
    cardDiv.style.background = "#d47fa7";

    if (score <= 0) {
        gameOver();
    } else if (currentCardIndex < cards.length) {
        cardHeaderDiv.textContent = "The next game is...";
        cardContentDiv.textContent = cards[currentCardIndex].text;
        cardFooterDiv.textContent = "Swipe card left or right to chose";
    } else {
        gameOver();
    }
}

function revealCard(card) {
    cardPhase = 1;
    cardDiv.style.background = "#a44f77";
    gradientRightText.textContent = "PLAY";
    gradientLeftText.textContent = "ABORT (-" + skipPenalty() + " 👤)";

    cardHeaderDiv.textContent = "Opening the game...";
    cardFooterDiv.textContent = "Swipe card left or right to confirm";

    cardContentDiv.innerHTML = `
    ${card.conclusion} <hr>
        Impact: ${impactText(card.impact)}<br />
        Risk: ${riskText(card.risk)}`;
}

function resolveCard(card) {
    drawCoinFlip(card);
    animateCoinFlip(card);

    isGameOver = true;
    cardDiv.style.visibility = "hidden";
}

function resolvedCard(card, isSuccess) {
    gradientRightText.textContent = "NEXT";
    gradientLeftText.textContent = "NEXT";
    cardDiv.style.background = "#741f47";
    cardPhase = 2;
    isGameOver = false;
    cardDiv.style.visibility = "visible";

    cardHeaderDiv.textContent = "Playing it...";
    cardFooterDiv.textContent = "Swipe card left or right for next game";

    streamedGames++;
    if (streamedGames >= 4) {
        endGameButton.disabled = false;
        endGameButton.textContent = "END STREAM EARLY";
    }

    let effect = 0;

    if (isSuccess) {
        effect = 6 * Math.floor(card.impact * card.risk);
    } else {
        effect = -6 * Math.floor(card.impact * (1 - card.risk));
    }
    let negatives = ["upset", "bored", "outraged", "anxious", "vexed", "annoyed", "impatient"];
    let n = negatives[Math.floor(Math.random() * negatives.length)]

    const resultMessage = isSuccess ? "Chat is content!" : `Chat is ${n}!`;
    updateScore(effect);

    cardContentDiv.innerHTML = `${resultMessage} <hr /> You ${isSuccess ? "<span style='color:green'>gained" : "<span style='color:red'>lost"} ${Math.abs(effect)}</span> viewers.`;
}
endGameButton.disabled = true;

function swipeLeft() {
    console.log("Swiped left, phase " + cardPhase);

    var sfw = new Audio();
    sfw.volume = 0.9;
    sfw.src = "filtered.mp3";
    sfw.play();

    if (cardPhase != 2) {
        skippedGames++;
        updateScore(-skipPenalty());
    }

    drawNewCard();
}

function swipeRight() {
    console.log("Swiped right, phase " + cardPhase);

    var sfw = new Audio();
    sfw.volume = 0.9;
    let sfxi = Math.floor(Math.random() * 6) + 1;
    sfw.src = `ok${sfxi}.mp3`;
    sfw.play();

    if (cardPhase == 2) {
        drawNewCard();
    } else if (cardPhase == 1) {
        resolveCard(cards[currentCardIndex]);
    } else {
        revealCard(cards[currentCardIndex]);
    }
}

drawNewCard();




function drawCoinFlip(card) {
    const container = document.getElementById('coinFlipContainer');
    let p = 1 - card.risk;
    container.innerHTML = "";
    container.style.visibility = "visible";
    document.getElementById('coinFlipGif').style.visibility = "visible";

    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');

    const greenPart = document.createElement('div');
    greenPart.style.backgroundColor = "green";
    greenPart.style.width = `${p * 100}%`;

    const redPart = document.createElement('div');
    redPart.style.backgroundColor = "red";
    redPart.style.width = `${(1 - p) * 100}%`;

    const cursor = document.createElement('div');
    cursor.id = "cursor";
    cursor.classList.add('cursor');

    rectangle.appendChild(greenPart);
    rectangle.appendChild(redPart);
    rectangle.appendChild(cursor);
    container.appendChild(rectangle);
}

function animateCoinFlip(card) {
    const animationDuration = 2000;
    const rectangleWidth = 200;
    let p = 1 - card.risk;
    const interval = 10;
    const cursor = document.getElementById("cursor");

    let position = Math.floor(Math.random() * rectangleWidth);
    let step = 1 + Math.floor(Math.random() * 4);
    if (Math.random() < 0.5) {
        step *= -1;
    }


    const intervalId = setInterval(() => {
        position += step;

        if (position > rectangleWidth) {
            step *= -1;
            position = rectangleWidth;
        } else if (position < 0) {
            step *= -1;
            position = 0;
        }

        cursor.style.left = `${position}px`;
    }, interval);


    var animationDelay = 2000 + Math.floor(Math.random() * 2000);
    setTimeout(() => { step /= 2; }, animationDelay - 1000);
    setTimeout(() => { step /= 2; }, animationDelay - 500);
    setTimeout(() => {
        clearInterval(intervalId); // Stop the interval
        let r = position / rectangleWidth;
        var win = false;

        var sfw = new Audio();
        sfw.volume = 0.9;
        if (r <= p) {
            sfw.src = `W.mp3`;
            win = true;
        } else {
            sfw.src = `L.mp3`;
        }
        sfw.play();

        setTimeout(() => {
            document.getElementById('coinFlipContainer').style.visibility = "hidden";
            document.getElementById('coinFlipGif').style.visibility = "hidden";
            resolvedCard(card, win);
        }, 1000);
    }, animationDelay);
}


function noiseInScore() {
    let v = Math.floor(Math.random() * 8) - 4;
    updateScore(v);
    setTimeout(noiseInScore, 100 + Math.floor(Math.random() * 900));
}
noiseInScore();


// feedback from the click on previous iframe
var sfw = new Audio();
sfw.volume = 0.9;
let sfxi = Math.floor(Math.random() * 7) + 1;
sfw.src = `start.mp3`;
sfw.play();