
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
const cardDiv = document.getElementById('card');
const skipButton = document.getElementById('skipButton');
const keepButton = document.getElementById('keepButton');

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
    score += change;
    if (score < 0) {
        score = 0;
    }
    let submissions = cards.length - currentCardIndex;
    scoreDiv.textContent = score;
    gameCountDiv.textContent = `SUBMISSIONS: played ${streamedGames}, skipped ${skippedGames}, remaining ${submissions}`;
}

function drawNewCard() {
    currentCardIndex++;

    if (streamedGames >= gamesToStream) {
        cardDiv.textContent = "Won! You have successfully filled the stream! Your final score is: " + score;
        skipButton.disabled = true;
        keepButton.disabled = true;
    } else if (score <= 0) {
        cardDiv.textContent = "Lost! You have lost all your viewers :(";
        skipButton.disabled = true;
        keepButton.disabled = true;
    } else if (currentCardIndex < cards.length) {
        cardDiv.textContent = cards[currentCardIndex].text;
        skipButton.disabled = false;
        keepButton.disabled = false;
    } else {
        cardDiv.textContent = "Lost! You have no more games to stream :/";
        skipButton.disabled = true;
        keepButton.disabled = true;
    }
}

function swipeLeft() {
    drawNewCard();
    skippedGames++;
    updateScore(-skipPenalty());
}

function revealCard(card) {
    keepButton.textContent = "PLAY";
    skipButton.textContent = "ABORT (-" + skipPenalty() + " viewers)";

    cardDiv.innerHTML = `
    ${card.conclusion}<hr>
    Impact: ${impactText(card.impact)}<br />
    Risk: ${riskText(card.risk)}`;
}

function resolveCard(card) {
    skipButton.disabled = true;
    keepButton.textContent = "NEXT";
    riskRevealed = false;
    streamedGames++;

    const isSuccess = Math.random() > card.risk;
    let effect = 0;
    // Make the gain on average be null
    if (isSuccess) {
        effect = card.impact * card.risk;
    } else {
        effect = -1 * card.impact * (1 - card.risk);
    }
    const resultMessage = isSuccess ? "Chat is happy!" : "Chat is upset!";
    updateScore(effect);

    cardDiv.innerHTML = `${resultMessage} <hr /> You ${isSuccess ? "gained" : "lost"} ${Math.abs(effect)} viewers.`;
}

function clearCard() {
    skipButton.disabled = false;
    keepButton.textContent = "OPEN";
    skipButton.textContent = "SKIP (-" + skipPenalty() + " viewers)";

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

skipButton.addEventListener('click', swipeLeft);
keepButton.addEventListener('click', swipeRight);

clearCard();
updateScore(0);