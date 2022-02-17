{{--
  Template Name: Exposiciones
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
  @endwhile

<ul class="exposiciones">
  @forelse ($listado_exposiciones as $expo)
  <li>
    <h3>{{ $expo['expo_title'] }}</h3>
    <p>{{ $expo['expo_fecha_inicio'] }} - {{ $expo['expo_fecha_fin'] }}</p>
    <p>{{ $expo['expo_lugar'] }}</p>
    <p>{{ $expo['expo_entidad'] }}</p>

    @if ($expo['tiene_proyectos'])
        <ul>
          <h4>{{ __('Proyectos', 'sage') }}</h4>

          @foreach ($expo['proyectos'] as $proyecto)
              <li><a href="{{ $proyecto['permalink'] }}">{{ $proyecto['nombre_proyecto'] }}</a></li>
          @endforeach
        </ul>
    @endif
  </li>
  @endforeach
</ul>


@endsection
