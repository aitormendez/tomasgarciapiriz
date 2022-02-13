<?php

/**
 * Theme filters.
 */

namespace App;

/**
 * Add "… Continued" to the excerpt.
 *
 * @return string
 */
add_filter('excerpt_more', function () {
    return sprintf(' &hellip; <a href="%s">%s</a>', get_permalink(), __('Continued', 'sage'));
});


/**
 * Añadir CPTs a front page.
 */
add_action(
    'pre_get_posts',
    function($query) {
        if ( !is_admin() && $query->is_main_query() && is_front_page() ) 
        {
            $query->set( 'post_type', ['project', 'story', 'reference'] );
            $query->set( 'posts_per_page', 30 );
            $query->set( 'meta_query', [
                [
                    'key' => 'destacados_destacar',
                    'compare' => '=',
                    'value'   => 1,  
                ]
            ]);
        }
        
    }
);

/**
 * Añadir clase para tamaño a cada artículo del archivo de projectos.
 */
add_filter('post_class', function ($classes, $class, $post_id) {
    $classes[] = get_field('tamano');
    return $classes;
}, 10,3);

/**
 * Eliminar cosas antes de ":" en las cabeceras de los archivos etc.
 */
add_filter( 'get_the_archive_title', function ($title) {    
    if ( is_category() ) {    
            $title = single_cat_title( '', false );    
        } elseif ( is_tag() ) {    
            $title = single_tag_title( '', false );    
        } elseif ( is_author() ) {    
            $title = '<span class="vcard">' . get_the_author() . '</span>' ;    
        } elseif ( is_tax() ) { //for custom post types
            $title = sprintf( __( '%1$s' ), single_term_title( '', false ) );
        } elseif (is_post_type_archive()) {
            $title = post_type_archive_title( '', false );
        }
    return $title;    
});

/**
 * Eliminar el enlace del excerp portada noticias
 */

add_filter( 'excerpt_more', function ($more) {  
    if (is_archive('story')) {
        return '';
    }
});