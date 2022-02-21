const InfiniteScroll = require('infinite-scroll');
import app from './app';

export class Infescrol{
    constructor()
    {
        this.infScroll = new InfiniteScroll( '.posts', {
            path: '.nav-previous a',
            append: '.article',
            hideNav: '.nav-links'
        })

        this.infScroll.on( 'append', function( event, body, path, items, response ) {
            console.log(this.app);
            app.rollThumb()
        });
    }
}