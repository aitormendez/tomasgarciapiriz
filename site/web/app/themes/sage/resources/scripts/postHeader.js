import gsap from 'gsap'

export class PostHeader
{
    constructor()
    {
        this.btnInfo = document.querySelector('#btn-info')
        this.btnAdjuntos = document.querySelector('#btn-adjuntos')

        if (this.btnInfo) {
            this.metaBox = document.querySelector('.meta .box')
            this.desplegarBox(this.metaBox, this.btnInfo)
        }

        if (this.btnAdjuntos) {
            this.adjuntosBox = document.querySelector('.adjuntos .box')
            this.desplegarBox(this.adjuntosBox, this.btnAdjuntos)
        }
        
    }

    desplegarBox(box, btn)
    {
        btn.isOpen = false

        btn.addEventListener('click', () => {
            btn.classList.toggle("bg-black")
            btn.classList.toggle("text-white")

            if (!btn.isOpen) {
                btn.isOpen = true

                gsap.to(box, {
                    height: "auto",
                    duration: 0.5,
                    // ease: "elastic",
                });

                
            } else {
                btn.isOpen = false

                gsap.to(box, {
                    height: 0,
                    duration: 0.5,
                    // ease: "elastic",
                });
            }
        })
    }
}