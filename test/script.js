
const cardDiv = document.getElementById('card');
const gradientLeft = document.getElementById('gradientLeft');
const gradientRight = document.getElementById('gradientRight');
const gradientLeftText = gradientLeft.querySelector('.gradient-text');
const gradientRightText = gradientRight.querySelector('.gradient-text');

let isDragging = false;
let startX = 0;
let currentX = 0;

function resetCard() {
    cardDiv.style.transition = 'transform 0.5s ease';
    cardDiv.style.transform = 'translate(0, 0)';
    cardDiv.textContent = 'Swipe';
}

cardDiv.addEventListener('mousedown', (event) => {
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

    const threshold = window.innerWidth * 0.4;
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
    const dx = currentX - startX;
    const threshold = window.innerWidth * 0.4;

    gradientLeft.style.opacity = 0.4;
    gradientRight.style.opacity = 0.4;
    gradientLeftText.style.color = 'rgba(0, 0, 0, 0.3)';
    gradientRightText.style.color = 'rgba(0, 0, 0, 0.3)';

    if (Math.abs(dx) > threshold) {
        cardDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

        if (dx > 0) {
            cardDiv.textContent = 'Swiped Right';
        } else {
            cardDiv.textContent = 'Swiped Left';
        }

        setTimeout(() => { resetCard() }, 1000);

    } else {
        resetCard();
    }
});

// Prevent text selection during drag
document.addEventListener('mousedown', (event) => {
    event.preventDefault();
});