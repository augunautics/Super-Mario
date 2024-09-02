// Begin EventHandler.js

export default class EventHandler {
    constructor({ mario }) {
        this.mario = mario;
        this.jumpStrength = 100; // Reduced jump strength for a slower jump
        this.jumpSpeed = 5; // Controls how fast Mario moves up each frame
        this.jumpDuration = 30 ; // Number of frames Mario spends going up
        this.jumpFrameCount = 0; // Keeps track of the frames during the jump
        this.isJumping = false;

        this.keys = {
            left: false,
            right: false,
            jump: false
        };

        // Bind the event listeners for keyboard events
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event) {
        switch (event.key.toLowerCase()) {
            case 'a': // Move left
                this.keys.left = true;
                break;
            case 'd': // Move right
                this.keys.right = true;
                break;
            case ' ': // Jump
                if (!this.isJumping) {
                    this.keys.jump = true;
                    this.isJumping = true;
                    this.jumpFrameCount = 0;
                }
                break;
            default:
                break;
        }
    }

    handleKeyUp(event) {
        switch (event.key.toLowerCase()) {
            case 'a': // Stop moving left
                this.keys.left = false;
                break;
            case 'd': // Stop moving right
                this.keys.right = false;
                break;
            case ' ': // Stop jump
                this.keys.jump = false;
                break;
            default:
                break;
        }
    }

    updateMarioPosition() {
        if (this.keys.left) {
            this.mario.x -= 3;
        }
        if (this.keys.right) {
            this.mario.x += 3;
        }
        if (this.isJumping) {
            if (this.jumpFrameCount < this.jumpDuration) {
                // Move Mario up gradually
                this.mario.y -= this.jumpSpeed;
                this.jumpFrameCount++;
            } else {
                // Stop jumping after reaching the jump duration
                this.isJumping = false;
            }
        }
    }
}

// End EventHandler.js
