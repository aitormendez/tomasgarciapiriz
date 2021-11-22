import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import gsap from 'gsap'
import Experience from '../Experience.js'

export default class PostCubes
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physicsWorld = this.experience.world.physicsWorld
        this.geometry = this.resources.items.cubePost2.scene.children[0].geometry
        this.objectsToUpdate = []
        this.objectsWithNames = {}

        // Setup
        this.setCubes()
    }

    setCubes()
    {

        for (const source of this.resources.sources)
        {
            if (source.post)
            {
                let position = {
                    x: (Math.random() - 0.5) * 20,
                    z: (Math.random() - 0.5) * 20,
                    y: Math.random() * 40
                }
                let texture = this.experience.resources.items[source.name]
                texture.encoding = THREE.sRGBEncoding

                this.createCube(texture, position, source.postName)
            }
        }
    }

    rotate(body)
    {
        let rotation = { 
            val: 0,
            qx: Math.random() -0.5,
            qy: Math.random() -0.5,
            qz: Math.random() -0.5,
        }

        gsap.to( 
            rotation, 
            { 
                duration: 2,
                val: (Math.random() -0.5) * 5,
                ease: "power1.easeOut",
                onUpdate: updateRotation
            })

        function updateRotation() {
            body.quaternion.setFromAxisAngle(
                new CANNON.Vec3(rotation.qx, rotation.qy, rotation.qz),
                Math.PI * rotation.val
            )
        }

        gsap.to(
            body.position, 
            {
                duration:1, 
                y: body.position.y + 10
            }
        )
    }

    createCube(texture, position, name)
    {
        // Threejs mesh
        const mesh = new THREE.Mesh(
            this.geometry,
            new THREE.MeshStandardMaterial({
                map: texture,
            })
        )
        mesh.position.copy(position)
        mesh.name = name
        this.scene.add(mesh)

        // Cannon.js body
        const shape = new CANNON.Box(new CANNON.Vec3( 1, 0.25, 1))

        const body = new CANNON.Body({
            mass: 1,
            shape: shape,
            material: this.physicsWorld.defaultMaterial,
        })
        body.name = name
        body.position.copy(position)
        this.physicsWorld.addBody(body)

        // Save in objects to update
        this.objectsToUpdate.push({ mesh, body })

        // Save in ordered list with cube names
        this.objectsWithNames[name] = { mesh, body }

        this.rotate(body)
    }

    update()
    {
        for(const object of this.objectsToUpdate)
        {
            object.mesh.position.copy(object.body.position)
            object.mesh.quaternion.copy(object.body.quaternion)
        }
    }
}