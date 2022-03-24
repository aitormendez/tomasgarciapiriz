<?php

namespace App\View\Composers;
use Roots\Acorn\View\Composer;

class PublicationArchive extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.content-publication',
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'publication_projects' => function() {
                return get_field('publication_proyectos');
            },
        ];
    }

}