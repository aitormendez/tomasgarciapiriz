import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
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
        this.sizes = this.experience.sizes
        this.MeshObjectsToRaycast = this.experience.world.postCubes.MeshObjectsToRaycast
        this.fotatingObject = undefined

        // raycast
        this.emisorRayos()

        // setup
        this.postElements()

        // scrollTo post
        this.scrollToPost()

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
        // retrasar cubeUp para que no se dispare todo el rato al hacer scroll

        let fireCubeUp = (postName) =>
        {
            this.readyToFloat = postName

            setTimeout(() => 
            {
                this.updatedReadyToFloat = postName
                
                if (this.readyToFloat === this.updatedReadyToFloat)
                {
                    cubeUp(this.updatedReadyToFloat)
                    this.floatedObject = this.updatedReadyToFloat
                }
            }, 300);
        }

        let fireCubeDown = () =>
        {
            setTimeout(() => 
            {
                if (this.floatedObject)
                {
                    cubeDown(this.floatedObject)
                }
            }, 300);
        }

        let cubeUp = (postName) =>
        {
            this.float = gsap.timeline()
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
                    val: body.rotacion.floatVal, // valFrom
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
                    duration: 0.5,
                    x: body.position.x + 0.5,
                    z: body.position.z,
                    ease: 'Power1.easeInOut',
                }
            )

            this.respiracion = gsap.to(
                body.position, 
                { 
                    y: 37,
                    delay: 1,
                    duration: 11,
                    repeat: -1, 
                    yoyo: true, 
                    ease: "power1.inOut",
                }
            )

            this.float.to(
                body.position,
                {
                    duration: 2,
                    y: 35,
                    ease: 'elastic.out(0.5, 0.4)',
                    onStart: () => {
                        body.sleep()
                    }
                }
            )
            .to(
                body.rotacion, 
                {
                    floatVal: 0.2,
                    duration: 21,
                    ease: "power1.inOut",
                    onUpdate: updateRotation,
                }
            )
            .to(
                body.rotacion, 
                {
                    floatVal: -0.2,
                    duration: 42,
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

        let cubeDown = () =>
        {
            this.float.kill()
            this.respiracion.kill()
            
            let body = this.getBodyByName(this.floatedObject)

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
    
            rotate(body, body.rotacion, 2, (Math.random() - 0.5) * 5)

            this.floatedObject = undefined

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
                        fireCubeUp(postName)
                    },
                    onLeave: () => {
                        fireCubeDown()
                    },
                    onEnterBack: () => {
                        fireCubeUp(postName)
                    },
                    onLeaveBack: () => {
                        fireCubeDown()
                    },
                }
            })
        })
    }

    emisorRayos()
    {
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })
        
        this.mouse = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()
    }

    scrollToPost()
    {
        this.currentIntersect = null

        window.addEventListener('click', () =>
        {

            if(this.currentIntersect)
            {
                console.log(this.currentIntersect);
                const postElement = document.getElementById(this.currentIntersect)

                gsap.to(
                    window, 
                    {
                        duration: 1, 
                        scrollTo: {
                            y: `#${this.currentIntersect}`,
                            offsetY: window.innerHeight / 2 - postElement.offsetHeight / 2
                        }
                    }
                );    
            }
        })
        
    }

    update()
    {
        this.raycaster.setFromCamera(this.mouse, this.camera)

        this.intersects = this.raycaster.intersectObjects(this.MeshObjectsToRaycast)

        // for(const mesh of this.MeshObjectsToRaycast)
        // {
        //     mesh.material.color.set('#ffffff')
        // }

        // if (this.intersects[0]) this.intersects[0].object.material.color.set('#0000ff')

        if(this.intersects.length)
        {
            this.currentIntersect = this.intersects[0].object.postId
        }
        else
        {
            this.currentIntersect = null
        }
    }
}