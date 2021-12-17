/**
 * External Dependencies
 */
import 'jquery';
import Experience from './Experience/Experience.js'

let w = window.innerWidth

$(() => {
    if (document.body.classList.contains('home') && w > 791)
    {
      const experience = new Experience(document.querySelector('canvas.webgl'))
    }
});
