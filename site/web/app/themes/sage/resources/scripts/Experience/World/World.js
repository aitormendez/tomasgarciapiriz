import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'



export default class World
{
    constructor(canvas)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('World')
        }

        this.resources.on('ready', () =>
        {
            // Setup
            this.environment = new Environment()
        })

    }

    update()
    {
        
    }
}