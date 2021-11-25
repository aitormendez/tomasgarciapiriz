import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'
import { rotate, flotar } from '../Utils/rotate.js'
import { random } from 'gsap/all'

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
            this.float = gsap.timeline();
            let body = this.getBodyByName(postName)
            body.collisionFilterMask = 2

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
                this.camera.position,
                {
                    duration: 1,
                    x: body.position.x + 0.5,
                    z: body.position.z,
                    ease: 'Power1.easeInOut',
                }
            )

            this.float.to(
                body.position,
                {
                    duration: 2,
                    y: 35,
                    ease: 'Elastic.easeOut',
                    onComplete: body.sleep()
                }
            )
            .to(
                body.position, 
                { 
                    y: 35.2,
                    duration: 3, 
                    repeat: -1, 
                    yoyo: true, 
                    ease: "power1.inOut", 
                    // onUpdate: updateRotation 
                }
            )
            // .to(
            //     body.rotation, 
            //     {
            //         val: random(0, 0.1),
            //         duration: 1,
            //         ease: "power1.inOut",
            //         yoyo: true,
            //         repeat: -1, 
            //         onUpdate: updateRotation,
            //         repeatRefresh: true
            //     }, 1)
                
            //     function updateRotation() {
            //         body.quaternion.setFromAxisAngle(
            //             new CANNON.Vec3(1, 0, 0),
            //             Math.PI * body.rotation.val
            //         )
            //         body.quaternion.normalize()
            //     }
        }

        let cubeDown = (postName) =>
        {
            let body = this.getBodyByName(postName)
            this.float.kill()
            body.collisionFilterMask = 1
            body.wakeUp()
            body.rotation = {
                val: 2,
                x: Math.random() - 0.5,
                y: Math.random() - 0.5,
                z: Math.random() - 0.5,
            }
    
            // rotate(body, body.rotation, 2, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5)
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