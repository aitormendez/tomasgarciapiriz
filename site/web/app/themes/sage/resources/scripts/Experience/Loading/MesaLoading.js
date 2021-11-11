import Experience from '../Experience.js'

export default class MesaLoading
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }
}