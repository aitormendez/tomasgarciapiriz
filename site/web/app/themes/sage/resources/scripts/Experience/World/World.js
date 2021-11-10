import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'

export default class World
{
    constructor(canvas)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.environment = new Environment()

        // Test mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial()
        )
        this.scene.add(testMesh)

        console.log(this.scene);


    }
}