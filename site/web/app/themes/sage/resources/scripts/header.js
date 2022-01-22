import gsap from 'gsap'
import { TextPlugin } from "gsap/dist/TextPlugin.min.js";

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
        let itemsMenu = menu.querySelectorAll('li')

        this.menuObject = {}

        for (const item of itemsMenu) {
            // item es <li>
            this.menuObject[item.classList[1]] = {
                elemento: item,
                submenu: item.children[1] ? true : false,
                abierto: true
            }

            if (item.children[1]) {
                item.children[0].children[1].addEventListener('click', function () {
                    toggleSubmenu(item.children[1])
                })
            }
        }
        console.log(this.menuObject);
        function toggleSubmenu(item) {
            console.log(item);
        }
    }

    logo = {
        desplegado: true
    }
}