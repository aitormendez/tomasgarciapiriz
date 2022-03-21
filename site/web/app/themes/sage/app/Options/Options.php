<?php

namespace App\Options;

use Log1x\AcfComposer\Options as Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Options extends Field
{
    /**
     * The option page menu name.
     *
     * @var string
     */
    public $name = 'Options';

    /**
     * The option page document title.
     *
     * @var string
     */
    public $title = 'Options';

    /**
     * The option page field group.
     *
     * @return array
     */
    public function fields()
    {
        $builder = new FieldsBuilder('options');

        $builder
            ->addTab(__('Portfolio', 'sage'), ['placement' => 'left'])
                ->addFile('portfolio', [
                    'label' => 'Portfolio',
                    'instructions' => 'Admite un archivo PDF',
                    'required' => 0,
                    'return_format' => 'array',
                    'library' => 'all',
                    'min_size' => '',
                    'max_size' => '',
                    'mime_types' => 'pdf',
                ])
            ->addTab(__('Footer', 'sage'), ['placement' => 'left'])
                ->addWysiwyg('footer_texto', [
                    'label' => 'Texto',
                    'instructions' => 'Bloque de texto para el nombre, dirección, etc.',
                    'required' => 0,
                    'conditional_logic' => [],
                    'tabs' => 'all',
                    'toolbar' => 'basic',
                    'media_upload' => 0,
                    'delay' => 0,
                ])
                ->addRepeater('footer_enlaces')
                    ->addLink('footer_enlace', [
                        'label' => 'Enlace',
                        'instructions' => 'Se utiliza para redes social principalmente, pero se puede poner el enlace que se quiera',
                        'return_format' => 'array',
                    ])
                ->endRepeater()
                ->addRepeater('footer_enlaces_2')
                    ->addLink('footer_enlace_2', [
                        'label' => 'Enlace',
                        'instructions' => 'Eestos enlaces aparecerán en el menú secundario',
                        'return_format' => 'array',
                    ])
                ->endRepeater();

        return $builder->build();
    }
}
