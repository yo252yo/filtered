const container = document.getElementById('container');
const card = document.getElementById('card');

let isDragging = false;
let startX, currentX;

// Desktop: Mousemove to tilt card
container.addEventListener('mousemove', (e) => {
    if (isDragging) return;

    const { clientX } = e;
    const containerWidth = container.offsetWidth;
    const center = containerWidth / 2;
    const offset = (clientX - center) / center;

    // Tilt the card based on offset (-1 to 1)
    card.style.transform = `translate(-50%, -50%) rotate(${offset * 10}deg)`;
});

// Desktop: Click to swipe
container.addEventListener('click', (e) => {
    const { clientX } = e;
    const containerWidth = container.offsetWidth;

    if (clientX < containerWidth * 0.25) {
        swipeCard('left');
    } else if (clientX > containerWidth * 0.75) {
        swipeCard('right');
    }
});

// Mobile: Drag-and-drop functionality
card.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    card.style.transition = 'none';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    currentX = e.clientX;
    const deltaX = currentX - startX;
    card.style.transform = `translate(${deltaX}px, -50%) rotate(${deltaX / 20}deg)`;
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;

    const containerWidth = container.offsetWidth;
    const deltaX = currentX - startX;

    if (deltaX > containerWidth * 0.25) {
        swipeCard('right');
    } else if (deltaX < -containerWidth * 0.25) {
        swipeCard('left');
    } else {
        card.style.transition = 'transform 0.2s';
        card.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    }

    isDragging = false;
});

// Function to handle swipes
function swipeCard(direction) {
    const offsetX = direction === 'left' ? '-200%' : '200%';
    card.style.transition = 'transform 0.5s';
    card.style.transform = `translate(${offsetX}, -50%) rotate(${direction === 'left' ? -30 : 30}deg)`;

    setTimeout(() => {
        card.style.transition = 'none';
        card.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    }, 500);
}
