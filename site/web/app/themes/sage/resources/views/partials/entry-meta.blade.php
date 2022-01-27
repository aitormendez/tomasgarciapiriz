@dump($metadatos)
@if (is_singular('project'))
<div class="meta">
  <div class="nav">
    <button id="btn-info" class="info mayusculas boton">Info</button>
  </div>
  <div class="relative text-xs box">

    <div class="marco">
  
      @if ($metadatos['has_autores'] || $metadatos['has_colaboradores'])
      <div class="izq">
        @if ($metadatos['has_autores'])
        <div class="p-4 autores">
          @if (count($metadatos['autores']) > 1)
            <h3 class="mayusculas">Autores</h3>
          @else
            <h3 class="mayusculas">Autor</h3>
          @endif
          @foreach ($metadatos['autores'] as $autor)
            <p>{{ $autor['autor'] }}</p>
          @endforeach
        </div>
        @endif
        @if ($metadatos['has_colaboradores'])
        <div class="p-4 colaboradores">
          @if (count($metadatos['colaboradores']) > 1)
            <h3 class="mayusculas">Colaboradores</h3>
          @else
            <h3 class="mayusculas">Colaborador</h3>
          @endif
          @foreach ($metadatos['colaboradores'] as $colaborador)
            <p>{{ $colaborador['colaborador'] }}</p>
          @endforeach
        </div>
        @endif
      </div>
      @endif
  
      @if ($metadatos['has_tipo_de_proyecto'] || $metadatos['has_datos'])
        <div class="der">
          @if ($metadatos['has_datos'])
            <div class="p-4 datos">
              <ul class="table">
                @if ($metadatos['cliente'])
                  <li class="table-row">
                    <h3 class="table-cell mayusculas">{{ __('Cliente') }}</h3>
                    <span class="table-cell">{{ $metadatos['cliente'] }}</span>
                  </li>
                @endif
                @if ( $metadatos['superficie'] )
                  <li class="table-row">
                    <h3 class="table-cell mayusculas">{{ __('Superficie') }}</h3>
                    <span class="table-cell">{{ $metadatos['superficie'] }}</span>
                  </li>
                @endif
                @if ( $metadatos['costo'] )
                  <li class="table-row">
                    <h3 class="table-cell mayusculas">{{ __('Costo M2') }}</h3>
                    <span class="table-cell">{{ $metadatos['costo'] }}</span>
                  </li>
                @endif
                @if ( $metadatos['construido'] )
                  <li class="table-row">
                    <h3 class="table-cell mayusculas">{{ __('Construido') }}</h3>
                    <span class="table-cell">{{ $metadatos['construido'] }}</span>
                  </li>
                @endif
                @if ( $metadatos['anio'] )
                  <li class="table-row">
                    <h3 class="table-cell mayusculas">{{ __('Año') }}</h3>
                    <span class="table-cell">{{ $metadatos['anio'] }}</span>
                  </li>
                @endif
              </ul>
            </div>
          @endif
          @if ($metadatos['has_tipo_de_proyecto'])
            <div class="p-4 tax">
              <ul>
                @foreach ($metadatos['tipos_de_proyecto'] as $tipo)
                  <li>
                    <a href="{{ $tipo['link'] }}">{{ $tipo['nombre'] }}</a>
                  </li>
                @endforeach
              </ul>
            </div>
          @endif
        </div>
      @endif
    </div>


  </div>
</div>
@endif


{{-- <time class="updated" datetime="{{ get_post_time('c', true) }}">
  {{ get_the_date() }}
</time> --}}
