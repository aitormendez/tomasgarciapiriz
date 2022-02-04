<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class ArchiveProject extends Field
{
    public function fields()
    {
        $builder = new FieldsBuilder('archive_project');

        $builder
            ->setLocation('post_type', '==', 'project')
                ->or('post_type', '==', 'atlas');

        $builder
            ->addRadio('tamano', [
                'label' => __('Tamaño de la imagen', 'sage'),
                'instructions' => __('La imagen que aparece en la portada de sección puede tener tamaños distintos. Se elige aquí', 'sage'),
                'choices' => [
                    'grande' => __('Grande', 'sage'),
                    'mediana' => __('Mediana', 'sage'),
                    'pequena' => __('Pequeña', 'sage'),
                ],
                'allow_null' => 0,
                'other_choice' => 0,
                'save_other_choice' => 0,
                'default_value' => 'mediana',
                'layout' => 'vertical',
                'return_format' => 'value',
            ]);

            return $builder->build();
    }
    
}