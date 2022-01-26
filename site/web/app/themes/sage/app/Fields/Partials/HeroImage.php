<?php

namespace App\Fields\Partials;

use Log1x\AcfComposer\Partial;
use StoutLogic\AcfBuilder\FieldsBuilder;

class HeroImage extends Partial
{
    /**
     * The partial field group.
     *
     * @return array
     */
    public function fields()
    {
        $HeroImage = new FieldsBuilder('list_items');

        $HeroImage
            ->addImage('hero_image', [
                    'label' => __('Imagen Hero', 'sage'),
                    'instructions' => __('La imagen aparecerá en la cabecera del post. Debe tener una ancho de 2000px. Se recomienda que no pase de 900px de alto para que se vea bien y no se coma toda la pantalla.', 'sage'),
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'min_width' => '2000',
                    'min_height' => '',
                    'min_size' => '',
                    'max_width' => '2000',
                    'max_height' => '',
                    'max_size' => '',
                    'mime_types' => '',
                ]);

        return $HeroImage;
    }
}
