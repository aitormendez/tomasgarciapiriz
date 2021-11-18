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
        console.log(this.experience );

        // Setup
        this.setCubes()
    }


    setCubes()
    {
        this.index = 0
        this.cubePosts = {}

        for (const source of this.resources.sources) {
            if (source.post) {

                this.cubePosts[source.postName] = {}

                // texture
                this.cubePosts[source.postName].texture = this.experience.resources.items[source.name]
                this.cubePosts[source.postName].texture.encoding = THREE.sRGBEncoding

                // Material
                this.cubePosts[source.postName].material = new THREE.MeshStandardMaterial({
                    map: this.cubePosts[source.postName].texture
                })

                // Mesh
                this.cubePosts[source.postName].mesh = new THREE.Mesh(this.geometry, this.cubePosts[source.postName].material)

                // Scene
                this.scene.add(this.cubePosts[source.postName].mesh)
                
                this.cubePosts[source.postName].mesh.position.x = (Math.random() - 0.5) * 50
                this.cubePosts[source.postName].mesh.position.z = (Math.random() - 0.5) * 50
                this.cubePosts[source.postName].mesh.position.y = Math.random() * 20

                // Cannon.js (physics)
                this.cubePosts[source.postName].shape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 1))

                this.cubePosts[source.postName].body = new CANNON.Body({
                    mass: 1,
                    position: new CANNON.Vec3(
                        this.cubePosts[source.postName].mesh.position.x,
                        this.cubePosts[source.postName].mesh.position.z,
                        this.cubePosts[source.postName].mesh.position.y),
                    shape: this.cubePosts[source.postName].shape,
                    material: this.physicsWorld.defaultMaterial
                })
                

                this.physicsWorld.addBody(this.cubePosts[source.postName].body)

                this.index++
            }
        }

        
        
        

    }

    update()
    {
        // console.log(this.experience.time.delta);
        this.physicsWorld.step(1 / 60, this.experience.time.delta, 3)
        // console.log(this.cubePosts.imagePost22.body.position.y)
    }
}