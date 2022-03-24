<article id="post-{{ get_the_ID() }}" @php(post_class('relative post mb-6 article'))>

    @if (has_post_thumbnail())
      <div class="cubierta">
        @thumbnail('medium')
      </div>
    @endif

    <ul class="capitalize datos">
      <li class="font-bold">{{ get_field('publication_tipo') }}</li>
      
      @hasfields('publication_autores')
        @fields('publication_autores')
          <li>@sub('publication_autor')</li>
        @endfields
      @endhasfields

      @if (get_field('publication_tipo') === 'libro')
        <li>“{!! $title !!}”</li>
      @else
        <li>“@field('publication_capitulo')”</li>
        <li>{!! $title !!}</li>
      @endif

      @field('publication_editorial')





    </ul>

</article>
