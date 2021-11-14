import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.sceneLoading = this.experience.sceneLoading
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        console.log(this.scene);

        // Setup
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(50, 64)
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial()
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.sceneLoading.add(this.mesh)
        this.scene.add(this.mesh)
        
    }


}