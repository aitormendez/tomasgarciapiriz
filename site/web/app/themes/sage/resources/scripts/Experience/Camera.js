import * as THREE from 'three'
import gsap from 'gsap'
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
        this.parallax()
        // this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 300)
        this.instance.position.set(0,40,0)
        this.instance.rotation.x = - 90 * Math.PI / 180
        this.scene.add(this.instance)
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

    parallax()
    {
        this.cursor = {
            x: 0,
            y: 0,
            xMdn: 0,
            yMdn: 0
        }

        window.addEventListener('mousemove', (event) =>
        {
            this.cursor.x = event.clientX / this.sizes.width - 0.5
            this.cursor.y = event.clientY / this.sizes.height - 0.5
            this.cursor.xMdn = event.clientX / this.sizes.width * 2 - 1      // normalized device coordinates (NDC)
            this.cursor.yMdn = - (event.clientY / this.sizes.height) * 2 + 1 // normalized device coordinates (NDC)
        })

        this.cameraGroup = new THREE.Group()
        this.scene.add(this.cameraGroup)
        this.cameraGroup.add(this.instance)
    }

    update()
    {
        // this.controls.update()
        this.parallaxX = this.cursor.x
        this.parallaxZ = this.cursor.y
        this.cameraGroup.position.x += (this.parallaxX - this.cameraGroup.position.x) * 0.01
        this.cameraGroup.position.z += (this.parallaxZ - this.cameraGroup.position.z) * 0.01
    }
}