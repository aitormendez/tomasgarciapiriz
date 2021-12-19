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

}
