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

/**
 * Massive romantic explosion + floating message when she clicks "I Love You ❤️"
 */
function loveExplosion() {
    // 1. Giant heart rain from top
    for(let i = 0; i < 60; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = ['❤️','💖','💗','💞','💘','💕'][Math.floor(Math.random()*6)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 40 + 30) + 'px'; // bigger hearts
        heart.style.opacity = Math.random() * 0.4 + 0.6;
        
        const duration = Math.random() * 5 + 5; // 5-10 sec fall
        heart.style.setProperty('--d', duration + 's');
        heart.style.animation = `floatUp var(--d) linear forwards, spin ${duration*1.5}s linear`;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000 + 500);
    }

    // 2. Center screen explosion of colored particles
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for(let i = 0; i < 80; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerHTML = Math.random() > 0.5 ? '💥' : '✨';
        p.style.left = centerX + 'px';
        p.style.top = centerY + 'px';
        p.style.fontSize = (Math.random() * 20 + 16) + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const vel = Math.random() * 300 + 150;
        const hue = Math.random() * 60 + 320; // hot pink to purple
        
        p.style.color = `hsl(${hue}, 100%, 65%)`;
        p.style.setProperty('--x', Math.cos(angle) * vel + 'px');
        p.style.setProperty('--y', Math.sin(angle) * vel + 'px');
        p.style.setProperty('--d', (Math.random() * 1.2 + 1.2) + 's');
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2500);
    }

    // 3. Floating "YES!!" or custom message in center (you can change text)
    const msg = document.createElement('div');
    msg.innerHTML = '❤️I LOVE YOU TOO!!❤️Simran❤️';
    msg.style.position = 'absolute';
    msg.style.left = '50%';
    msg.style.top = '50%';
    msg.style.transform = 'translate(-50%, -50%)';
    msg.style.fontFamily = "'Dancing Script', cursive";
    msg.style.fontSize = '6rem';
    msg.style.color = '#ff4d6d';
    msg.style.textShadow = '0 0 30px #ff4d6d, 0 0 60px #6f42c1';
    msg.style.opacity = '0';
    msg.style.pointerEvents = 'none';
    msg.style.zIndex = '9999';
    msg.style.whiteSpace = 'pre-line';
    msg.style.textAlign = 'center';
    msg.style.lineHeight = '1.1';
    
    document.body.appendChild(msg);
    
    // Fade in + pulse + fade out
    setTimeout(() => {
        msg.style.transition = 'all 1.5s ease';
        msg.style.opacity = '1';
        msg.style.transform = 'translate(-50%, -50%) scale(1.1)';
    }, 300);
    
    setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }, 3500);
    
    setTimeout(() => msg.remove(), 5500);
}

// Helper to detect if we're on the final "done" state and button says I Love You
function isFinalLoveClick() {
    const btn = document.getElementById('action-btn');
    return btn && btn.innerText.includes('I Love You');
}