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
                ]);

        return $builder->build();
    }
}
