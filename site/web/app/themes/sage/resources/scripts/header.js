import gsap from 'gsap'
import { TextPlugin } from "gsap/dist/TextPlugin.min.js";
gsap.registerPlugin(TextPlugin);


export class Navegacion
{
    hamb = document.querySelector('#hamb')
    solapaElement = document.querySelector('#solapa')
    cerrar = document.querySelector('#cerrar')
    equis = document.querySelector('#x')
    nombre = document.querySelector('#logo')
    // viewportWidth = document.documentElement.clientWidth

    constructor()
    {
        this.nombre.desplegado = true
        this.createMenu()
        this.solapa()
        this.scroll()
    }

    scroll()
    {
        // Dirección scroll
        let
            lastY = window.scrollY,
            body = document.querySelector('body'),
            icnScroll = document.querySelector('#icn-scroll')
            

        // console.log(this.viewportWidth)
        this.cerrar.addEventListener("mouseenter", () => this.equis.classList.remove('hidden'))
        this.nombre.addEventListener('mouseenter', () => {
            if (this.nombre.desplegado === false) {
                this.mostrarLogo()
            }
        })

        window.addEventListener("scroll", (event) => {
            let currY = window.scrollY,
                direction = (currY > lastY) ? 'down' : 'up'

            if (direction === 'down' && this.solapaElement.isOpen === true) {
                this.solapaElement.close()
            }

            if (window.scrollY > 1 && this.nombre.desplegado === true) {
                this.esconderLogo()
            } else if (window.scrollY < 2 && this.nombre.desplegado === false) {
                this.mostrarLogo()    
            }
            lastY = currY;

            if (body.classList.contains('home') && window.scrollY > 1) {
                icnScroll.style.opacity = 0
            } else {
                icnScroll.style.opacity = 1
            }
        })
    }

    esconderLogo()
    {
        gsap.to(logo, {
            duration: 0.5, 
            text: "T", 
            ease: "none",
        })
        this.nombre.desplegado = false
    }

    mostrarLogo()
    {
        gsap.to(logo, {
            duration: 0.5, 
            text: "Tomás García Píriz", 
            ease: "none",
        })
        this.nombre.desplegado = true
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

    logo = {
        desplegado: true
    }
}