{{--
  Template Name: Premios
--}}

@extends('layouts.app')

@php $anio = '' @endphp

@section('content')
  @while(have_posts()) 
    @php the_post() @endphp
    @include('partials.page-header')
  @endwhile

  @php $anio = '' @endphp

  @if (count($listado_premios) > 0)
    <ul class="flex flex-wrap listado-premios">
      @foreach ($listado_premios as $premio)

        @if ($anio === '')
          <li class="mb-24 md:pr-10 un-anio">
            <h2 class="inline-block px-6 py-4 font-bold text-black bg-white anio">{{ $premio['edicion_premio'] }}</h2>
            <ul class="premios-en-un-anio">
              <li class="p-6 premio">
                <h3 class="my-6 font-bold">{{ $premio['nombre_premio'] }}</h3>
                <ul>
                  <li><b>{!! __('Ámbito', 'sage') !!}: </b> <span>{{ $premio['ambito_premio'] }}</span></li>
                  <li><b>{!! __('Entidad', 'sage') !!}: </b><span>{{ $premio['entidad_premio'] }}</span></li>
                  <li><b>{!! __('Premio', 'sage') !!}: </b><span>{{ $premio['otorgado_premio'] }}</span></li>
                  <li><b>{!! __('Proyecto premiado', 'sage') !!}: </b><span><a href="{{ $premio['link_proyecto_premiado'] }}">{{ $premio['nombre_proyecto_premiado'] }}</a></span></li>
                </ul>
              </li>
        @elseif ($premio['edicion_premio'] == $anio)
              <li class="p-6 premio">
                <h3 class="my-6 font-bold">{{ $premio['nombre_premio'] }}</h3>
                <ul>
                  <li><b>{!! __('Ámbito', 'sage') !!}: </b> <span>{{ $premio['ambito_premio'] }}</span></li>
                  <li><b>{!! __('Entidad', 'sage') !!}: </b><span>{{ $premio['entidad_premio'] }}</span></li>
                  <li><b>{!! __('Premio', 'sage') !!}: </b><span>{{ $premio['otorgado_premio'] }}</span></li>
                  <li><b>{!! __('Proyecto premiado', 'sage') !!}: </b><span><a href="{{ $premio['link_proyecto_premiado'] }}">{{ $premio['nombre_proyecto_premiado'] }}</a></span></li>
                </ul>
              </li>
        @elseif($premio['edicion_premio'] !== $anio)
            </ul> {{-- !premios-en-un-anio --}}
          </li> {{-- !un-anio --}}
          <li class="md:pr-10 un-anio">
            <h2 class="inline-block px-6 py-4 font-bold text-black bg-white anio">{{ $premio['edicion_premio'] }}</h2>
            <ul class="premios-en-un-anio">
              <li class="p-6 premio">
                <h3 class="my-6 font-bold">{{ $premio['nombre_premio'] }}</h3>
                <ul>
                  <li><b>{!! __('Ámbito', 'sage') !!}: </b> <span>{{ $premio['ambito_premio'] }}</span></li>
                  <li><b>{!! __('Entidad', 'sage') !!}: </b><span>{{ $premio['entidad_premio'] }}</span></li>
                  <li><b>{!! __('Premio', 'sage') !!}: </b><span>{{ $premio['otorgado_premio'] }}</span></li>
                  <li><b>{!! __('Proyecto premiado', 'sage') !!}: </b><span><a href="{{ $premio['link_proyecto_premiado'] }}">{{ $premio['nombre_proyecto_premiado'] }}</a></span></li>
                </ul>
              </li>
        @endif

        @php $anio = $premio['edicion_premio']; @endphp
      @endforeach
        </ul> {{-- !premios-en-un-anio --}}
      </li> {{-- !un-anio --}}
    </ul> {{-- !listado-premios --}}
  @endif

@endsection
