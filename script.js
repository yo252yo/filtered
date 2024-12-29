
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
















const possibleCards = [
    {
        text: "A management game about the Dritish Museum",
        conclusion: "It is a pretty humorous game similar to Recettear. You send teams of adventurers to pillage artifacts from colonized countries.",
        impact: 800,
        risk: 0.3
    },
    {
        text: "A Reigns-like choice game about censorship",
        conclusion: "It is trying to make a point about how our political imagination has become formatted. Dry, but fortunately it's short.",
        impact: 100,
        risk: 0.1
    },
    {
        text: "An game about the history of banana cultivation",
        conclusion: "Oh no! It's actually about the bloody dictatorships that the Younited Fruit Company installed in South Anerica!",
        impact: 2000,
        risk: 0.8
    },
    {
        text: "A visual novel about someone's childhood",
        conclusion: "It's about how their personal trauma shapes their current life. Maybe a bit sensitive?",
        impact: 200,
        risk: 0.2
    },
    {
        text: "A remake of a previous game jam game",
        conclusion: "It fits the theme, but isn't it a bit boring? Will chat mind?",
        impact: 100,
        risk: 0.4
    },
    {
        text: "Seems like a run-of-the-mill JRPG",
        conclusion: "It's about a group of ecoterrorists looking for relics of a past civilization. Will some people see a link with the real world?",
        impact: 1000,
        risk: 0.3
    },
    {
        text: "A dating sim... seems SFW...",
        conclusion: "You investigate the past of anthropomorphized corporations. It name drops some CEOs. Clearly absurd humor, but it smells like trouble.",
        impact: 500,
        risk: 0.8
    },
    {
        text: "A strategy game about land grabbing",
        conclusion: "There's already plenty of games like this. It's pretty much the whole genre. So what if borders are remnants of past bloodshed?",
        impact: 400,
        risk: 0.2
    },
    {
        text: "Seems like a tower defense game",
        conclusion: "Abort, abort, it's about how the terrorist state of Ivrael has been erasing historical borders of Balestine!",
        impact: 2000,
        risk: 0.7
    },
    {
        text: "A twine game about history",
        conclusion: "Actually it's almost like a powerpoint lecture about how there used to be alternatives to capitalism but none remain...",
        impact: 600,
        risk: 0.5
    },
    {
        text: "An action game about the olympics",
        conclusion: "It's very much focused on the vision of Pierre de Coubertin trying to push for an aristocratic colonial world order.",
        impact: 300,
        risk: 0.6
    },
    {
        text: "A puzzle game about the history of the pieces in a smartphone",
        conclusion: "Without much surprise, there's slavery and child labour involved every step of the way...",
        impact: 800,
        risk: 0.3
    },
    {
        text: "A puzzle game about geometrical shapes",
        conclusion: "Fudge, it's about the systemic exclusion of some populations from the political process through jerrymandering.",
        impact: 900,
        risk: 0.4
    },
    {
        text: "A compilation of the most embarassing moments of a streamer",
        conclusion: "It's definitely cringe, but it shouldn't be much trouble...",
        impact: 300,
        risk: 0.2
    },
    {
        text: "An arthouse game celebrating social progress",
        conclusion: "Most of them have been conquered through violent and bloody labour movements. Is it distant enough?",
        impact: 1500,
        risk: 0.2
    },
    {
        text: "A 'find the differences' game between pictures of the 1930s and the 2020s",
        conclusion: "Most of them are focused on neonazi groups. Talk about remnants of the past.",
        impact: 3000,
        risk: 0.9
    },
    {
        text: "A murder investigation game",
        conclusion: "It has the player trace the history of corruption in a real world company. Too real. But maybe big money is ok?",
        impact: 1000,
        risk: 0.7
    },


    // coal vs water
    // public space, not everything was privatizes
    // { text: "A board game adaptation of colonial land grabbing", conclusion: "Hits a nerve with many", impact: 800, risk: 0.6 },
    // { text: "A documentary-style game about the Dutch East India Company", conclusion: "Critically acclaimed!", impact: 1000, risk: 0.2 },
    // { text: "A simulation game exploring the role of international banks in shaping global poverty", conclusion: "Draws some controversy", impact: 600, risk: 0.7 },
    // { text: "A simple platformer about mining", conclusion: "It's actually a commentary on child labor in cobalt mines", impact: 700, risk: 0.5 },
    // { text: "A trivia game about spices", conclusion: "Unveils the brutal history of the spice trade", impact: 400, risk: 0.3 },
    // { text: "A clicker game about oil production", conclusion: "Criticized for being too on-the-nose", impact: 500, risk: 0.8 },
    // { text: "A story-driven RPG about rubber plantations", conclusion: "Deeply moving", impact: 900, risk: 0.1 },
];


// Function to generate a random list without duplicates
function getRandomCards(cards, num) {
    if (num > cards.length) {
        throw new Error("Requested more cards than available in the deck");
    }

    // Shuffle the array using Fisher-Yates algorithm
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }

    // Return the first `num` elements
    return shuffled.slice(0, num);
}


const cards = getRandomCards(possibleCards, 10);

let currentCardIndex = -1;
let score = 10000;
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
    if (risk < 0.2) return `<span style="color:blue">very low</span>`;
    if (risk < 0.4) return `<span style="color:green">low</span>`;
    if (risk < 0.6) return `<span style="color:yellow">medium</span>`;
    if (risk < 0.8) return `<span style="color:orange">high</span>`;
    return `<span style="color:red">very high</span>`;
}

function impactText(impact) {
    if (impact < 200) return `<span style="color:blue">low</span>`;
    if (impact < 2000) return `<span style="color:yellow">medium</span>`;
    return `<span style="color:red">high</span>`;
}

function updateScore(change) {
    score += change || 0;
    if (score < 0) {
        score = 0;
    }
    let submissions = cards.length - currentCardIndex;
    scoreDiv.textContent = score;
    gameCountDiv.textContent = `SUBMISSIONS: played ${streamedGames}, filtered ${skippedGames}, remaining ${submissions} `;
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
    ${card.conclusion} <hr>
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
    let negatives = ["upset", "bored", "outraged", "anxious"];
    let n = negatives[Math.floor(Math.random() * negatives.length)]

    const resultMessage = isSuccess ? "Chat is content!" : `Chat is ${n}!`;
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