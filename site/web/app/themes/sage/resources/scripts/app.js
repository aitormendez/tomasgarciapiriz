/**
 * External Dependencies
 */
import 'jquery'
import Experience from './Experience/Experience.js'
import { Navegacion } from './header.js'
import { PostHeader } from './PostHeader.js'

let w = window.innerWidth

$(() => {

    // Front page
    if (document.body.classList.contains('home') && w > 791)
    {
      const experience = new Experience(document.querySelector('canvas.webgl'))
    }

    // Navegación
    const navegación = new Navegacion;
    const postHeader = new PostHeader;

});
