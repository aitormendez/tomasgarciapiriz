import * as THREE from 'three'
import Experience from '../Experience.js'

export default class PostCubes
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.geometry = this.resources.items.cubePost2.scene.children[0].geometry
        console.log(this.texture);

        // Setup
        this.setCubes()
    }

    setCubes()
    {
        this.index = 0
        this.cubePosts = {}

        for (const source of this.resources.sources) {
            if (source.post) {

                this.cubePosts[source.postName] = {
                    texture: '',
                    material: '',
                    mesh: ''
                }

                // texture
                this.pathToTexture = this.experience.resources.items[source.name]
                console.log(this.pathToTexture)

                this.cubePosts[source.postName].texture = this.experience.resources.items[source.name]

                this.cubePosts[source.postName].material = new THREE.MeshStandardMaterial({
                    map: this.cubePosts[source.postName].texture
                })
                
                this.cubePosts[source.postName].mesh = new THREE.Mesh(this.geometry, this.cubePosts[source.postName].material)

                this.scene.add(this.cubePosts[source.postName].mesh)
                
                this.cubePosts[source.postName].mesh.position.x = this.index * 2.5
                this.index++

            }
        }

        // cubePost2 modelo
        // this.cubePost2Model = this.resources.items.cubePost2.scene

        // this.scene.add(this.cubePost2Model)

        // this.cubePost2Model.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         child.castShadow = true
        //         child.material = this.material
        //     }
        // })
    }

    update()
    {

    }
}