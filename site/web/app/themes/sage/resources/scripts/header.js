import gsap from 'gsap'
import { TextPlugin } from "gsap/dist/TextPlugin.min.js";
gsap.registerPlugin(TextPlugin);

console.log(tgp);


export class Navegacion
{
    hamb = document.querySelector('#hamb')
    solapaElement = document.querySelector('#solapa')
    cerrar = document.querySelector('#cerrar')
    equis = document.querySelector('#x')
    nombre = document.querySelector('#logo')
    inicialNombreSeccion = ''
    body = document.querySelector('body')

    constructor()
    {
        this.nombre.desplegado = true
        this.createMenu()
        this.solapa()
        this.scroll()

        if (this.body.classList.contains('archive')) {
            this.seccion = document.querySelector('.page-header h1')
            this.esconderSeccion = gsap.to(this.seccion, {
                speed: 15,
                text: this.seccion.innerHTML[0], 
                ease: "none",
                paused: true
            })
        }
    }

    esconderLogo = gsap.to(this.nombre, {
        speed: 15,
        text: "T", 
        ease: "none",
        paused: true
    })

    scroll()
    {
        // Dirección scroll
        let
            lastY = window.scrollY,
            body = document.querySelector('body'),
            icnScroll = document.querySelector('#icn-scroll')

        this.cerrar.addEventListener('mouseenter', () => this.equis.classList.remove('hidden'))

        this.nombre.addEventListener('mouseenter', () => {
            if (this.nombre.desplegado === false) {
                this.esconderLogo.reverse()
            }
        })

        window.addEventListener("scroll", (event) => {
            let currY = window.scrollY,
                direction = (currY > lastY) ? 'down' : 'up'

            if (direction === 'down' && this.solapaElement.isOpen === true) {
                this.solapaElement.close()
            }

            if (window.scrollY > 1 && this.nombre.desplegado === true) {
                this.esconderLogo.play()
                if (this.body.classList.contains('archive')) {
                    this.esconderSeccion.play()
                }
                this.nombre.desplegado = false
            } else if (window.scrollY < 2 && this.nombre.desplegado === false) {
                this.esconderLogo.reverse()
                if (this.body.classList.contains('archive')) {
                    this.esconderSeccion.reverse()
                }
                this.nombre.desplegado = true
            }
            lastY = currY;

            // esconder icono scroll en front page
            if (body.classList.contains('home') && window.scrollY > 1) {
                icnScroll.style.opacity = 0
            } else if (body.classList.contains('home')) {
                icnScroll.style.opacity = 1
            }

            // esconder nombre de sección
            if (body.classList.contains('post-type-archive-story')) {
                
            }
        })
    }

    solapa()
    {
        this.solapaElement.isOpen = false;

        gsap.set(this.solapaElement, {x: - this.solapaElement.offsetWidth})

        this.solapaElement.open = () => {
            if (!this.solapaElement.isOpen) {
                this.solapaElement.isOpen = true;
                gsap.to(this.solapaElement, {
                    x: 0,
                    duration: 0.5,
                });
            }
        }

        this.solapaElement.close = () => {
            if (this.solapaElement.isOpen) {
                this.solapaElement.isOpen = false;
                gsap.to(this.solapaElement, {
                    x: - this.solapaElement.offsetWidth,
                    duration: 0.5,
                });
            }
        }

        this.hamb.addEventListener("click", () => this.solapaElement.open())
        this.cerrar.addEventListener("click", () => this.solapaElement.close())
        this.cerrar.addEventListener("mouseenter", () => this.equis.classList.remove('hidden'))
        this.cerrar.addEventListener("mouseleave", () => this.equis.classList.add('hidden'))
    }

    createMenu()
    {
        const menu = document.getElementById('nav-principal')
        let itemsMenu = menu.querySelectorAll('#nav-principal li')

        this.menuObject = {}
        let openMenu;

        for (const item of itemsMenu) {

            if (item.children[1]) {
                let isOpen = false,
                    box = item.querySelector('.my-child-menu'),
                    items = box.querySelectorAll("li"),
                    boton = item.children[0].children[1];

                gsap.set(items, {y: -30})

                item.open = () => {
                    if (!isOpen) {
                        isOpen = true;
                        openMenu && openMenu.close();
                        openMenu = item;
                        gsap.to(box, {
                        height: "auto",
                        duration: 1,
                        ease: "elastic",
                        overwrite: true
                        });
                        gsap.to(items, {
                            y: 0,
                            overwrite: true,
                            duration: 1.5,
                            stagger: 0.1,
                            ease: "elastic"
                        });
                        gsap.to(items, {
                            opacity: 1,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "power4.in"
                        });
                        gsap.to(boton, {
                            rotate: 90,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "power4.in"
                        });
                    }
                }

                item.close = () => {
                    if (isOpen) {
                        isOpen = false;
                        openMenu = null;
                        gsap.to(box, {
                            height: 0,
                            overwrite: true,
                            onComplete: () => gsap.set(items, {y: -30, overwrite: true})
                        });
                        gsap.to(items, {
                            opacity: 0,
                            duration: 0.5,
                        });
                        gsap.to(boton, {
                            rotate: 0,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "power4.in"
                        });
                    }
                };

                boton.addEventListener("click", () => isOpen ? item.close() : item.open())
            }
        }
    }
}