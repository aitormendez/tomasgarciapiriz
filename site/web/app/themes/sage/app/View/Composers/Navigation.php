<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use Log1x\Navi\Facades\Navi;

class Navigation extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.navigation',
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'primary_navigation' => $this->primaryNavigation(),
            'secondary_navigation' => $this->SecondaryNavigation(),
            'portfolio' => $this->portfolioFile(),
        ];
    }

    /**
     * Returns the primary navigation.
     *
     * @return array
     */
    public function primaryNavigation()
    {
        if (Navi::build('primary_navigation')->isEmpty()) {
            return;
        }

        return Navi::build()->toArray();
    }

    /**
     * Returns the secondary navigation.
     *
     * @return array
     */
    public function secondaryNavigation()
    {
        if (Navi::build('secondary_navigation')->isEmpty()) {
            return;
        }

        return Navi::build('secondary_navigation')->toArray();
    }

    /**
     * Portfolio.
     *
     * @return array
     */
    public function portfolioFile()
    {
        return get_field("portfolio", 'option');
    }
}