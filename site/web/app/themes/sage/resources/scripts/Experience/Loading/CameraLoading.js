import * as THREE from 'three'
import Experience from '../Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class CameraLoading
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.sceneLoading = this.experience.sceneLoading
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.name = 'loadingCamera'
        this.instance.position.set(6, 4, 8)
        this.sceneLoading.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}