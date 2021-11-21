// import * as THREE from 'three'
import * as CANNON from 'cannon-es' 
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
        this.htmlPostsElement = document.getElementById('posts')
        this.htmlPostsBgElement = document.getElementById('posts-bg')

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
            this.setHtml()
        })

    }

    physics()
    {
        this.physicsWorld = new CANNON.World()
        this.physicsWorld.gravity.set(0, - 2, 0)
        this.physicsWorld.allowSleep = true
        this.physicsWorld.broadphase = new CANNON.SAPBroadphase(this.physicsWorld)

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

    setHtml()
    {
        this.htmlPostsElement.classList.remove('hidden')
        this.htmlPostsBgElement.style.opacity = '0.8';
    }

    update()
    {
        this.physicsWorld.step(1 / 60, this.experience.time.delta, 3)
        if(this.postCubes) this.postCubes.update()
    }
}