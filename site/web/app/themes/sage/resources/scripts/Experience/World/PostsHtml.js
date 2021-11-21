import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default class PostsHtml {
    constructor()
    {
        const posts = gsap.utils.toArray('.post');

        posts.forEach(post => {

            let postName = post.id.replace(/-/g, "")

            gsap.to(post, { 
                x: 100,
                scrollTrigger: {
                    trigger: post,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => console.log('enter: ' + postName),
                    onLeave: () => console.log('leave: ' + postName),
                    onEnterBack: () => console.log('enter back: ' + postName),
                    onLeaveBack: () => console.log('leave back: ' + postName),
                    markers: true
                }
            })
        })
    }
}