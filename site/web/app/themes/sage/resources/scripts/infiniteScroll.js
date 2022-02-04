const InfiniteScroll = require('infinite-scroll');

let infScroll = new InfiniteScroll( '.posts', {
    path: '.nav-next a',
    append: 'article',
    hideNav: '.nav-links'
});
