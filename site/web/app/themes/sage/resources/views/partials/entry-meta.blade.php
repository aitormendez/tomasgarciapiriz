@dump($metadatos)
@if (is_singular('project'))
<div class="meta">
  <div class="nav">
    <button id="btn-info" class="info mayusculas boton">Info</button>
  </div>
  <div class="box">


    @if ($metadatos['has_autores'] || $metadatos['has_colaboradores'])
    <div class="izq">
      @if ($metadatos['has_autores'])
      <div class="autores">
        <h3 class="mayusculas">Autores</h3>
        @foreach ($metadatos['autores'] as $autor)
          <p>{{ $autor['autor'] }}</p>
        @endforeach
      </div>
      @endif
      @if ($metadatos['has_colaboradores'])
      <div class="colaboradores">
        <h3 class="mayusculas">Colaboradores</h3>
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
          <ul class="datos">
            <li> 
              <h3 class="mayusculas">{{ __('Cliente') }}</h3>
              <span>{{ $metadatos['cliente'] }}</span>
            </li>
            <li>
              <h3 class="mayusculas">{{ __('Superficie') }}</h3>
              <span>{{ $metadatos['superficie'] }}</span>
            </li>
            <li>
              <h3 class="mayusculas">{{ __('Costo M2') }}</h3>
              <span>{{ $metadatos['costo'] }}</span>
            </li>
            <li>
              <h3 class="mayusculas">{{ __('Construido') }}</h3>
              <span">{{ $metadatos['construido'] }}</span>
            </li>
            <li>
              <h3 class="mayusculas">{{ __('Año') }}</h3>
              <span>{{ $metadatos['anio'] }}</span>
            </li>
          </ul>
        @endif
        @if ($metadatos['has_tipo_de_proyecto'])
          <div class="datos">
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
@endif


<time class="updated" datetime="{{ get_post_time('c', true) }}">
  {{ get_the_date() }}
</time>
