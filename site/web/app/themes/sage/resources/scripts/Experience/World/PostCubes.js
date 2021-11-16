import * as THREE from 'three'
import Experience from '../Experience.js'

export default class PostCubes
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.texture = this.experience.resources.items.imagepost104
        // this.texture.repeat.set(1.2, 1.2)
        // this.texture.rotation = 0.5
        // this.texture.center = {x: 0.5, y: 0.5}
        this.cubePost2Model = this.resources.items.cubePost1.scene

        // Setup
        this.setMaterial()
        this.setModel()
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.texture,
        })
    }

    setModel()
    {
        // cubePost2 modelo
        this.cubePost2Model = this.resources.items.cubePost2.scene

        this.scene.add(this.cubePost2Model)

        this.cubePost2Model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                console.log(this.material);
                child.castShadow = true
                child.material = this.material
            }
        })
    }

    update()
    {

    }
}