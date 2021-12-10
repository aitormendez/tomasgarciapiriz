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
        // suelo visible
        this.geometry = new THREE.CircleGeometry(500, 64)

        //rectángulo en el suelo visible
        this.geometryBlackRectangle = new THREE.PlaneGeometry( 50, 30 )
        this.geometryWhiteRectangle = new THREE.PlaneGeometry( 48, 28 )

        // //paredes visibles para testar las paredes invisibles
        // this.geometryWall = new THREE.BoxGeometry( 50, 40, 0.2 )
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial()
        this.materialBlack = new THREE.MeshBasicMaterial({ color: '#000000' })
    }

    setMesh()
    {
        // suelo
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.scene.add(this.mesh)

        // rectángulo negro
        this.meshRactangleBlack = new THREE.Mesh(this.geometryBlackRectangle, this.materialBlack)
        this.meshRactangleBlack.rotation.x = - Math.PI * 0.5
        this.scene.add(this.meshRactangleBlack)

        // rectángulo blanco
        this.meshRectangleWhite = new THREE.Mesh(this.geometryWhiteRectangle, this.material)
        this.meshRectangleWhite.receiveShadow = true
        this.meshRectangleWhite.rotation.x = - Math.PI * 0.5
        this.meshRectangleWhite.position.y = 0.01
        this.scene.add(this.meshRectangleWhite)

        // // paredes visibles
        // this.meshWall = new THREE.Mesh(this.geometryWall, this.materialBlack)
        // this.meshWall.rotation.y = Math.PI * 0.5
        // this.scene.add(this.meshWall)


    }

    setShape()
    {
        this.floorShape = new CANNON.Plane()
    }

    setBody()
    {

        // suelo físico invisible
        this.floorBody = new CANNON.Body({
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        this.floorBody.mass = 0
        this.floorBody.addShape(this.floorShape)
        this.floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)

        /**
         * paredes invisibles
         */

        // norte
        this.wallNBody = new CANNON.Body({
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        this.wallNBody.mass = 0
        this.wallNBody.addShape(this.floorShape)
        this.wallNBody.position.z = - 13
        this.meshWall.position.copy(this.wallNBody.position)
        // this.wallNBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)

        // sur
        this.wallSBody = new CANNON.Body({
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        this.wallSBody.mass = 0
        this.wallSBody.addShape(this.floorShape)
        this.wallSBody.position.z = 13
        // this.meshWall.position.copy(this.wallSBody.position)
        this.wallSBody.quaternion.setFromAxisAngle(new CANNON.Vec3( 0, 1, 0), Math.PI * 1)

        // este
        this.wallEBody = new CANNON.Body({
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        this.wallEBody.mass = 0
        this.wallEBody.addShape(this.floorShape)
        this.wallEBody.position.x = 25
        // this.meshWall.position.copy(this.wallEBody.position)
        this.wallEBody.quaternion.setFromAxisAngle(new CANNON.Vec3( 0, 1, 0), - Math.PI * 0.5)
        
        // oeste
        this.wallOBody = new CANNON.Body({
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        this.wallOBody.mass = 0
        this.wallOBody.addShape(this.floorShape)
        this.wallOBody.position.x = - 25
        // this.meshWall.position.copy(this.wallEBody.position)
        this.wallOBody.quaternion.setFromAxisAngle(new CANNON.Vec3( 0, 1, 0), Math.PI * 0.5)



        this.experience.world.physicsWorld.addBody(this.floorBody)
        this.experience.world.physicsWorld.addBody(this.wallNBody)
        this.experience.world.physicsWorld.addBody(this.wallSBody)
        this.experience.world.physicsWorld.addBody(this.wallEBody)
        this.experience.world.physicsWorld.addBody(this.wallOBody)

    }
}