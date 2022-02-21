<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use Log1x\Navi\Facades\Navi;

class SubmenuEstudio extends Composer
{
    protected static $views = [
        'partials.submenu-estudio'
    ];

    public function with()
    {
        return [
            'submenu_estudio_navigation' => $this->submenuEstudio(),
        ];
    }

    public function submenuEstudio()
    {
        if (Navi::build('submenu_estudio_navigation')->isEmpty()) {
            return;
        }

        return Navi::build('submenu_estudio_navigation')->toArray();
    }
}