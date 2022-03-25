<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Videos extends Field
{
    public function fields()
    {
        $builder = new FieldsBuilder('video');

        $builder
            ->setLocation('post_type', '==', 'video');

        $builder
            ->addTextarea('video_embed', [
                'label' => 'Entidad',
                'instructions' => __('Pegar aquí el código de embed de bunny.net', 'sage'),
            ])
            ->addDatePicker('video_fecha', [
                'label' => 'Fecha',
                'instructions' => __('Se usa solo el año pero hay que elegir una fecha concreta'),
                'required' => 1,
                'display_format' => 'Y',
                'return_format' => 'Y',
                'first_day' => 1,
            ])
        ;

        return $builder->build();
    }
}