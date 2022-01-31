<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Relacionados extends Field
{
    public function fields()
    {
        $relacionados = new FieldsBuilder('relacionados');

        $relacionados
            ->setLocation('post_type', '==', 'project')
                ->or('post_type', '==', 'story');

        $relacionados
            ->addRelationship('posts_relacionados', [
                'label' => __('Posts relacionados', 'sage'),
                'instructions' => __('Elige las entradas que aparecerán en la sección "Otras entradas relacionadas con esta entrada"', 'sage'),
                'elements' => '',
                'min' => '',
                'max' => '',
                'return_format' => 'object',
            ]);

            return $relacionados->build();
    }
    
}