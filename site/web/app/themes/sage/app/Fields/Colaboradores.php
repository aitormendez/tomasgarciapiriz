<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Colaboradores extends Field
{
    public function fields()
    {
        if (apply_filters( 'wpml_current_language', NULL ) === 'es') {
            $page_id = get_page_by_title('colaboradores');
        } else {
            $page_id = get_page_by_title('colaborators');
        }
        
        
        $builder = new FieldsBuilder('colaboradores');

        $builder
            ->setLocation('page', '==', $page_id->ID);

        $builder
        ->addRepeater('page_colaboradores', [
            'layout' => 'table',
            'label' => __('Colaboradores', 'sage'),
            'button_label' => __('Añadir colaborador', 'sage'),
            'instructions' => __('Un colaborador en cada línea', 'sage'),
            ])
            ->addTrueFalse('page_colaboradores_tiene_enlace', [
                'label' => __('Tiene o no enlace', 'sage'),
                'instructions' => __('Decide si el nombre enlaza a algún sitio', 'sage'),
                'default_value' => 0,
                'ui' => 1,
                'ui_on_text' => __('con enlace', 'sage'),
                'ui_off_text' => __('sin enlace', 'sage'),
            ])
            ->addText('page_colaboradores_nombre', [
                'label' => __('Nombre del colaborador', 'sage'),
            ])
                ->conditional('page_colaboradores_tiene_enlace', '==', 0)
            ->addLink('page_colaboradores_enlace', [
                'label' => __('Enlace', 'sage'),
                'instructions' => __('Hay que poner aquí el nombre del colaborador y la URL a donde enlaza', 'sage'),
                'return_format' => 'array',
            ])
                ->conditional('page_colaboradores_tiene_enlace', '==', 1)
            ->addText('page_colaboradores_rol', [
                'label' => __('Rol del colaborador', 'sage'),
            ])
            ->addRadio('page_colaboradores_tipo', [
                'label' => __('Tipo de colaborador', 'sage'),
                'instructions' => '',
                'choices' => [
                    'habitual' =>  __('Colaborador habitual', 'sage'),
                    'anterior' =>  __('Colaborador anterior', 'sage'),
                ],
                'allow_null' => 0,
                'other_choice' => 0,
                'save_other_choice' => 0,
                'default_value' => 'habitual',
                'layout' => 'vertical',
                'return_format' => 'value',
            ])
        ->endRepeater()
        ;

        return $builder->build();
    }
}