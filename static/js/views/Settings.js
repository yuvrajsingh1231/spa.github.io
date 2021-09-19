import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1> Setting </h1>
        `;
    }
}