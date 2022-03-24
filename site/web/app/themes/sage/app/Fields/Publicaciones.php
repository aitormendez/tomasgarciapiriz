<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Publicaciones extends Field
{
    public function fields()
    {
        $builder = new FieldsBuilder('publicación');

        $builder
            ->setLocation('post_type', '==', 'publication');

        $builder
            ->addRadio('publication_tipo', [
                'label' => __('Tipo de publicación', 'sage'),
                'choices' => [
                    'articulo' => __('Artículo', 'sage'),
                    'capitulo' => __('Capítulo', 'sage'),
                    'libro' => __('Libro', 'sage'),
                ],
                'allow_null' => 0,
                'other_choice' => 0,
                'save_other_choice' => 0,
                'default_value' => 'libro',
                'layout' => 'horizontal',
                'return_format' => 'value',
            ])
            ->addText('publication_capitulo', [
                'label' => __('Título del capítulo o artículo', 'sage'),
                'instructions' => __('Opcionalmente, indicar aquí el nombre del capítulo (si es un libro) o el título del artículo (si es una revista)', 'sage'),
            ])
            ->conditional('publication_tipo', '==', 'capitulo')
                ->or('publication_tipo', '==', 'articulo')
            ->addRepeater('publication_autores', [
                'layout' => 'table',
                'label' =>  __('Autores', 'sage'),
                'button_label' => __('Añadir autor', 'sage'),
                'instructions' => __('Un autor en cada línea', 'sage'),
                ])
                ->addText('publication_autor', [
                    'label' => __('Autor', 'sage'),
                ])
            ->endRepeater()
            ->addText('publication_editorial', [
                'label' => __('Nombre de la editorial', 'sage'),
            ])
            ->addPostObject('publication_proyectos', [
                'label' => 'Proyectos',
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