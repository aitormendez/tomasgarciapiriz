import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import PostCubes from './PostCubes.js'


export default class World
{
    constructor(canvas)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.axesHelper = new THREE.AxesHelper( 5 );
    this.scene.add( this.axesHelper );

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('World')
        }

        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.testCube = new PostCubes()
            this.environment = new Environment()
        })

    }

    update()
    {
        // if(this.testCube)
        //     this.testCube.update()
    }
}