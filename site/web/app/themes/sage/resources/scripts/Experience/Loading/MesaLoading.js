import * as THREE from 'three'
import Experience from '../Experience.js'

export default class MesaLoading
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.resource = this.resources.items.mesaModel

        this.setModel()
        this.setTextures()
        this.setMaterial()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.rotateY(1)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setTextures()
    {
        this.texture = this.resources.items.toonTexture
        this.texture.magFilter = THREE.NearestFilter
        
    }

    setMaterial()
    {
        this.material = new THREE.MeshToonMaterial({
            color: '#00ff00',
            gradientMap: this.texture
        })

        this.model.traverse((child) =>
        {
            child.material = this.material
        })
    }
}

