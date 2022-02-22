import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources, sourcesLoading)
    {
        super()

        this.experience = new Experience()
        this.loadingManager = this.experience.loadingManager.loadingManager

        // Setup
        this.sources = sources
        this.sourcesLoading = sourcesLoading

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.itemsPre = {}
        this.toLoadPre = this.sourcesLoading.length
        this.loadedPre = 0
        

        this.setLoaders()
        this.addSourcesFromPosts()
        this.startLoadingLoadingScene(this.sourcesLoading)
    }

    setLoaders()
    {
        // World loaders (escena principal)
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)

        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('./Utils/draco/')
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)

        // WorldLoading loaders (Escena de loading, sin loadingManager)
        this.loaders.preGltfLoader = new GLTFLoader()
        this.loaders.preTextureLoader = new THREE.TextureLoader()
    }

    addSourcesFromPosts()
    {
        this.posts =  document.getElementsByClassName('post')

        for (const post of this.posts) {
            let type
            let hiddenElement = post.getElementsByClassName('thumb-path');

            console.log(hiddenElement);

            if (hiddenElement) {
                let path = hiddenElement[0].dataset.path.match('\/app(.*)')[0]
                let format = hiddenElement[0].dataset.format
                let postName = post.id.replace(/-/g, "")
                let sourceName = 'image' + postName

                let resourceObject = {
                    name: '',
                    type: '',
                    path: path,
                    post: true,
                    imgSrc: hiddenElement,
                    postName: postName,
                    postId: post.id
                }

                if (hiddenElement[0].dataset.type === 'image') {
                    resourceObject['name'] = 'image' + postName
                    resourceObject['type'] = 'texture'
                    resourceObject['format'] = format
                } 
                else if (hiddenElement[0].dataset.type === 'model')
                {
                    resourceObject['name'] = 'model' + postName
                    resourceObject['type'] = 'gltfModel'
                }

                this.sources.push(resourceObject)

            }
        }
        this.toLoad = this.sources.length
    }

    startLoadingLoadingScene(sources) // load loading scene resources (WorldLoading)
    {
        for(const source of sources)
        {
            if(source.type === 'preGltfModel')
            {
                this.loaders.preGltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoadedLoadingScene(source, file)
                    }
                )
            }
            else if(source.type === 'preTexture')
            {
                this.loaders.preTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoadedLoadingScene(source, file)
                    }
                )
            }
        }
    }

    startLoading(sources)  // load main scene resources (World)
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

    sourceLoadedLoadingScene(source, file)
    {
        this.itemsPre[source.name] = file

        this.loadedPre++

        if(this.loadedPre === this.toLoadPre)
        {
            this.trigger('readyLoadingScene')
            this.startLoading(this.sources)    
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