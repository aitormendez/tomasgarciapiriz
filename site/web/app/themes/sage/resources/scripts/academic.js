import gsap from 'gsap'

export class RollThumb
{
    constructor()
    {
        this.articles = document.querySelectorAll('.article')

        gsap.set('.thumb', {
            width: '10px',
            opacity: 0,
        })

        this.moverThumb();
    }

    moverThumb()
    {
        this.articles.forEach(element => {
            let thumb = element.children[1]
            console.log(thumb);

            element.moveThumb = gsap.to(thumb, {
                opacity: 1,
                width: 'auto',
                rotate: () => gsap.utils.random(700, 740),
                duration: 0.5,
                paused: true
            })

            element.addEventListener('mouseenter', () => {
                element.moveThumb.play()
                console.log('in: ', element);
            })

            element.addEventListener('mouseleave', () => {
                element.moveThumb.reverse()
                console.log('out: ', element);
            })
            
        })
    }
}