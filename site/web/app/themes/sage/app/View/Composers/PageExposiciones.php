<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class PageExposiciones extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'exposiciones'
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function with()
    {
        return [
            'listado_exposiciones' => $this->listadoExposiciones(),
        ];
    }


    /**
     * Returns relacionados.
     *
     * @return array
     */
    public function listadoExposiciones()
    {
        
        $args = [
            'posts_per_page'   => -1,
            'orderby'          => 'date',
            'order'            => 'DESC',
            'post_type'        => 'exhibition',
            'post_status'      => 'publish',
        ];
        
        $exposiciones_raw = get_posts( $args );

        $exposiciones = [];

        foreach ($exposiciones_raw as $exposicion_raw) {
            $exposicion = [
                'expo_title' => $exposicion_raw->post_title,
                'expo_fecha_inicio' => get_field('exhibition__fecha_inicio', $exposicion_raw->ID),
                'expo_fecha_fin' => get_field('exhibition__fecha_fin', $exposicion_raw->ID),
                'expo_entidad' => get_field('exhibition_entidad', $exposicion_raw->ID),
                'expo_lugar' => get_field('exhibition_lugar', $exposicion_raw->ID),
                'tiene_proyectos' => false
            ];

            $proyectos_raw = get_field('exhibition__projects', $exposicion_raw->ID);

            if ($proyectos_raw) {
                $exposicion['tiene_proyectos'] = true;
                $proyectos = [];

                foreach( $proyectos_raw as $proyecto ) {
                    $proyectos[] = [
                        'nombre_proyecto' => $proyecto->post_title,
                        'permalink' => get_permalink($proyecto->ID),
                    ];
                }

                $exposicion['proyectos'] = $proyectos;
            }

            $exposiciones[] = $exposicion;
        }

        return $exposiciones;
    }
}