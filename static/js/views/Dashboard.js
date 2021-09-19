import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1> Dashboard </h1>
        `;
    }
}