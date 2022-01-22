<?php

$post_columns = [
    'featured_image' => [
        'title'          => __('Featured img', 'sage'),
        'featured_image' => 'medium'
    ],
    'featured_post' => [
        'title'       => __('Featured post', 'sage'),
        'meta_key'    => 'destacados_destacar',
    ],
];

return [

    /*
    |--------------------------------------------------------------------------
    | Post Types
    |--------------------------------------------------------------------------
    |
    | Here you may specify the post types to be registered by Poet using the
    | Extended CPTs library. <https://github.com/johnbillion/extended-cpts>
    |
    */

    'post' => [
        'story' => [
            'enter_title_here' => __('Story title', 'sage'),
            'menu_icon' => 'dashicons-megaphone',
            'supports' => ['title', 'editor', 'author', 'revisions', 'thumbnail', 'excerpt'],
            'has_archive' => true,
            'show_in_rest' => true,
            'labels' => [
                'singular' => __('Story', 'sage'),
                'plural' => __('Stories', 'sage'),
            ],
            'admin_cols' => $post_columns,
        ],
        'project' => [
            'enter_title_here' => __('Project title', 'sage'),
            'menu_icon' => 'dashicons-portfolio',
            'supports' => ['title', 'editor', 'author', 'revisions', 'thumbnail', 'excerpt'],
            'has_archive' => true,
            'show_in_rest' => true,
            'labels' => [
                'singular' => __('Project', 'sage'),
                'plural' => __('Projects', 'sage'),
            ],
            'admin_cols' => $post_columns,
        ],
        'reference' => [
            'enter_title_here' => __('Reference title', 'sage'),
            'menu_icon' => 'dashicons-admin-site-alt',
            'supports' => ['title', 'editor', 'author', 'revisions', 'thumbnail', 'excerpt'],
            'has_archive' => true,
            'show_in_rest' => true,
            'labels' => [
                'singular' => __('Reference', 'sage'),
                'plural' => __('References', 'sage'),
            ],
            'admin_cols' => $post_columns,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Taxonomies
    |--------------------------------------------------------------------------
    |
    | Here you may specify the taxonomies to be registered by Poet using the
    | Extended CPTs library. <https://github.com/johnbillion/extended-cpts>
    |
    */

    'taxonomy' => [
        'project_type' => [
            'links' => ['project'],
            'meta_box' => 'simple',
            'hierarchical' => false, 
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Blocks
    |--------------------------------------------------------------------------
    |
    | Here you may specify the block types to be registered by Poet and
    | rendered using Blade.
    |
    | Blocks are registered using the `namespace/label` defined when
    | registering the block with the editor. If no namespace is provided,
    | the current theme text domain will be used instead.
    |
    | Given the block `sage/accordion`, your block view would be located at:
    |   ↪ `views/blocks/accordion.blade.php`
    |
    | Block views have the following variables available:
    |   ↪ $data    – An object containing the block data.
    |   ↪ $content – A string containing the InnerBlocks content.
    |                Returns `null` when empty.
    |
    */

    'block' => [
        'sage/accordion',
    ],

    /*
    |--------------------------------------------------------------------------
    | Block Categories
    |--------------------------------------------------------------------------
    |
    | Here you may specify block categories to be registered by Poet for use
    | in the editor.
    |
    */

    'categories' => [
        'cta' => [
            'title' => 'Call to Action',
            'icon' => 'star-filled',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Editor Palette
    |--------------------------------------------------------------------------
    |
    | Here you may specify the color palette registered in the Gutenberg
    | editor.
    |
    | A color palette can be passed as an array or by passing the filename of
    | a JSON file containing the palette.
    |
    | If a color is passed a value directly, the slug will automatically be
    | converted to Title Case and used as the color name.
    |
    | If the palette is explicitly set to `true` – Poet will attempt to
    | register the palette using the default `palette.json` filename generated
    | by <https://github.com/roots/palette-webpack-plugin>
    |
    */

    'palette' => [
        'negro-fb' => '#3e2b2f',
        'gris-fb' => '#ada3a4',
        'allo' => '#ff0000',
        'blue' => '#0000ff',
    ],

    /*
    |--------------------------------------------------------------------------
    | Admin Menu
    |--------------------------------------------------------------------------
    |
    | Here you may specify admin menu item page slugs you would like moved to
    | the Tools menu in an attempt to clean up unwanted core/plugin bloat.
    |
    | Alternatively, you may also explicitly pass `false` to any menu item to
    | remove it entirely.
    |
    */

    'menu' => [
        'gutenberg',
    ],

];
