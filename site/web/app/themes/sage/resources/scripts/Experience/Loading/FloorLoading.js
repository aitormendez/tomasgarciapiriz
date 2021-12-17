import * as THREE from 'three'
import Experience from '../Experience.js'

export default class FloorLoading
{
    constructor()
    {
        this.experience = new Experience()
        this.sceneLoading = this.experience.sceneLoading
        this.resources = this.experience.resources

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
    }


}