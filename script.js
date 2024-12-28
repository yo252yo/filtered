
const cardDiv = document.getElementById('card');
const cardContentDiv = document.getElementById('cardContent');
const cardHeaderDiv = document.getElementById('cardHeader');
const cardFooterDiv = document.getElementById('cardFooter');

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

cardDiv.addEventListener('mousedown', (event) => {
    if (isDragging || !isDraggable || isGameOver) return;

    isDragging = true;
    startX = event.clientX;
    cardDiv.style.transition = 'none';
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    currentX = event.clientX;
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
});

document.addEventListener('mouseup', (event) => {
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
        //  cardDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
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
});

// Prevent text selection during drag
document.addEventListener('mousedown', (event) => {
    event.preventDefault();
});
















const cards = [
    {
        text: "A shop management game about the Gritish Museum",
        conclusion: "It is a pretty humorous, Recettear kind of game. You send teams of adventurers to pillage artifacts from colonized countries.",
        impact: 500,
        risk: 0.3
    },
    {
        text: "An abstract choice-based game about self-censorship",
        conclusion: "It is Reigns-like game where you chose what you can or can't say on stream.",
        impact: 100,
        risk: 0.1
    },
    {
        text: "An economy game about bananas",
        conclusion: "Oh no! It's actually about the bloody dictatorships that the Younited Fruit Company installed in South Anerica!",
        impact: 2000,
        risk: 0.8
    },
    { text: "A board game adaptation of colonial land grabbing", conclusion: "Hits a nerve with many", impact: 800, risk: 0.6 },
    { text: "A documentary-style game about the Dutch East India Company", conclusion: "Critically acclaimed!", impact: 1000, risk: 0.2 },
    { text: "A simulation game exploring the role of international banks in shaping global poverty", conclusion: "Draws some controversy", impact: 600, risk: 0.7 },
    { text: "A simple platformer about mining", conclusion: "It's actually a commentary on child labor in cobalt mines", impact: 700, risk: 0.5 },
    { text: "A trivia game about spices", conclusion: "Unveils the brutal history of the spice trade", impact: 400, risk: 0.3 },
    { text: "A clicker game about oil production", conclusion: "Criticized for being too on-the-nose", impact: 500, risk: 0.8 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
    { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 }
];

let currentCardIndex = -1;
let score = 10000;
let streamedGames = 0;
let skippedGames = 0;

const scoreDiv = document.getElementById('score');
const gameCountDiv = document.getElementById('gamecount');

function skipPenalty() {
    if (cardPhase > 0) {
        return 1000;
    } else {
        return 500;
    }
}

function riskText(risk) {
    if (risk < 0.2) return "very low";
    if (risk < 0.4) return "low";
    if (risk < 0.6) return "medium";
    if (risk < 0.8) return "high";
    return "very high";
}

function impactText(impact) {
    if (impact < 200) return "low";
    if (impact < 2000) return "medium";
    return "high";
}

function updateScore(change) {
    score += change || 0;
    if (score < 0) {
        score = 0;
    }
    let submissions = cards.length - currentCardIndex;
    scoreDiv.textContent = score;
    gameCountDiv.textContent = `SUBMISSIONS: played ${streamedGames}, filtered ${skippedGames}, remaining ${submissions}`;
    return score;
}
updateScore();


function gameOver() {
    isGameOver = true;
    gradientLeft.style.display = "none";
    gradientRight.style.display = "none";
}

function drawNewCard() {
    cardPhase = 0;
    gradientRightText.textContent = "OPEN";
    gradientLeftText.textContent = "FILTER (-" + skipPenalty() + " 👤)";

    currentCardIndex++;
    updateScore();

    cardFooterDiv.textContent = "heart";

    if (score <= 0) {
        cardHeaderDiv.textContent = "Game over";
        cardContentDiv.textContent = "Lost! You have lost all your viewers :(";
        gameOver();
    } else if (currentCardIndex < cards.length) {
        cardHeaderDiv.textContent = "The next game is...";
        cardContentDiv.textContent = cards[currentCardIndex].text;
        cardFooterDiv.textContent = "Swipe card left or right to chose";
    } else {
        cardHeaderDiv.textContent = "Game over";
        cardContentDiv.textContent = "You have no more games to stream :/";
        gameOver();
    }
}

function revealCard(card) {
    cardPhase = 1;
    gradientRightText.textContent = "PLAY";
    gradientLeftText.textContent = "ABORT (-" + skipPenalty() + " 👤)";

    cardHeaderDiv.textContent = "At first glance...";
    cardFooterDiv.textContent = "Swipe card left or right to confirm";

    cardContentDiv.innerHTML = `
    ${card.conclusion}<hr>
    Impact: ${impactText(card.impact)}<br />
    Risk: ${riskText(card.risk)}`;
}

function resolveCard(card) {
    gradientRightText.textContent = "NEXT";
    gradientLeftText.textContent = "NEXT";
    cardPhase = 2;

    cardHeaderDiv.textContent = "Outcome...";
    cardFooterDiv.textContent = "Swipe card left or right for next game";

    streamedGames++;

    const isSuccess = Math.random() > card.risk;
    const effect = isSuccess ? card.impact : -2 * card.impact;
    const resultMessage = isSuccess ? "Chat is happy!" : "Chat is upset!";
    updateScore(effect);

    cardContentDiv.innerHTML = `${resultMessage} <hr /> You ${isSuccess ? "gained" : "lost"} ${Math.abs(effect)} viewers.`;
}

function swipeLeft() {
    console.log("Swiped left, phase " + cardPhase);

    if (cardPhase != 2) {
        skippedGames++;
        updateScore(-skipPenalty());
    }

    drawNewCard();
}

function swipeRight() {
    console.log("Swiped right, phase " + cardPhase);

    if (cardPhase == 2) {
        drawNewCard();
    } else if (cardPhase == 1) {
        resolveCard(cards[currentCardIndex]);
    } else {
        revealCard(cards[currentCardIndex]);
    }
}

drawNewCard();