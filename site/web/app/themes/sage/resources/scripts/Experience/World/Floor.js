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
        // this.geometryWallNCube = new THREE.BoxGeometry( 50, 40, 0.2 )
        // console.log(this.geometryWallNCube);
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
        // this.meshWallN = new THREE.Mesh(this.geometryWallNCube, this.materialBlack)
        // this.meshWallN.position.z = - 16
        // this.scene.add(this.meshWallN)
        // console.log(this.meshWallN);

        // this.meshWallS = new THREE.Mesh(this.geometryWallNCube, this.materialBlack)
        // this.meshWallS.position.z = 16
        // this.scene.add(this.meshWallS)
        // console.log(this.meshWallS);
    }

    setShape()
    {
        this.floorShape = new CANNON.Plane()
        this.ivisibleWallN = new CANNON.Box(new CANNON.Vec3(200, 200, 0.1))
        // this.ivisibleWallS = new CANNON.Plane()
        // this.ivisibleWallE = new CANNON.Plane()
        // this.ivisibleWallW = new CANNON.Plane()
    }

    setBody()
    {

        // suelo físico visible
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

        //norte
        this.ivisibleWallNBody = new CANNON.Body({
            collisionFilterGroup: 1,
            collisionFilterMask: 1,
            mass: 0,
            shape: this.ivisibleWallN
        })
        this.ivisibleWallNBody.position.z = - 16

        // sur
        this.ivisibleWallSBody = new CANNON.Body({
            collisionFilterGroup: 1,
            collisionFilterMask: 1,
            mass: 0,
            shape: this.ivisibleWallN
        })
        this.ivisibleWallSBody.position.z = 16


        this.experience.world.physicsWorld.addBody(this.floorBody)

        // this.meshWallN.position.copy(this.ivisibleWallNBody.position)

    }
}