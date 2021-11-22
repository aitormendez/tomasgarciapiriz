import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'

import ManageLoading from './Loading/Loading.js'
import WorldLoading from './Loading/WorldLoading.js'
import CameraLoading from './Loading/CameraLoading.js'
import sourcesLoading from './Loading/sourcesLoading.js'

import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'




let instance = null

export default class Experience {
    constructor(canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
            
        // Global access
        window.experience = this

        // Options
        this.canvas = canvas
        this.scene = 'WorldLoading'

        // Setup
        this.debug = new Debug()
        this.loadingManager = new ManageLoading()
        this.sizes = new Sizes()
        this.time = new Time()

        this.sceneLoading = new THREE.Scene()
        this.scene = new THREE.Scene()

        this.resources = new Resources(sources, sourcesLoading)

        this.cameraLoading = new CameraLoading()
        this.camera = new Camera()

        this.worldLoading = new WorldLoading()
        this.world = new World()

        // Render
        this.renderer = new Renderer()
        
        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.worldLoading.update()
        this.world.update()
        this.renderer.update()
    }
}