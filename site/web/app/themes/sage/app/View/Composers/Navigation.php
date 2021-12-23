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
            'navigation' => $this->navigation(),
            'secondary_navigation' => $this->SecondaryNavigation(),
        ];
    }

    /**
     * Returns the primary navigation.
     *
     * @return array
     */
    public function navigation()
    {
        if (Navi::build()->isEmpty()) {
            return;
        }

        return Navi::build()->toArray();
    }

    /**
     * Returns the secondary navigation.
     *
     * @return array
     */
    public function SecondaryNavigation()
    {
        if (Navi::build('secondary_navigation')->isEmpty()) {
            return;
        }

        return Navi::build('secondary_navigation')->toArray();
    }
}