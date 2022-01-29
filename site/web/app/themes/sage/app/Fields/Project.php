<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;
use App\Fields\Partials\HeroImage;

class Project extends Field
{
    /**
     * The field group.
     *
     * @return array
     */
    public function fields()
    {
        $project = new FieldsBuilder('metadatos');

        $project
            ->setLocation('post_type', '==', 'project');
        
        $project
            ->addTab(__('Personas', 'sage'), ['placement' => 'left'])
                ->addRepeater('autores', [
                    'layout' => 'row',
                    'label' => __('Autores', 'sage'),
                    'button_label' => __('Añadir autor', 'sage'),
                    'instructions' => __('Un autor en cada línea', 'sage'),
                    ])
                    ->addText('autor', [
                        'label' => __('Autor', 'sage'),
                    ])
                    ->endRepeater()
                ->addRepeater('colaboradores', [
                    'layout' => 'row',
                    'label' => __('Colaboradores', 'sage'),
                    'button_label' => __('Añadir colaborador', 'sage'),
                    'instructions' => __('Un colaborador en cada línea', 'sage'),
                    ])
                ->addText('colaborador', [
                    'label' => __('Colaborador', 'sage'),
                ])
                ->endRepeater()
            ->addTab(__('Datos proyecto', 'sage'), ['placement' => 'left'])
                ->addText('client', [
                    'label' => __('Cliente', 'sage')
                ])
                ->addNumber('superficie', [
                    'label' =>  __('Superficie', 'sage'),
                    'instructions' => __('En metros cuadrados. No admite decimales. No poner separadores (ni puntos ni comas)', 'sage'),

                ])
                ->addNumber('costo', [
                    'label' =>  __('Costo/m2', 'sage'),
                    'instructions' => __('En euros. Admite dos decimales (separados por un punto)', 'sage'),
                ])
                ->addTrueFalse('construido_mostrar', [
                    'label' => __('Mostrar si está construido', 'sage'),
                    'instructions' => 'Mostrar si está construido o no. Aquí se decide sólo si se muestra el dato, no si es que "sí" o "no". Si no se activa, no aparecerá este dato en el post',
                    'default_value' => 0,
                    'ui' => 1,
                    'ui_on_text' => __('Sí', 'sage'),
                    'ui_off_text' => __('No', 'sage'),
                ])
                ->addTrueFalse('construido', [
                    'label' => __('Construido', 'sage'),
                    'instructions' => 'Aquí se decide si está construido o no, no si se muestra el dato en el post.',
                    'default_value' => 0,
                    'ui' => 1,
                    'ui_on_text' => __('Sí', 'sage'),
                    'ui_off_text' => __('No', 'sage'),
                ])
                    ->conditional('construido_mostrar', '==', 1)
                ->addDateTimePicker('fecha', [
                    'label' => __('Fecha', 'sage'),
                    'instructions' => 'De momento, en el front se usa sólo el año, pero hay que indicar un día del año',
                    'return_format' => 'Y'
                ])
            ->addTab(__('Encabezado', 'sage'), ['placement' => 'left'])
                ->addFields($this->get(HeroImage::class))
                    
        ;
    
        return $project->build();
    }
}