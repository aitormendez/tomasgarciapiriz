import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer
{
    constructor(canvas)
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.sceneLoading
        this.camera = this.experience.cameraLoading

        this.setInstance()

        this.resources.on('ready', () =>
        {
            this.changeScene(this.experience.scene, this.experience.camera)
        })
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        })
        
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        this.instance.setClearColor( 0xffffff, 0);
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    changeScene(chooseScene, chooseCamera)
    {
        this.scene = chooseScene
        this.camera = chooseCamera
        // this.camera.controls.enabled = false
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}