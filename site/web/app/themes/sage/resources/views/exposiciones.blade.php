{{--
  Template Name: Exposiciones
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
  @endwhile

<ul class="flex flex-wrap px-6 exposiciones">
  @forelse ($listado_exposiciones as $expo)
  <li>
    <h3 class="mb-6 text-lg font-bold leading-5">{{ $expo['expo_title'] }}</h3>
    <p>{{ $expo['expo_fecha_inicio'] }} - {{ $expo['expo_fecha_fin'] }}</p>
    <p>{{ $expo['expo_lugar'] }}</p>
    <p>{{ $expo['expo_entidad'] }}</p>

    @if ($expo['tiene_proyectos'])
        <ul>
          <h4 class="mt-10 mb-2 font-bold">{{ __('Proyectos', 'sage') }}</h4>

          @foreach ($expo['proyectos'] as $proyecto)
              <li><a href="{{ $proyecto['permalink'] }}">{{ $proyecto['nombre_proyecto'] }}</a></li>
          @endforeach
        </ul>
    @endif
  </li>
  @endforeach
</ul>


@endsection
