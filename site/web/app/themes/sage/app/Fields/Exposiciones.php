<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Exposiciones extends Field
{
    public function fields()
    {
        $builder = new FieldsBuilder('datos_del_premio');

        $builder
            ->setLocation('post_type', '==', 'exhibition');

        $builder
            ->addText('exhibition_entidad', [
                'label' => __('Entidad', 'sage'),
                'instructions' => __('Nombre de la entidad que emite el premio', 'sage'),
                'required' => 1,
                'default_value' => '',
                'placeholder' =>  __('Entidad', 'sage'),
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
            ])
            ->addText('exhibition_lugar', [
                'label' => __('Lugar', 'sage'),
                'instructions' => __('', 'sage'),
                'required' => 1,
                'default_value' => '',
                'placeholder' =>  __('Lugar', 'sage'),
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
            ])
            ->addDatePicker('exhibition__fecha_inicio', [
                'label' => __('Fecha de inicio', 'sage'),
                'instructions' => '',
                'required' => 1,
                'display_format' => 'd/m/Y',
                'return_format' => 'd/m/Y',
                'first_day' => 1,
            ])
            ->addDatePicker('exhibition__fecha_fin', [
                'label' => __('Fecha de finalización', 'sage'),
                'instructions' => '',
                'required' => 1,
                'display_format' => 'd/m/Y',
                'return_format' => 'd/m/Y',
                'first_day' => 1,
            ])
            ->addRelationship('exhibition__projects', [
                'label' => __('Proyectos', 'sage'),
                'instructions' => __('Elige los proyectos que se muestran en esta exposición', 'sage'),
                'required' => 0,
                'post_type' => ['project'],
                'taxonomy' => [],
                'allow_null' => 0,
                'multiple' => 1,
                'return_format' => 'object',
                'ui' => 1,
            ])
        ;

        return $builder->build();
    }
}