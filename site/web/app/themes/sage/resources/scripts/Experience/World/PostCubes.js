import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import gsap from 'gsap'
import Experience from '../Experience.js'
import { rotate } from '../Utils/rotate.js'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

export default class PostCubes
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.world = this.experience.world
        this.objectsToUpdate = []
        this.MeshObjectsToRaycast = []
        // this.objectsWithNames = {}
        this.modelMaterial = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            receiveShadow: true,
            castShadow: true
        })

        // Setup
        this.setCubes()
    }

    setCubes()
    {
        let index = 0

        for (const source of this.resources.sources)
        {
            if (source.post)
            {
                let position = {
                    x: (Math.random() - 0.5) * 10,
                    z: (Math.random() - 0.5) * 10,
                    y: index + 10
                }

                if (source.type === 'texture') {

                    let texture = this.experience.resources.items[source.name]
                    texture.encoding = THREE.sRGBEncoding
    
                    this.createCube(texture, position, source.postName, source.postId, source.format)
                }

                if (source.type === 'gltfModel') {

                    let model = this.experience.resources.items[source.name].scene

                    this.createModel(model, position, source.postName, source.postId, this.modelMaterial)
                }

                index++
            }
        }
    }

    rotateInitial(body)
    {
        body.rotacion = {
            val: 1,
            vector: new CANNON.Vec3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5,
            )
        }

        if (body.tipo === 'cube') {
            rotate(body, body.rotacion, body.rotacion.val, (Math.random() - 0.5) * 5)
        }
        

        gsap.to(
            body.position, 
            {
                duration:1, 
                y: body.position.y + 5
            }
        )
    }

    createModel(model, position, name, postId, material)
    {
        // Threejs mesh
        // OJO no hace falta crear un mesh porque el loaded gltf ya es una instancia de mesh
        const mesh = model.children[0]

        mesh.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = material
            }
        });

        mesh.castShadow = true
        // mesh.receiveShadow = true
        mesh.name = name
        mesh.tipo = 'model'
        mesh.postId = postId
        this.scene.add(mesh)

        // Cannon.js body
        const x = (mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x) * 0.5
        const y = (mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y) * 0.5
        const z = (mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z) * 0.5

        const shape = new CANNON.Box(new CANNON.Vec3( 
            x,
            z,
            y,
        ))

        const body = new CANNON.Body({
            mass: 1,
            shape: shape,
            material: this.world.defaultMaterial,
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        body.name = name
        body.tipo = 'model'
        body.position.copy(position)
        this.world.physicsWorld.addBody(body)

        // Save in objects to update
        this.objectsToUpdate.push({ mesh, body })

        // Save in objects to raycast (postsHtml.js)
        this.MeshObjectsToRaycast.push(mesh)

        // // Save in ordered list with cube names
        // this.objectsWithNames[name] = { mesh, body }

        this.rotateInitial(body)
    }

    createCube(texture, position, name, postId, format)
    {
        // Threejs mesh

        if (format === 'cuadrado') {
            this.geometry = this.resources.items.cubeCuadrado.scene.children[0].geometry
        }
        else if (format === 'horizontal')
        {
            this.geometry = this.resources.items.cubeHorizontal.scene.children[0].geometry
        }
        else if (format === 'vertical')
        {
            this.geometry = this.resources.items.cubeVertical.scene.children[0].geometry
        }
        
        const mesh = new THREE.Mesh(
            this.geometry,
            new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms:
                {
                    uTexture: { value: texture },
                    uPosY: { value: 0.5 }
                }
            })
        )
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.name = name
        mesh.tipo = 'cube'
        mesh.postId = postId
        this.scene.add(mesh)

        // Cannon.js body
        const shape = new CANNON.Box(new CANNON.Vec3( 1, 0.5, 1))

        const body = new CANNON.Body({
            mass: 1,
            shape: shape,
            material: this.world.defaultMaterial,
            collisionFilterGroup: 1,
            collisionFilterMask: 1
        })
        body.name = name
        body.tipo = 'cube'
        body.position.copy(position)
        this.world.physicsWorld.addBody(body)

        // Save in objects to update
        this.objectsToUpdate.push({ mesh, body })

        // Save in objects to raycast (postsHtml.js)
        this.MeshObjectsToRaycast.push(mesh)

        // // Save in ordered list with cube names
        // this.objectsWithNames[name] = { mesh, body }

        this.rotateInitial(body)
    }

    update()
    {
        for(const object of this.objectsToUpdate)
        {
            object.mesh.position.copy(object.body.position)
            object.mesh.quaternion.copy(object.body.quaternion)

            if (object.mesh.tipo === 'cube') {
                object.mesh.material.uniforms.uPosY.value = object.mesh.position.y
            }
        }
    }
}