// import * as THREE from 'three'
import CANNON from 'cannon' 
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import PostCubes from './PostCubes.js'
// import TestCube from './TestCube.js'




export default class World
{
    constructor(canvas)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('World')
        }

        this.physics()

        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.postCubes = new PostCubes()
            this.environment = new Environment()
        })

    }

    physics()
    {
        this.physicsWorld = new CANNON.World()
        this.physicsWorld.gravity.set(0, - 9.82, 0)

        this.defaultMaterial = new CANNON.Material('default')

        this.defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.7
            }
        )
        
        this.physicsWorld.addContactMaterial(this.defaultContactMaterial)
    }

    update()
    {
        if(this.postCubes)
            this.postCubes.update()
    }
}