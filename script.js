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

function startDrag(x) {
    if (isDragging || !isDraggable || isGameOver) return;

    isDragging = true;
    startX = x;
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
        text: "A kind of fruit ninja about bananas",
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
        conclusion: "It's a game where you investigate the past of anthropomorphized corporations. It name drops some CEOs. Smells like trouble.",
        impact: 500,
        risk: 0.8
    },
    {
        text: "A strategy game about colonizing a new continent",
        conclusion: "There's already plenty of games like this. It's pretty much the whole genre. So what if borders are remnants of past bloodshed?",
        impact: 400,
        risk: 0.2
    },
    {
        text: "Seems like a tower defense game",
        conclusion: "Abort, abort, it's about how the terrorist state of Ivrael has been erasing historical borders of Balestine!",
        impact: 3000,
        risk: 0.7
    },
    {
        text: "A twine game about history",
        conclusion: "Actually it's almost like a powerpoint lecture about how there used to be alternatives to capitalism but none remain...",
        impact: 600,
        risk: 0.5
    },
    {
        text: "A party game about the history of the olympics",
        conclusion: "It's very much focused on the vision of Pierre de Coubertin trying to push for an aristocratic colonial world order.",
        impact: 300,
        risk: 0.6
    },
    {
        text: "A puzzle game about the life of the pieces in a smartphone",
        conclusion: "Without much surprise, there's slavery and child labour involved every step of the way... But everyone knows that...",
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
    {
        text: "A sci-fi archeology game about finding artifacts from our time period",
        conclusion: "Nothing remains of mankind except vague traces of a mass extinction event. Kind of a bummer.",
        impact: 600,
        risk: 0.2
    },
    {
        text: "A 'Stardew Valley'-like where you refurbish an abandonned farm",
        conclusion: "It's pretty cynical, there's very little chance to compete against corporate behemots.",
        impact: 900,
        risk: 0.2
    },
    {
        text: "A puzzle game a la Chants of Sennaar where you play a linguist decoding ancient texts",
        conclusion: "Turns out to be political, focused on lost concepts of collective governance. A bit boring, maybe?",
        impact: 1500,
        risk: 0.1
    },
    {
        text: "A cyberpunk hacking game",
        conclusion: "It actually teaches you how to stalk people's pasts on the internet. Creepy, but educational?",
        impact: 500,
        risk: 0.3
    },
    {
        text: "A 'Papers Please' clone about censorship of archives",
        conclusion: "You decide what history is worth remembering. All of these topics are pretty sensitive.",
        impact: 2000,
        risk: 0.8
    },
    {
        text: "A FNAF type of horror game",
        conclusion: "Oh no it's actually about the notion of the Other and how it's been used to reinforce racist prejudices!",
        impact: 1000,
        risk: 0.7
    },
    {
        text: "A 80s themed lost-media aesthetic thingy",
        conclusion: "It's about how nostalgia traps us in rehashing the same narratives and prevents us from building new futures. The theme is subtle though.",
        impact: 800,
        risk: 0.1
    },
    {
        text: "A charming game a la Edith Finch about a family tree",
        conclusion: "Every family has people who did pretty awful things.",
        impact: 300,
        risk: 0.4
    },
    {
        text: "A word game that takes place inside the brain of an AI!",
        conclusion: "It tries to uncover systemic biases that LLMs have internalized. It's just a crossword.",
        impact: 200,
        risk: 0.2
    },
    {
        text: "A time travel game comparing the past and the present",
        conclusion: "It tries to show that an idealized image of the past fuels dangerous conservatist ideologies. It is not doing a very good job.",
        impact: 400,
        risk: 0.3
    },
    {
        text: "A visual novel where you talk to digital remnants of people uploaded to the cloud",
        conclusion: "Turns out to be horror a la Doki Doki! AI has digested and simplified their personality beyond recognition.",
        impact: 100,
        risk: 0.1
    },
    {
        text: "A poetic narrative game about lost loves and friends",
        conclusion: "Mentions many dead people, but insists that their memories leave on in your actions. Kind of a buzzkill, but seems pretty safe.",
        impact: 200,
        risk: 0.1
    },
    {
        text: "A PDF describing a tabletop RPG",
        conclusion: "It has philosophical ideas that could change the world, but who likes to read or learn? Yuck.",
        impact: 500,
        risk: 0.1
    },
    {
        text: "A plague-inc kind of game",
        conclusion: "Surprisingly, it's not about the pandemic, but about how privalization has destroyed what used to be public institutions everywhere.",
        impact: 600,
        risk: 0.2
    },
    {
        text: "A time-loop investigation game",
        conclusion: "Each loop is actually a generation, it's more about how generational trauma are passed down in a family. Grim, but there's a hopeful ending.",
        impact: 400,
        risk: 0.4
    },
    {
        text: "A minigame where you chase away intrusive thoughts before going to bed",
        conclusion: "Who hasn't rehashed embarassing memories? That's pretty relatable, and more importantly, safe!",
        impact: 100,
        risk: 0.1
    },
    {
        text: "A game where you manage a university through centuries",
        conclusion: "Interesting, but you're completely at the mercy of economic productivity. You end up closing humanities departments.",
        impact: 300,
        risk: 0.2
    },
    {
        text: "A sims-like game",
        conclusion: "Depending on your gender and race, you can have 0 chance of winning. What a waste of time...",
        impact: 900,
        risk: 0.6
    },
    {
        text: "A puzzle game inspired by Zachtronics",
        conclusion: "It's very cynical, it's trying to make a point about how treating technology like black boxes inevitably leads to lost technology.",
        impact: 300,
        risk: 0.2
    },
    {
        text: "A rhythm game about music and traditions",
        conclusion: "It starts as a fun beat-matching game, but the songs you unlock reveal erased histories of oppressed cultures.",
        impact: 600,
        risk: 0.2
    },
    {
        text: "A walking sim set in a government building",
        conclusion: "Actually it's a horror game, the place is haunted by the ghosts of the bloody past of the country.",
        impact: 800,
        risk: 0.3
    },
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
let score = 8000;
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

    cardContentDiv.innerHTML = `${resultMessage} <hr /> You ${isSuccess ? "<span style='color:green'>gained" : "<span style='color:red'>lost"} ${Math.abs(effect)}</span> viewers.`;
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