class Typewriter {
    constructor(element) { this.element = element; }
    async write(text) {
        this.element.innerHTML = ""; 
        for (let char of text) {
            this.element.innerHTML += char; 
            await new Promise(r => setTimeout(r, 35));
        }
    }
}