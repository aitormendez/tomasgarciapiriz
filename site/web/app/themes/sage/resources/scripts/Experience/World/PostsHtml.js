import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Experience from '../Experience.js'

export default class PostsHtml {

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        console.log(this.camera.position);
        console.log(this.experience);
        this.bodies = this.experience.world.physicsWorld.bodies

        // setup
        this.postElements()
    }

    getBodyByName(name)
    {
        // Adaptación de la función getObjectByProperty() en object3d de threejs
        // https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js#L442

		for ( let i = 0, l = this.bodies.length; i < l; i ++ ) {

			const body = this.bodies[i];

			if ( body.name === name ) {
				return body;
			}
		}

		return undefined;
    }

    postElements()
    {
        let doOnEnter = (postName) =>
        {
            let body = this.getBodyByName(postName)
            body.sleep()

            gsap.to(
                body.position,
                {
                    duration: 1,
                    y: 35
                }
            )

            this.camera.position.x = body.position.x

            // gsap.to(
            //     this.camera.position,
            //     {
            //         duration: 1,
            //         x: body.position.x,
            //         z: body.position.y
            //     }
            // )

            console.log(this.camera.position);
            console.log(this.experience.camera.instance.position);
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
                        doOnEnter(postName)
                    },
                    // onLeave: () => console.log('leave: ' + postName),
                    // onEnterBack: () => console.log('enter back: ' + postName),
                    // onLeaveBack: () => console.log('leave back: ' + postName),
                    markers: false
                }
            })
        })

    }
}