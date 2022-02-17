<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Premios extends Field
{
    public function fields()
    {
        $builder = new FieldsBuilder('datos_del_premio');

        $builder
            ->setLocation('post_type', '==', 'prize');

        $builder
            ->addText('prize_entidad', [
                'label' => 'Entidad',
                'instructions' => __('Nombre de la entidad que emite el premio', 'sage'),
                'default_value' => '',
                'placeholder' =>  __('Nombre', 'sage'),
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
            ])
            ->addText('prize_ambito', [
                'label' => 'Ámbito',
                'instructions' => __('Ámbito del premio', 'sage'),
                'default_value' => '',
                'placeholder' =>  __('Ámbito', 'sage'),
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
            ])
        ;

        return $builder->build();
    }
}