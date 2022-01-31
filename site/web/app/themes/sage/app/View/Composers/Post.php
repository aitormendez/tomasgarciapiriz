<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Post extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.page-header',
        'partials.content',
        'partials.content-*',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function override()
    {
        return [
            'title' => $this->title(),
            'hero_image' => $this->heroImage(),
            'metadatos' => $this->metadatos(),
        ];
    }

    public function with()
    {
        return [
            'feat_content' => function() {
                {
                    /**
                     * Returns the url and format of image for 3D cube in featured posts.
                     *
                     * @return array
                     */

                    $output = [
                        'tipo' => null,
                        'img_format' => null,
                        'url' => null,
                    ];
            
                    if (get_field('destacados_destacar')) {
                        $tipo = get_field('destacados_tipo');

                        $output['tipo'] = $tipo;

                        if ($tipo === 'image')
                        {
                            $formato = get_field('destacados_formato_imagen');
                            $output['img_format'] = $formato;
            
                            if ($formato === 'horizontal')
                            {
                                $img = get_field('destacados_formato_imagen_horizontal');
                                $output['url'] = $img['url'];
                            } 
                            elseif ($formato === 'vertical')
                            {
                                $img = get_field('destacados_formato_imagen_vertical');
                                $output['url'] = $img['url'];
                            }
                            elseif ($formato === 'cuadrado')
                            {
                                $img = get_field('destacados_formato_imagen_cuadrado');
                                $output['url'] = $img['url'];
                            }
                        } 
                        elseif ($tipo === 'model')
                        {
                            $model = get_field('destacados_modelo');
                            $output['url'] = $model['url'];
                        }
                    }

                    return $output;
                }
            }
        ];
    }

    /**
     * Returns the post title.
     *
     * @return string
     */
    public function title()
    {
        if ($this->view->name() !== 'partials.page-header') {
            return get_the_title();
        }

        if (is_home()) {
            if ($home = get_option('page_for_posts', true)) {
                return get_the_title($home);
            }

            return __('Latest Posts', 'sage');
        }

        if (is_archive()) {
            return get_the_archive_title();
        }

        if (is_search()) {
            return sprintf(
                /* translators: %s is replaced with the search query */
                __('Search Results for %s', 'sage'),
                get_search_query()
            );
        }

        if (is_404()) {
            return __('Not Found', 'sage');
        }

        return get_the_title();
    }

    /**
     * Returns hero image.
     *
     * @return array
     */
    public function heroImage()
    {
        global $post;
        $out = [
            'has_img' => false,
        ];

        $img = get_field ('hero_image', $post->ID);

        if ($img) {
            $out['has_img'] = true;
            $out['url'] = $img['url'];
            $out['srcset'] = wp_get_attachment_image_srcset($img['ID']);
            $out['alt'] = $img['alt'];
        } else {
            $out['post-header-bg-color'] = get_field('post-header-bg-color');

        }

        return $out;
    }

    /**
     * Returns metadatos.
     *
     * @return array
     */
    public function metadatos()
    {
        global $post;

        // ¿Que significa bloques?
        // bloques[0] = tiene autores
        // bloques[1] = tiene colaboradores
        // bloques[2] = tiene tiene datos
        // bloques[3] = tiene tipos de proyecto

        $out = [
            'has_metadatos' => false,
            'has_adjuntos' => false,
            'has_files' => false,
            'bloques' => [0, 0, 0, 0],
            'mostrar_construido' => get_field('construido_mostrar'),
        ];

        $rows_autores = get_field('autores');
        $rows_colaboradores = get_field('colaboradores');
        $rows_adjuntos = get_field('adjuntos');
        $cliente = get_field('client');
        $superficie = get_field('superficie');
        $costo = get_field('costo');
        $construido = get_field('construido');
        $fecha = get_field('fecha');
        $tipos_de_proyecto = get_the_terms( $post->ID, 'project_type');

        if ($rows_autores) {
            $autores = [];
            foreach( $rows_autores as $autor ) {
                array_push($autores, $autor);
            };
            $out['has_metadatos'] = true;
            $out['autores'] = $autores;
            $out['bloques'][0] = 1;
        }

        if ($rows_adjuntos) {
            $adjuntos = [];
            foreach( $rows_adjuntos as $adjunto ) {
                array_push($adjuntos, $adjunto);
            };
            $out['has_adjuntos'] = true;
            $out['adjuntos'] = $adjuntos;
        }

        if ($rows_colaboradores) {
            $colaboradores = [];
            foreach( $rows_colaboradores as $colaborador ) {
                array_push($colaboradores, $colaborador);
            };
            $out['has_metadatos'] = true;
            $out['colaboradores'] = $colaboradores;
            $out['bloques'][1] = 1;
        }

        if ($cliente) {
            $out['has_metadatos'] = true;
            $out['cliente'] = $cliente;
            $out['bloques'][2] = 1;
        }

        if ($superficie) {
            if (ICL_LANGUAGE_CODE === 'es') {
                $out['superficie'] = number_format($superficie, 0, ',', '.');
            } else {
                $out['superficie'] = number_format($superficie, 0);
            }
            $out['has_metadatos'] = true;
            $out['bloques'][2] = 1;
        }

        if ($costo) {
            if (ICL_LANGUAGE_CODE === 'es') {
                $out['costo'] = number_format($costo, 2, ',', '.');
            } else {
                $out['costo'] = number_format($costo, 0);
            }
            $out['has_metadatos'] = true;
            $out['bloques'][2] = 1;
        }

        if ($fecha) {
            $out['has_metadatos'] = true;
            $out['anio'] = $fecha; // ACF 'return format Y' en la declaración del campo
            $out['bloques'][2] = 1;
        }

        if ($out['mostrar_construido'] == 1) {
            if ($construido) {
                $out['has_metadatos'] = true;
                $out['construido'] = $construido ? __('Sí', 'sage') : __('No', 'sage');
                $out['bloques'][2] = 1;
            }
        }


        if ($tipos_de_proyecto) {
            $out['tipos_de_proyecto'] = array_map(function ($tipo) {
                $out = [
                    'nombre' => $tipo->name,
                    'link' => get_term_link($tipo->term_id),
                ];
                return $out;

            }, $tipos_de_proyecto);

            $out['has_metadatos'] = true;
            $out['bloques'][3] = 1;
        }

        $out['num_bloques'] = array_sum($out['bloques']);

        return $out;
    }

}
