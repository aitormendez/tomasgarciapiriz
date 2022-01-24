import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }


        // Setup
        this.setSunLight()
    }


    setSunLight()
    {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0)
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 53
        this.sunLight.shadow.camera.near = 4
        this.sunLight.shadow.camera.top = 20
        this.sunLight.shadow.camera.right = 20
        this.sunLight.shadow.camera.bottom = - 20
        this.sunLight.shadow.camera.left = - 20
        this.sunLight.shadow.mapSize.set(2048, 2048)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-8, 45, - 8)
        this.scene.add(this.sunLight)
        this.scene.add(this.ambientLight)

        // const directionalLightCameraHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        // this.scene.add(directionalLightCameraHelper)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('Sun light intesity')
                .min(0)
                .max(2)
                .step(0.001)
            this.debugFolder
                .add(this.ambientLight, 'intensity')
                .name('Ambient light intesity')
                .min(0)
                .max(2)
                .step(0.001)
        }
    }
}