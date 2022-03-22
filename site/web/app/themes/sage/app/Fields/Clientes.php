<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class clientes extends Field
{
    public function fields()
    {
        if (apply_filters( 'wpml_current_language', NULL ) === 'es') {
            $page_id = get_page_by_title('clientes');
        } else {
            $page_id = get_page_by_title('customers');
        }
        
        
        $builder = new FieldsBuilder('clientes');

        $builder
            ->setLocation('page', '==', $page_id->ID);

        $builder
        ->addRepeater('page_clientes', [
            'layout' => 'table',
            'label' => __('clientes', 'sage'),
            'button_label' => __('Añadir cliente', 'sage'),
            'instructions' => __('Un cliente en cada línea', 'sage'),
            ])
            ->addTrueFalse('page_clientes_tiene_enlace', [
                'label' => __('Tiene o no enlace', 'sage'),
                'instructions' => __('Decide si el nombre enlaza a algún sitio', 'sage'),
                'default_value' => 0,
                'ui' => 1,
                'ui_on_text' => __('con enlace', 'sage'),
                'ui_off_text' => __('sin enlace', 'sage'),
            ])
            ->addText('page_clientes_nombre', [
                'label' => __('Nombre del cliente', 'sage'),
                'instructions' => __('Usar solo si no lleva enlace', 'sage'),
            ])
                ->conditional('page_clientes_tiene_enlace', '==', 0)
            ->addLink('page_clientes_enlace', [
                'label' => __('Enlace', 'sage'),
                'instructions' => __('Usar si lleva enlace. En caso afirmativo poner aquí el nombre y la URL a donde enlaza', 'sage'),
                'return_format' => 'array',
            ])
                ->conditional('page_clientes_tiene_enlace', '==', 1)
        ->endRepeater()
        ;

        return $builder->build();
    }
}