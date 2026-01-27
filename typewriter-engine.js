class Typewriter {
    constructor(element) { this.element = element; }

    async write(text) {
        this.element.innerHTML = ""; 
        for (let char of text) {
            // No non-breaking spaces here to ensure wrapping works!
            this.element.innerHTML += char; 
            await new Promise(r => setTimeout(r, 40));
        }
    }
}