import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Experience from '../Experience.js'

export default class PostsHtml {

    constructor()
    {
        this.experience = new Experience()
        console.log(this.experience);
        this.postElements()
    }
    

    postElements()
    {
        let doOnEnter = (postName) =>
        {
            let postCube = this.experience.scene.getObjectByName(postName)
            console.log(postCube.position)
            postCube.position.x = 0
            console.log(postCube.position)
        }


        this.posts = gsap.utils.toArray('.post');

        this.posts.forEach(post => {

            let postName = post.id.replace(/-/g, "")

            gsap.to(post, { 
                backgroundColor: '#000000',
                color: '#ffffff',
                scrollTrigger: {
                    trigger: post,
                    start: 'top center',
                    end: 'bottom center',
                    toggleActions: 'play reverse play reverse',
                    onEnter: () => {
                        console.log('enter: ' + postName)
                        doOnEnter(postName)
                    },
                    onLeave: () => console.log('leave: ' + postName),
                    onEnterBack: () => console.log('enter back: ' + postName),
                    onLeaveBack: () => console.log('leave back: ' + postName),
                    markers: false
                }
            })
        })

    }


}