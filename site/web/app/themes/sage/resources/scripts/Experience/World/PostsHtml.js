import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'
import { rotate, flotar } from '../Utils/rotate.js'
import { random } from 'gsap/all'
import { Vec3 } from 'cannon-es'

export default class PostsHtml {

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.bodies = this.experience.world.physicsWorld.bodies

        // setup
        this.postElements()
        // this.raycaster()
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

    // OJO body.rotacion es una propiedad que añado yo a body, no pertenece a CANNON

    postElements()
    {
        let cubeUp = (postName) =>
        {
            this.float = gsap.timeline();
            let body = this.getBodyByName(postName)
            body.collisionFilterMask = 2
            body.rotacion.floatVal = 0
            body.rotacion.floatVector = new CANNON.Vec3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            )
            body.rotacion.floatVector.normalize()

            rotate(
                body,
                {
                    val: body.rotacion.val, // valFrom
                    vector: new CANNON.Vec3(
                        0,
                        1,
                        0,
                    )
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
                    ease: 'elastic.out(0.5, 0.4)',
                    onComplete: body.sleep()
                }
            )
            .to(
                body.rotacion, 
                {
                    floatVal: 0.2,
                    duration: 8,
                    ease: "power1.inOut",
                    onUpdate: updateRotation,
                }
            )
            .to(
                body.rotacion, 
                {
                    floatVal: -0.2,
                    duration: 16,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                    onUpdate: updateRotation,
                }
            )

            function updateRotation() {
                body.quaternion.setFromAxisAngle(
                    body.rotacion.floatVector,
                    Math.PI * body.rotacion.floatVal
                )
            }
        }

        let cubeDown = (postName) =>
        {
            let body = this.getBodyByName(postName)
            this.float.kill()
            body.collisionFilterMask = 1
            body.wakeUp()
            body.rotacion = {
                val: 2,
                vector: new CANNON.Vec3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                )
            }
    
            // rotate(body, body.rotacion, 2, (Math.random() - 0.5) * 5)
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

    // raycaster()
    // {
    //     this.raycaster = new THREE.Raycaster()
    //     this.rayOrigin = this.camera.position
    //     this.rayDirection = new THREE.Vector3(10, 0, 0)
    //     this.rayDirection.normalize()
    //     this.raycaster.set(this.rayOrigin, this.rayDirection)
    // }

    update()
    {

    }
}