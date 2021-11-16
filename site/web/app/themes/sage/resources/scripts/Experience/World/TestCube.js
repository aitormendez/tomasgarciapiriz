import * as THREE from 'three'
import Experience from '../Experience.js'

export default class TestCube
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
        this.setGeometry()
        this.setModel()
        // this.setMesh()
    }

    setGeometry()
    {
        // cubo generado
        this.geometry = new THREE.BoxGeometry(2, 2, 2)
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.texture,
            refractionRatio: 0,
            // flatShading: true
        })
    }

    setMesh()
    {
        this.cuboGenerado = new THREE.Mesh(this.geometry, this.material)
        this.cuboGenerado.rotation.x = - Math.PI * 0.5
        this.cuboGenerado.position.y = 0.15
        this.cuboGenerado.receiveShadow = true
        this.cuboGenerado.castShadow = true
        this.scene.add(this.cuboGenerado)
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