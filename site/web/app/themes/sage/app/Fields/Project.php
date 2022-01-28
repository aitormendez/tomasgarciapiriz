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
                ->addTrueFalse('construido', [
                    'label' => 'Construido',
                    'default_value' => 0,
                    'ui' => 1,
                    'ui_on_text' => __('Sí', 'sage'),
                    'ui_off_text' => __('No', 'sage'),
                ])
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