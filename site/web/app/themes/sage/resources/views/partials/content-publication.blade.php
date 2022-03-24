<article id="post-{{ get_the_ID() }}" class="w-40 mr-6">

    @if (has_post_thumbnail())
      <div class="flex items-end cubierta sm:h-80">
        @thumbnail('medium')
      </div>
    @endif

    <ul class="mt-4 text-xs datos">
      @php $tipo = get_field('publication_tipo') @endphp
      <li class="mb-2 font-bold">
        @if ($tipo === 'libro')
            {{ __('Libro', 'sage') }}
        @endif
        @if ($tipo === 'articulo')
            {{ __('Artículo', 'sage') }}
        @endif
        @if ($tipo === 'Capítulo')
            {{ __('Capítulo', 'sage') }}
        @endif
      </li>
      
      @hasfields('publication_autores')
        @fields('publication_autores')
          <li>@sub('publication_autor')</li>
        @endfields
      @endhasfields

      @if (get_field('publication_tipo') === 'libro')
        <li>“{!! $title !!}”</li>
      @else
        @hasfield('publication_capitulo')<li>“@field('publication_capitulo')”</li>@endfield
        <li>{!! $title !!}</li>
      @endif

      @field('publication_editorial')

      @if (get_field('publication_proyectos'))
        <li>
          <ul>
            @foreach (get_field('publication_proyectos') as $project)
              <li>
                <a href="{{ get_permalink($project->ID) }}">{{ $project->post_title }}</a>
              </li>
            @endforeach
          </ul>
        </li>

      @endif

    </ul>

</article>
