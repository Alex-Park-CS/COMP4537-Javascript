/* Disclaimer: ChatGPT was used to debug */

// try commit again
class Button {
    constructor(index, container) {
        this.index = index;
        this.container = container;
        this.element = document.createElement('button');
        this.element.innerHTML = `${this.index + 1}`;
        this.element.style.backgroundColor = this.getRandomColor();
        this.element.className = 'button';
        this.container.appendChild(this.element);
    }

    getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    randomizePosition() {
        const maxWidth = this.container.offsetWidth - this.element.offsetWidth;
        const maxHeight = this.container.offsetHeight - this.element.offsetHeight;
    
        // Ensure positions are within bounds
        const randomLeft = Math.random() * maxWidth;
        const randomTop = Math.random() * maxHeight;
    
        // Apply random positions
        this.element.style.position = 'absolute';
        this.element.style.left = `${randomLeft}px`;
        this.element.style.top = `${randomTop}px`;
    }
    

    hideLabel() {
        this.element.innerText = "";
    }

    revealLabel() {
        this.element.innerText = this.index + 1;
    }
}

class Game {
    constructor(container, messageArea) {
        this.container = container;
        this.messageArea = messageArea
        this.buttons = [];
        this.currentIndex = 0;
        this.originalOrder = [];
    }

    generateButtons(numButtons) {
        // Clear existing values
        this.container.innerHTML = '';
        this.messageArea.innerText = '';
        this.currentIndex = 0;
        this.buttons = [];
        this.originalOrder = [];

        // Create new buttons
        this.buttons = [];
        for (let i = 0; i < numButtons; i++) {
            this.buttons.push(new Button(i, this.container));
        }

        // Store the original order of the buttons
        this.originalOrder = this.buttons.map((b) => b.index);

        setTimeout(() => {
            this.scrambleButtons(numButtons)
        }, 1000 * numButtons);
    }

    scrambleButtons(numButtons) {
        for(let i = 0; i < numButtons; i++) {
            const randomIndex = Math.floor(Math.random() * numButtons);
            [this.buttons[i], this.buttons[randomIndex]] = [this.buttons[randomIndex], this.buttons[i]];
        }
        // randomize button positions
        // append buttons to container to re-render
        this.buttons.forEach((b) => {
            b.randomizePosition();
            b.container.appendChild(b.element);
        });
        
        this.startGuessingPhase();

    }

    startGuessingPhase() {
        // Hide labels and add click event listeners
        this.buttons.forEach((b) => {
            b.hideLabel();
            b.element.addEventListener("click", () => this.handleButtonClick(b));
        });
    }

    handleButtonClick(button) {
        if (button.index === this.originalOrder[this.currentIndex]) {
            button.revealLabel();
            this.currentIndex++;
            if (this.currentIndex === this.originalOrder.length) {
                this.displayMessage(MESSAGES.excellentMemory);
            }
        } else {
            this.displayMessage(
                `${MESSAGES.wrongOrder} ${this.originalOrder.map((i) => i + 1).join(", ")}`
            );
            this.buttons.forEach((b) => b.revealLabel());
        }
    }

    displayMessage(message) {
        this.messageArea.innerText = message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Get message from user.js for dynamic prompt
    const promptLabel = document.getElementById('buttonPrompt');
    promptLabel.innerHTML = MESSAGES.buttonPrompt;

    // get div element to hold buttons, and create game instance
    const buttonArea = document.getElementById('buttonArea');
    const messageArea = document.getElementById('messageArea');
    const game = new Game(buttonArea, messageArea);

    document.getElementById('startGame').addEventListener('click', () => {
        // Get the updated value of numButtons
        const numButtons = parseInt(document.getElementById('buttonCount').value, 10);
        game.generateButtons(numButtons);
    });
});
