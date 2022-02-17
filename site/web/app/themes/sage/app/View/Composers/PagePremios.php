<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class PagePremios extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'premios'
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function with()
    {
        return [
            'listado_premios' => $this->listadoPremios(),
        ];
    }


    /**
     * Returns relacionados.
     *
     * @return array
     */
    public function listadoPremios()
    {
        // https://stackoverflow.com/a/40181242/2986401

        /**
         * Recoger todos los posts que tienen algún premio.
         *
         * @return array
         */

        $meta_query = [
            [
                'key'     => '_premios_asociados_0_premio_asociado',
                'compare' => 'EXISTS',
            ]
        ];
        
        $args = [
            'posts_per_page'   => -1,
            'orderby'          => 'date',
            'order'            => 'DESC',
            'meta_query'       => $meta_query,
            'post_type'        => 'project',
            'post_status'      => 'publish',
        ];
        
        $proyectos_array = get_posts( $args );

        /**
         * recoger todos los premios de los posts recogidos anteriormente.
         *
         * @return array
         */

        $premios = [];

        foreach ($proyectos_array as $proyecto) {



            $rows = get_field('premios_asociados', $proyecto->ID);

            

            foreach( $rows as $row ) {
                $premios[] = [
                    'nombre_premio' => $row['premio_asociado']->post_title,
                    'ambito_premio' => get_field('prize_ambito', $row['premio_asociado']->ID),
                    'entidad_premio' => get_field('prize_entidad', $row['premio_asociado']->ID),
                    'otorgado_premio' => $row['premio_otorgado'],
                    'edicion_premio' => $row['edicion_premio'],
                    'nombre_proyecto_premiado' => $proyecto->post_title,
                    'link_proyecto_premiado' => get_permalink($proyecto->ID),
                ];
            }
        }

        /**
         * ordenar array bidimensional por child key.
         * https://www.codepunker.com/blog/3-solutions-for-multidimensional-array-sorting-by-child-keys-or-values-in-PHP
         *
         * @return array
         */
        
        usort($premios, function($a,$b) 
        {
          return ($a["edicion_premio"] <= $b["edicion_premio"]) ? -1 : 1;
        });


        return '$premios';
    }
}
