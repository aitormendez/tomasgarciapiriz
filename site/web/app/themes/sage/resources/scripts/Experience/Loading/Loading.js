import * as THREE from 'three'

export default class ManageLoading
{
    constructor()
    {
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                console.log('loaded')
            },

            // Progress
            () =>
            {
                console.log('progress')
            }
        )       
    }

}