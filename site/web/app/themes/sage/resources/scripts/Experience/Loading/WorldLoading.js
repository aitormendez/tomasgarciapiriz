import * as THREE from 'three'
import Experience from '../Experience.js'
import EnvironmentLoading from './EnvironmentLoading.js'
import FloorLoading from './FloorLoading.js'
import MesaLoading from '../Loading/MesaLoading.js'



export default class WorldLoading
{
    constructor(canvas)
    {
        this.experience = new Experience()
        this.sceneLoading = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Loading scene')
        }

        this.resources.on('readyLoadingScene', () =>
        {
            // Setup
            this.floorLoading = new FloorLoading()
            this.mesaLoading = new MesaLoading()
            this.environmentLoading = new EnvironmentLoading()
        })
    }

    update()
    {
        if(this.mesaLoading)
            this.mesaLoading.update()
    }
}