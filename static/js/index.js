import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";
import PostView from "./views/PostView.js";

const pathToRegx = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }))
}

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    
    const routes = [
        {
            path: "/",
            view: Dashboard
        },
        {
            path: "/posts",
            view: Posts
        },
        {
            path: "/posts/:id",
            view: PostView
        },
        {
            path: "/settings",
            view: Settings
        }
    ];

    const ptMatch  = routes.map(route => {
        console.log(location.pathname.match(pathToRegx(route.path)));
        console.log(location.pathname)
        return {
            route: route,
            result: location.pathname.match(pathToRegx(route.path))
        }
    });

    let match = ptMatch.find(ptMatch => ptMatch.result !== null);
    if(!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }
    const view = new match.route.view(getParams(match));
    document.querySelector('#app').innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
});