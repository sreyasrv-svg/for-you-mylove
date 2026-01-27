function createHeartBurst(customX, customY) {
    // Use click position if available, otherwise use center of screen
    const x = customX || window.innerWidth / 2;
    const y = customY || window.innerHeight / 2;

    for(let i=0; i<15; i++) {
        const h = document.createElement('div');
        h.className = 'particle'; 
        h.innerHTML = '❤️';
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

// Global function to handle clicks on the whole screen
function handleScreenClick(e) {
    if (e.target.tagName !== 'BUTTON') {
        createHeartBurst(e.clientX, e.clientY);
    }
}

// Background floating hearts
setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'bg-heart'; 
    heart.innerHTML = '✨'; // Star sparkles mixed with hearts
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '110vh';
    heart.style.fontSize = Math.random() * 10 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 5 + 8 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}, 1500);