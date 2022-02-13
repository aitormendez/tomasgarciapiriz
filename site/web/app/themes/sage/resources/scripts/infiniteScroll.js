const InfiniteScroll = require('infinite-scroll');

let body = document.querySelector('body')

if (body.classList.contains('post-type-archive-project') || body.classList.contains('post-type-archive-story')) {
    let infScroll = new InfiniteScroll( '.posts', {
        path: '.nav-previous a',
        append: '.article',
        hideNav: '.nav-links'
    });
}


