<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Proyectos extends Field
{
    public function fields()
    {
        $builder = new FieldsBuilder('Premios_asociados_al_proyecto');

        $builder
            ->setLocation('post_type', '==', 'project');

        $builder
        ->addRepeater('premios_asociados', [
            'layout' => 'table',
            'label' =>  __('Premios asociados al proyecto', 'sage'),
            'button_label' => __('Añadir premio', 'sage'),
            'instructions' => __('Un premio en cada línea', 'sage'),
            ])
            ->addPostObject('premio_asociado', [
                'label' => __('Premio asociados', 'sage'),
                'instructions' => '',
                'required' => 0,
                'post_type' => ['prize'],
                'taxonomy' => [],
                'allow_null' => 0,
                'multiple' => 0,
                'return_format' => 'object',
                'ui' => 1,
            ])
                ->addDatePicker('edicion_premio', [
                    'label' =>  __('Año de la edición del premio', 'sage'),
                    'instructions' => 'Hay que elegir una fecha concreta, pero sólo se usará el año',
                    'display_format' => 'Y',
                    'return_format' => 'Y',
                    'first_day' => 1,
                ])
                ->addText('premio_otorgado', [
                    'label' => __('Premio otrorgado', 'sage'),
                    'instructions' =>  __('Primer premio, segundo premio, premio de honor, etc…', 'sage'),
                ])
            ->endRepeater();

        return $builder->build();
    }
}