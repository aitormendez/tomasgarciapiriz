<?php

namespace App\Fields;

use Log1x\AcfComposer\Field;
use StoutLogic\AcfBuilder\FieldsBuilder;

class Destacados extends Field
{
    /**
     * The field group.
     *
     * @return array
     */
    public function fields()
    {
        $destacados = new FieldsBuilder('destacados');

        $destacados
            ->setLocation('post_type', '==', 'project')
                ->or('post_type', '==', 'story')
                ->or('post_type', '==', 'reference');

        $destacados
            ->addTrueFalse('destacados_destacar', [
                'label' => 'Destacar',
                'instructions' => '',
                'required' => 0,
                'message' => __('Activar para que esta entrada aparezca en el escenario 3D en portada', 'sage'),
                'default_value' => 0,
                'ui' => 1,
                'ui_on_text' => 'activo',
                'ui_off_text' => 'inactivo',
            ])
            ->addButtonGroup('destacados_tipo', [
                'label' => 'Tipo de contenido',
                'instructions' => __('Elige si el destacado estará representado por una imagen o por un modelo 3D. Si es imagen se mapeará en un cubo 3D. Si es un modelo aparecerá el modelo tal cual', 'sage'),
                'required' => 0,
                'choices' => [
                    'image' => __('Imagen', 'sage'),
                    'model' => __('Modelo 3D', 'sage'),
                ],
                'allow_null' => 0,
                'default_value' => '',
                'layout' => 'horizontal',
                'return_format' => 'value',
            ])
                ->conditional('destacados_destacar', '==', 1)
            ->addFile('destacados_modelo', [
                'label' => 'Modelo GLTF',
                'instructions' => 'Sube un modelo 3D en formato GLTF. Acepta GLTF json (no binario) y sin texturas',
                'required' => 0,
                'return_format' => 'array',
                'library' => 'all',
                'min_size' => '',
                'max_size' => '',
                'mime_types' => 'gltf',
            ])
                ->conditional('destacados_tipo', '==', 'model')
            ->addButtonGroup('destacados_formato_imagen', [
                'label' => 'Formato de la imagen',
                'instructions' => __('Formato de imagen: cuadrado, horizontal o vertical', 'sage'),
                'required' => 0,
                'choices' => [
                    'vertical' => __('Vertical', 'sage'),
                    'horizontal' => __('Horizontal', 'sage'),
                    'cuadrado' => __('Cuadrado', 'sage'),
                ],
                'allow_null' => 0,
                'default_value' => '',
                'layout' => 'horizontal',
                'return_format' => 'value',
            ])
                ->conditional('destacados_tipo', '==', 'image')
            ->addImage('destacados_formato_imagen_cuadrado', [
                'label' => 'Imagen',
                'instructions' => 'Formato: jpg. 1024 x 1024 px',
                'required' => 0,
                'return_format' => 'array',
                'preview_size' => 'thumbnail',
                'library' => 'all',
                'min_width' => '1024',
                'min_height' => '1024',
                'min_size' => '',
                'max_width' => '1024',
                'max_height' => '1024',
                'max_size' => '',
                'mime_types' => 'jpg',
            ])
                ->conditional('destacados_formato_imagen', '==', 'cuadrado')
            ->addImage('destacados_formato_imagen_horizontal', [
                'label' => 'Imagen',
                'instructions' => 'Formato: jpg. 1024 x 683 px',
                'required' => 0,
                'return_format' => 'array',
                'preview_size' => 'thumbnail',
                'library' => 'all',
                'min_width' => '1024',
                'min_height' => '683',
                'min_size' => '',
                'max_width' => '1024',
                'max_height' => '683',
                'max_size' => '',
                'mime_types' => 'jpg',
            ])
                ->conditional('destacados_formato_imagen', '==', 'horizontal')
            ->addImage('destacados_formato_imagen_vertical', [
                'label' => 'Imagen',
                'instructions' => 'Formato: jpg. 683 x 1024 px',
                'required' => 0,
                'return_format' => 'array',
                'preview_size' => 'thumbnail',
                'library' => 'all',
                'max_width' => '683',
                'max_height' => '1024',
                'min_size' => '',
                'max_width' => '683',
                'max_height' => '1024',
                'max_size' => '',
                'mime_types' => 'jpg',
            ])
                ->conditional('destacados_formato_imagen', '==', 'vertical')
            ;


        return $destacados->build();
    }
}
