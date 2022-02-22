import lightGallery from 'lightgallery';

export class LightGal
{
    constructor()
    {
        this.construirGalerias()
    }

    construirGalerias()
    {
        this.galerias = document.getElementsByClassName('lightbox')
        console.log(this.galerias);
        for (const galeria of this.galerias) {
            lightGallery(galeria, {
                selector: 'a',
                mode: 'lg-slide',
                preload: 2,
                download: false,
                hideBarsDelay: 1000,
            })
        }
    }
}