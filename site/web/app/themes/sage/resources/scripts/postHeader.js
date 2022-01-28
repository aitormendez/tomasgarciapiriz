import gsap from 'gsap'

export class PostHeader
{
    btnInfo = document.querySelector('#btn-info')
    box = document.querySelector('.box')

    constructor()
    {
        this.desplegarBox()
    }

    desplegarBox()
    {
        this.btnInfo.isOpen = false

        this.btnInfo.addEventListener('click', () => {
            this.btnInfo.classList.toggle("bg-black")
            this.btnInfo.classList.toggle("text-white")

            if (!this.btnInfo.isOpen) {
                this.btnInfo.isOpen = true

                gsap.to(this.box, {
                    height: "auto",
                    duration: 0.5,
                    // ease: "elastic",
                });

                
            } else {
                this.btnInfo.isOpen = false

                gsap.to(this.box, {
                    height: 0,
                    duration: 0.5,
                    // ease: "elastic",
                });

            }
        })
    }
}