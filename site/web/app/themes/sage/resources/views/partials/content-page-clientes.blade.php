<div class="p-6 text-white">
    @php(the_content())

    @hasfields('page_clientes')
    <h2 class="mb-4 font-bold tracking-wide">{{ __('clientes', 'sage') }}</h2>

    <ul class="table mb-6">
        @fields('page_clientes')
            <li class="table-row">
                @if (get_sub_field('page_clientes_tiene_enlace') === false)
                    <span class="table-cell pr-6">@sub('page_clientes_nombre')</span>
                @else
                    <a href="@sub('page_clientes_enlace', 'url')" taget=" @sub('page_clientes_enlace', 'target')"> @sub('page_clientes_enlace', 'title')</a>
                @endif
            </li>
        @endfields
    </ul>
    @endhasfields



</div>
