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
        // this.instance.physicallyCorrectLights = true
        // this.instance.toneMapping = THREE.LinearToneMapping
        // this.instance.toneMappingExposure = 1000
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

    changeScene(choosenScene, choosenCamera)
    {
        this.scene = choosenScene
        this.camera = choosenCamera
        // this.camera.controls.enabled = false

        if (choosenCamera.cameraGroup.children[0].name === 'camera') {
            this.disposeLoadingScene(this.experience.sceneLoading)
        }
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }


    // eliminar scene
    // https://discourse.threejs.org/t/when-to-dispose-how-to-completely-clean-up-a-three-js-scene/1549/11

    disposeLoadingScene(scene)
    {
        scene.traverse(object => {
            if (!object.isMesh) return
            
            // console.log('dispose geometry!')
            object.geometry.dispose()
        
            if (object.material.isMaterial) {
                this.cleanMaterial(object.material)
            } else {
                // an array of materials
                for (const material of object.material) this.cleanMaterial(material)
            }
        })
    }

    cleanMaterial = material => {
        // console.log('dispose material!')
        material.dispose()
    
        // dispose textures
        for (const key of Object.keys(material)) {
            const value = material[key]
            if (value && typeof value === 'object' && 'minFilter' in value) {
                // console.log('dispose texture!')
                value.dispose()
            }
        }
    }
}