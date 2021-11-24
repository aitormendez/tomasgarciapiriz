import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setShape()
        this.setBody()
    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(500, 64)
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
        this.scene.add(this.mesh)
        
    }

    setShape()
    {
        this.floorShape = new CANNON.Plane()
    }

    setBody()
    {
        this.floorBody = new CANNON.Body({
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        this.floorBody.mass = 0
        this.floorBody.addShape(this.floorShape)
        this.floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)
        this.experience.world.physicsWorld.addBody(this.floorBody)
    }
}