import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.experience = new Experience()
        this.loadingManager = this.experience.loadingManager.loadingManager

        // Setup
        this.sources = sources
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.addSourcesFromPosts()
        this.startLoading(this.sources)
    }

    setLoaders()
    {
        // World loaders
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)

        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('./Utils/draco/')
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)

        // WorldLoading loaders
        this.loaders.preGltfLoader = new GLTFLoader()
        this.loaders.preTextureLoader = new THREE.TextureLoader()
    }

    addSourcesFromPosts()
    {
        this.posts =  document.getElementsByClassName('post')

        for (const post of this.posts) {
            
            let thumbnailURL = post.getElementsByTagName('img')[0].src

            if (thumbnailURL) {
                let thumbnailPath = thumbnailURL.match('\/app(.*).jpg')[0]    
                let resourceObject = {
                    name: post.id,
                    type: 'texture',
                    path: thumbnailPath
                }

                this.sources.push(resourceObject)
            }
        }
    }

    startLoading(sources)
    {
        // Load each source
        for(const source of sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'preGltfModel')
            {
                this.loaders.preGltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'preTexture')
            {
                this.loaders.preTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}