import * as THREE from 'three'
import CANNON from 'cannon'
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

                this.createCube(texture, position)

            }
        }
    }

    createCube(texture, position)
    {
        // Threejs mesh
        const mesh = new THREE.Mesh(
            this.geometry,
            new THREE.MeshStandardMaterial({
                map: texture,
            })
        )
        mesh.position.copy(position)
        this.scene.add(mesh)

        // Cannon.js body
        const shape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 1))

        const body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 3, 0),
            shape: shape,
            material: this.physicsWorld.defaultMaterial
        })
        body.position.copy(position)
        this.physicsWorld.addBody(body)

        // Save in objects to update
        this.objectsToUpdate.push({ mesh, body })
    }

    update()
    {
        for(const object of this.objectsToUpdate)
        {
            object.mesh.position.copy(object.body.position)
        }
    }
}