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
            $out['has_img'] = false;
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

        $out = [
            'has_autores' => false,
            'has_colaboradores' => false,
            'has_files' => false,
            'has_datos' => false,
        ];

        $rows_autores = get_field('autores');
        $rows_colaboradores = get_field('colaboradores');
        $cliente = get_field('client');
        $superficie = get_field('superficie');
        $costo = get_field('costo');
        $construido = get_field('construido');
        $fecha = get_field('fecha');
        $tipos_de_proyecto = get_the_terms( $post->ID, 'project_type');

        if ($rows_autores) {
            $out['has_autores'] = true;
            $autores = [];
            foreach( $rows_autores as $autor ) {
                array_push($autores, $autor);
            };
            $out['autores'] = $autores;
        }

        if ($rows_colaboradores) {
            $out['has_colaboradores'] = true;
            $colaboradores = [];
            foreach( $rows_colaboradores as $colaborador ) {
                array_push($colaboradores, $colaborador);
            };
            $out['colaboradores'] = $colaboradores;
            $out['has_datos'] = true;
        }

        if ($cliente) {
            $out['cliente'] = $cliente;
            $out['has_datos'] = true;
        }

        if ($superficie) {
            $out['superficie'] = $superficie;
            $out['has_datos'] = true;
        }

        if ($costo) {
            $out['costo'] = $costo;
            $out['has_datos'] = true;
        }

        if ($fecha) {
            $out['anio'] = $fecha; // ACF 'return format Y' en la declaración del campo
            $out['has_datos'] = true;
        }

        if ($construido) {
            $out['construido'] = $construido ? __('Sí', 'sage') : __('No', 'sage');
            $out['has_datos'] = true;
        }

        if ($tipos_de_proyecto) {
            $out['tipos_de_proyecto'] = array_map(function ($tipo) {
                $out = [
                    'nombre' => $tipo->name,
                    'link' => get_term_link($tipo->term_id),
                ];
                return $out;

            }, $tipos_de_proyecto);

            $out['has_tipo_de_proyecto'] = true;
        }




        return $out;
    }

}
