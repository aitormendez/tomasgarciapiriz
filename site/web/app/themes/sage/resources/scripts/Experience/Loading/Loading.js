import * as THREE from 'three'

export default class ManageLoading
{
    constructor()
    {
        this.loadingBarFillElement = document.querySelector('.loading-bar .fill')
        this.loadingBarElement = document.querySelector('.loading-bar')

        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                this.loadingBarElement.classList.add('hidden')
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