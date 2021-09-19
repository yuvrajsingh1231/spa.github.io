import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
            <h1> Posts ${this.params.id}</h1>
        `;
    }
}