import * as THREE from 'three'
import Experience from '../Experience.js'

export default class EnvironmentLoading
{
    constructor()
    {
        this.experience = new Experience()
        this.sceneLoading = this.experience.sceneLoading
        this.debug = this.experience.debug

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder('environment')
        // }


        // Setup
        this.setSunLight()
    }


    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 2)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 6
        this.sunLight.shadow.camera.near = 4
        this.sunLight.shadow.camera.top = 1
        this.sunLight.shadow.camera.right = 1
        this.sunLight.shadow.camera.bottom = - 1
        this.sunLight.shadow.camera.left = - 1
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(0, 3, - 4)
        this.sceneLoading.add(this.sunLight)

        // const directionalLightCameraHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        // this.scene.add(directionalLightCameraHelper)

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder
        //         .add(this.sunLight, 'intensity')
        //         .name('Light intesity')
        //         .min(0)
        //         .max(2)
        //         .step(0.001)
        // }
    }
}