import gsap from 'gsap'
// import { TextPlugin } from "gsap/dist/TextPlugin.min.js";

let instance = null

export class Navegacion
{
    constructor()
    {
        this.createMenu()
    }

    createMenu()
    {
        const menu = document.getElementById('nav-principal')
        let itemsMenu = menu.querySelectorAll('#nav-principal li')

        this.menuObject = {}
        let openMenu;

        for (const item of itemsMenu) {

            if (item.children[1]) {
                console.log(item);
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