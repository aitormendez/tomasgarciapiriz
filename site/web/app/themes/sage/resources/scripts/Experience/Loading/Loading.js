import * as THREE from 'three'
import EventEmitter from '../Utils/EventEmitter.js'

export default class ManageLoading
{
    constructor()
    {
        this.loadingBarFillElement = document.querySelector('.loading-bar .fill')
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                console.log('WorldLoading loaded')
            },

            // Progress
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                this.progressRatio = itemsLoaded / itemsTotal
                this.loadingBarFillElement.style.transform = `scaleX(${this.progressRatio})`
            }
        )
    }
}