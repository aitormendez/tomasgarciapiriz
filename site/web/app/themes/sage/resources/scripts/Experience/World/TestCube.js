import * as THREE from 'three'
import Experience from '../Experience.js'

export default class TestCube
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.setMaterial()
        this.setModel()
        this.setMesh()
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
        this.cubePost2Model = this.resources.items.cubePost2.scene.children[0]
        this.scene.add(this.cubePost2Model)

        this.cubePost2Model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material = this.material
            }
        })
    }


    setMesh()
    {
        this.cuboGenerado = new THREE.Mesh(this.geometry, this.material)
        this.cuboGenerado.rotation.x = - Math.PI * 0.5
        this.cuboGenerado.position.y = 0.25
        this.cuboGenerado.position.x = 3
        this.cuboGenerado.receiveShadow = true
        this.cuboGenerado.castShadow = true
        // this.cuboGenerado.geometry.attributes = this.cubePost2Model.geometry.attributes
        this.scene.add(this.cuboGenerado)
    }

    update()
    {

    }
}