import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from '../Loading/Floor.js'
import MesaLoading from '../Loading/MesaLoading.js'


export default class World
{
    constructor(canvas)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        this.resources.on('ready', () =>
        {
            
            // Setup
            this.floor = new Floor()
            this.mesaLoading = new MesaLoading()
            this.environment = new Environment()
        })

    }
}