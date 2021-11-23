import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.sceneLoading = this.experience.sceneLoading
        this.canvas = this.experience.canvas

        this.setInstance()
        // this.setControls()
        // this.testCameraPosition()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 300)
        this.instance.position.set(0,40,0)
        this.instance.rotation.x = - 90 * Math.PI / 180
        this.scene.add(this.instance)
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

    testCameraPosition()
    {
        this.instance.position.set(0, 80, 0)
        this.instance.updateProjectionMatrix()
        console.log('lkjlj');
    }

    update()
    {
        // this.controls.update()
    }
}