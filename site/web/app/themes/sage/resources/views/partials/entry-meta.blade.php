@if (is_single())
  <div class="relative flex botonera">
    @if ($metadatos['has_metadatos'])
      <button id="btn-info" class="info mayusculas boton">Info</button>
    @endif
    @if ($metadatos['has_adjuntos'])
      <button id="btn-adjuntos" class="relative info mayusculas boton">{{ __('Archivos', 'sage') }}</button>
    @endif
  </div>

  @if ($metadatos['has_metadatos'])
    <div class="meta num-bloques-{{ $metadatos['num_bloques'] }}">
      <div class="relative h-0 overflow-hidden text-xs box">

        <div class="flex flex-wrap bg-white marco">

          {{-- 
            ¿Que significa bloques[]?
            bloques[0] = 1 // tiene autores
            bloques[1] = 1 // tiene colaboradores
            bloques[2] = 1 // tiene tiene datos
            bloques[3] = 1 // tiene tipos de proyecto
          --}}

            @if ($metadatos['bloques'][0] === 1 )
            <div class="p-4 bloque autores">
              @if (count($metadatos['autores']) > 1)
                <h3 class="mayusculas">{{ __('Autores', 'sage') }}</h3>
              @else
                <h3 class="mayusculas">{{ __('Autor', 'sage') }}</h3>
              @endif
              @foreach ($metadatos['autores'] as $autor)
                <p>{{ $autor['autor'] }}</p>
              @endforeach
            </div>
            @endif
            @if ($metadatos['bloques'][1] === 1)
            <div class="p-4 bloque colaboradores">
              @if (count($metadatos['colaboradores']) > 1)
                <h3 class="mayusculas">{{ __('Colaboradores', 'sage') }}</h3>
              @else
                <h3 class="mayusculas">{{ __('Colaborador', 'sage') }}</h3>
              @endif
              @foreach ($metadatos['colaboradores'] as $colaborador)
                <p>{{ $colaborador['colaborador'] }}</p>
              @endforeach
            </div>
            @endif


              @if ($metadatos['bloques'][2] === 1 )
                <div class="p-4 bloque datos">
                  <ul class="table">

                    @if ($metadatos['cliente'])
                      <li class="table-row">
                        <h3 class="table-cell mayusculas">{{ __('Cliente', 'sage') }}</h3>
                        <span class="table-cell">{{ $metadatos['cliente'] }}</span>
                      </li>
                    @endif

                    @if ( $metadatos['superficie'] )
                      <li class="table-row">
                        <h3 class="table-cell mayusculas">{{ __('Superficie', 'sage') }}</h3>
                        <span class="table-cell">{{ $metadatos['superficie'] }} M<sup>2</sup></span>
                      </li>
                    @endif

                    @if ( $metadatos['costo'] )
                      <li class="table-row">
                        <h3 class="table-cell mayusculas">{{ __('Costo', 'sage') }}/M<sup>2</sup></h3>
                        <span class="table-cell">{{ $metadatos['costo'] }} €</span>
                      </li>
                    @endif

                    @if ($metadatos['mostrar_construido'] )
                      @if ( $metadatos['construido'] )
                        <li class="table-row">
                          <h3 class="table-cell mayusculas">{{ __('Construido', 'sage') }}</h3>
                          <span class="table-cell">{{ $metadatos['construido'] }}</span>
                        </li>
                      @endif
                    @endif

                    @if ( $metadatos['anio'] )
                      <li class="table-row">
                        <h3 class="table-cell mayusculas">{{ __('Año', 'sage') }}</h3>
                        <span class="table-cell">{{ $metadatos['anio'] }}</span>
                      </li>
                    @endif

                  </ul>
                </div>
              @endif
              @if ($metadatos['bloques'][3] === 1 )
                <div class="p-4 bloque tax">
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
        @if ($metadatos['has_prizes'])
          <div class="text-white bg-black premios-otorgados marco">
            <ul class="flex flex-wrap">
              @foreach ($metadatos['prizes'] as $premio)
                <li class="p-4">
                  <h3 class="mb-4 text-lg font-bold">{{ $premio['nombre_premio'] }}, {{ $premio['edicion_premio'] }}</h3>
                  <ul>
                    <li><b>{{ __('Ambito', 'sage') }}</b>: <span>{{ $premio['ambito_premio'] }}</span></li>
                    <li><b>{{ __('Entidad', 'sage') }}</b>: <span>{{ $premio['entidad_premio'] }}</span></li>
                    <li><b>{{ __('Premio', 'sage') }}</b>: <span>{{ $premio['premio_otorgado'] }}</span></li>
                  </ul>
                </li>
              @endforeach
            </ul>
          </div>
        @endif
      </div>
    </div>
  @endif

  @if ($metadatos['has_adjuntos'])
      <div class="adjuntos">
        <div class="relative h-0 overflow-hidden text-xs bg-black box">
          <ul class="flex flex-wrap p-6">
            @foreach ($metadatos['adjuntos'] as $adjunto)
              <li>
                <a href="{{ $adjunto['adjunto']['url'] }}" class="block p-6 tracking-wide adjunto hover:bg-white">
                  <div class="icn">
                    @svg('images/interface/icn-file.svg', 'mb-3', ['aria-label' => 'scroll-file'])
                  </div>
                  <p>{{ $adjunto['adjunto']['title'] }}</p>
                </a>
              </li>
            @endforeach
        </ul>
        </div>
      </div>
  @endif
@endif


{{-- <time class="updated" datetime="{{ get_post_time('c', true) }}">
  {{ get_the_date() }}
</time> --}}