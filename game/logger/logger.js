class Logger {
    #active;
    constructor(active) {
        this.#active = active;
    }
    activateLogger() {
        this.#active = true;
    }
    deactivateLogger() {
        this.#active = false;
    }

    log(...input) {
        if (this.#active)
            console.log(input.toString());
    }
}