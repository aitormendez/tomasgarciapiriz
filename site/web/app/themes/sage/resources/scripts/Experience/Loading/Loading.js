import * as THREE from 'three'

export default class ManageLoading
{
    constructor()
    {
        this.loadingBarFillElement = document.querySelector('.loading-bar .fill')
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                
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