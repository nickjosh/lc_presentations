const Reveal = require('reveal');
const hljs = require('highlight.js');

// Styles
require('reveal/index.css');
require('reveal/theme/default.css');
require('highlight.js/styles/github.css');
require('./main.scss');


/**
 * Run event after DOM is ready
 * @param  {Function} fn Callback function
 */
function ready(fn) {
    // Sanity check
    if (typeof fn !== 'function') {
        return;
    }

    // If document is already loaded, run method
    if (document.readyState === 'complete') {
        return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener('DOMContentLoaded', fn, false);
};

/**
 * Load presentations from a JSON array given by webpack
 */
function getPresentations() {
    return require('./presentations.json');
}

/**
 * Load the presentation into the page
 */
function loadPresentation(title) {
    console.log(`Loading Presentation: ${title}`);
    const contentWapper = document.querySelector('.slides');
    const content = require('./' + title +'/index.pug')();

    // Hide Menu
    document.getElementById('menu').classList.add('hidden');

    history.pushState({ showMenu: true }, title, `./${title}`);

    contentWapper.innerHTML = content;
    Reveal.initialize({
        history: true,
    });
    document.querySelectorAll('pre code')
            .forEach(elem => hljs.highlightBlock(elem));
}

/**
 * Display menu of presentations
 */
function buildMenu() {
    const menu = document.getElementById('menu');
    // Make sure menu isn't hidden
    document.getElementById('menu').classList.remove('hidden');

    // create menu content
    const content = document.createElement('ul');
    getPresentations().forEach((pres) => {
        const chld = document.createElement('li');
        const link = document.createElement('a');
        chld.appendChild(link);
        link.innerHTML = pres;
        link.href = '#';
        link.addEventListener('click', () => loadPresentation(pres)); 
        content.appendChild(chld);
    });
    menu.appendChild(content);
}

ready(() => buildMenu());
