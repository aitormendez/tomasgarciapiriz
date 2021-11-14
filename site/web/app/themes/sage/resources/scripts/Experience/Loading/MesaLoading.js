import * as THREE from 'three'
import Experience from '../Experience.js'

export default class MesaLoading
{
    constructor()
    {
        this.experience = new Experience()
        this.sceneLoading = this.experience.sceneLoading
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.itemsPre.mesaModel

        this.setModel()
        this.setTextures()
        this.setMaterial()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Loading scene')
        }

    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.rotateY(1)
        this.sceneLoading.add(this.model)

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
        this.texture = this.resources.itemsPre.toonTexture
        this.texture.magFilter = THREE.NearestFilter
        
    }

    setMaterial()
    {
        this.material = new THREE.MeshToonMaterial({
            gradientMap: this.texture
        })

        this.model.traverse((child) =>
        {
            child.material = this.material
        })
    }

    update()
    {
        this.model.rotation.y += 0.01
    }
}
