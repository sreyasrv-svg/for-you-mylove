/**
 * Creates the burst effect when the user clicks/taps
 */
function createBurst(customX, customY) {
    const x = customX || window.innerWidth / 2;
    const y = customY || window.innerHeight / 2;
    
    for(let i=0; i<12; i++) {
        const h = document.createElement('div');
        h.className = 'particle'; 
        h.innerHTML = '❤️'; // Linear style sparkles
        h.style.left = x + 'px'; 
        h.style.top = y + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        
        h.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        h.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
        h.style.setProperty('--d', (Math.random() * 0.4 + 0.6) + 's');
        
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1000);
    }
}

/**
 * Creates the continuous flow of hearts from bottom to top
 */
function startHeartFlow() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = '❤️';
        
        // Random horizontal position across the screen
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random size for a sense of depth
        const size = Math.random() * 15 + 10 + 'px';
        heart.style.fontSize = size;
        
        // Random speed for the hearts (6 to 12 seconds)
        const duration = Math.random() * 6 + 6;
        heart.style.setProperty('--d', duration + 's');
        
        document.body.appendChild(heart);
        
        // Cleanup: remove heart after its animation ends
        setTimeout(() => heart.remove(), duration * 1000);
    }, 200); // Frequency: One new heart every 0.2 seconds
}

// Initialize the background flow
startHeartFlow();

/**
 * Handles clicks anywhere on the screen to create heart bursts
 */
function handleScreenClick(event) {
    // Only create burst if the user didn't click the button itself
    if (event.target.id !== 'action-btn') {
        createBurst(event.clientX, event.clientY);
    }
}