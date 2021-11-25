import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import gsap from 'gsap'
import Experience from '../Experience.js'
import { rotate } from '../Utils/rotate.js'

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
                    x: (Math.random() - 0.5) * 10,
                    z: (Math.random() - 0.5) * 10,
                    y: Math.random() * 40
                }
                let texture = this.experience.resources.items[source.name]
                texture.encoding = THREE.sRGBEncoding

                this.createCube(texture, position, source.postName)
            }
        }
    }

    rotateInitial(body)
    {
        body.rotation = {
            val: 1,
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5,
        }

        rotate(body, body.rotation, body.rotation.val, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5)

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
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.name = name
        this.scene.add(mesh)

        // Cannon.js body
        const shape = new CANNON.Box(new CANNON.Vec3( 1, 0.25, 1))

        const body = new CANNON.Body({
            mass: 1,
            shape: shape,
            material: this.physicsWorld.defaultMaterial,
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        body.name = name
        body.position.copy(position)
        this.physicsWorld.addBody(body)

        // Save in objects to update
        this.objectsToUpdate.push({ mesh, body })

        // Save in ordered list with cube names
        this.objectsWithNames[name] = { mesh, body }

        this.rotateInitial(body)
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