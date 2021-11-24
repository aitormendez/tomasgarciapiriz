import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Experience from '../Experience.js'
import { rotate } from '../Utils/rotate.js'

export default class PostsHtml {

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
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
        let cubeUp = (postName) =>
        {
            let body = this.getBodyByName(postName)
            body.collisionResponse = 0

            rotate(
                body,
                {
                    val: body.rotation.val, // valFrom
                    x: 0,
                    y: 1,
                    z: 0
                },
                1, // duration
                2  // valTo
            )

            gsap.to(
                body.position,
                {
                    duration: 1,
                    y: 35
                }
            )

            gsap.to(
                this.camera.position,
                {
                    duration: 1,
                    x: body.position.x + 0.5,
                    z: body.position.z,
                    ease: 'Power1.easeInOut',
                }
            )
            body.sleep()
            
        }

        let cubeDown = (postName) =>
        {
            let body = this.getBodyByName(postName)
            body.collisionResponse = 1
            body.wakeUp()
            body.rotation = {
                val: 2,
                x: Math.random() - 0.5,
                y: Math.random() - 0.5,
                z: Math.random() - 0.5,
            }
    
            rotate(body, body.rotation, 2, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5)
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
                        cubeUp(postName)
                    },
                    onLeave: () => {
                        cubeDown(postName)
                    },
                    onEnterBack: () => {
                        cubeUp(postName)
                    },
                    onLeaveBack: () => {
                        cubeDown(postName)
                    },
                }
            })
        })
    }

    update()
    {

    }
}