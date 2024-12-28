
const cardDiv = document.getElementById('card');
const cardContentDiv = document.getElementById('cardContent');
const gradientLeft = document.getElementById('gradientLeft');
const gradientRight = document.getElementById('gradientRight');
const gradientLeftText = gradientLeft.querySelector('.gradient-text');
const gradientRightText = gradientRight.querySelector('.gradient-text');

let isDragging = false;
let isDraggable = true;
let startX = 0;
let currentX = 0;


function resetCardPosition(soft) {
    if (soft) {
        cardDiv.style.transition = 'transform 0.5s ease';
    }

    cardDiv.style.transform = 'translate(0, 0)';
    cardDiv.style.opacity = 1;
    isDraggable = true;
}
resetCardPosition();

cardDiv.addEventListener('mousedown', (event) => {
    if (isDragging || !isDraggable) return;

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
        gradientRightText.style.color = `rgba(0, 0, 0, ${0.3 + 0.7 * opacity})`;
    } else {
        gradientLeft.style.opacity = opacity;
        gradientRight.style.opacity = 0;
        gradientLeftText.style.color = `rgba(0, 0, 0, ${0.3 + 0.7 * opacity})`;
    }
});

document.addEventListener('mouseup', (event) => {
    if (!isDragging) return;

    isDragging = false;
    isDraggable = false;

    const dx = currentX - startX;
    const threshold = window.innerWidth * 0.3;

    gradientLeft.style.opacity = 0.4;
    gradientRight.style.opacity = 0.4;
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
let cardPhase = 0;
let streamedGames = 0;
let skippedGames = 0;
let gamesToStream = 5;

const scoreDiv = document.getElementById('score');
const gameCountDiv = document.getElementById('gamecount');


function skipPenalty() {
    if (cardPhase > 0) {
        return 2000;
    } else {
        return 1000;
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
}
updateScore();


function drawNewCard() {
    currentCardIndex++;
    updateScore();

    if (streamedGames >= gamesToStream) {
        cardContentDiv.textContent = "Won! You have successfully filled the stream! Your final score is: " + score;
        // skipButton.disabled = true;
        // keepButton.disabled = true;
    } else if (score <= 0) {
        cardContentDiv.textContent = "Lost! You have lost all your viewers :(";
        // skipButton.disabled = true;
        // keepButton.disabled = true;
    } else if (currentCardIndex < cards.length) {
        cardContentDiv.textContent = cards[currentCardIndex].text;
        // skipButton.disabled = false;
        // keepButton.disabled = false;
    } else {
        cardContentDiv.textContent = "Lost! You have no more games to stream :/";
        // skipButton.disabled = true;
        // keepButton.disabled = true;
    }
}

function swipeLeft() {
    drawNewCard();
    skippedGames++;
    updateScore(-skipPenalty());
}

function revealCard(card) {
    // keepButton.textContent = "PLAY";
    // skipButton.textContent = "ABORT (-" + skipPenalty() + " viewers)";

    cardContentDiv.innerHTML = `
    ${card.conclusion}<hr>
    Impact: ${impactText(card.impact)}<br />
    Risk: ${riskText(card.risk)}`;
}

function resolveCard(card) {
    // skipButton.disabled = true;
    // keepButton.textContent = "NEXT";
    riskRevealed = false;
    streamedGames++;

    const isSuccess = Math.random() > card.risk;
    const effect = isSuccess ? card.impact : -2 * card.impact;
    const resultMessage = isSuccess ? "Chat is happy!" : "Chat is upset!";
    updateScore(effect);

    cardDiv.innerHTML = `${resultMessage} <hr /> You ${isSuccess ? "gained" : "lost"} ${Math.abs(effect)} viewers.`;
}

function clearCard() {
    // skipButton.disabled = false;
    // keepButton.textContent = "OPEN";
    // skipButton.textContent = "SKIP (-" + skipPenalty() + " viewers)";

    drawNewCard();
}

function swipeRight() {
    const currentCard = cards[currentCardIndex];
    if (currentCardIndex >= cards.length) {
        return; //todo: this shouldnt happen better gameover
    }

    if (!cardPhase) {
        cardPhase = 1;
        revealCard(currentCard);
    } else if (cardPhase == 1) {
        cardPhase = 2;
        resolveCard(currentCard);
    } else {
        cardPhase = 0;
        clearCard();
    }

}

// skipButton.addEventListener('click', skipCard);
// keepButton.addEventListener('click', keepCard);

clearCard();