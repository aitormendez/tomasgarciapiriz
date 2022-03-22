<div class="p-6 text-white">
    @php(the_content())

    @hasfields('page_colaboradores')
    <h2 class="mb-4 font-bold tracking-wide">{{ __('Colaboradores habituales', 'sage') }}</h2>

    <ul class="table mb-6">
        @fields('page_colaboradores')
            @if (get_sub_field('page_colaboradores_tipo') === 'habitual')
                <li class="table-row">
                    @if (get_sub_field('page_colaboradores_tiene_enlace') === false)
                        <span class="table-cell pr-6">@sub('page_colaboradores_nombre')</span>
                    @else
                        <a href="@sub('page_colaboradores_enlace', 'url')" taget=" @sub('page_colaboradores_enlace', 'target')"> @sub('page_colaboradores_enlace', 'title')</a>
                    @endif
                    <span class="table-cell"> @sub('page_colaboradores_rol')</span>
                </li>
            @endif   
        @endfields
    </ul>

    <h2 class="mb-4 font-bold tracking-wide">{{ __('Colaboradores anteriores', 'sage') }}</h2>

    <ul class="table mb-6">
        @fields('page_colaboradores')
            @if (get_sub_field('page_colaboradores_tipo') === 'anterior')
                <li class="table-row">
                    @if (get_sub_field('page_colaboradores_tiene_enlace') === false)
                        <span class="table-cell pr-6">@sub('page_colaboradores_nombre')</span>
                    @else
                        <a href="@sub('page_colaboradores_enlace', 'url')" taget=" @sub('page_colaboradores_enlace', 'target')"> @sub('page_colaboradores_enlace', 'title')</a>
                    @endif
                    <span class="table-cell"> @sub('page_colaboradores_rol')</span>
                </li>
            @endif   
        @endfields
    </ul>
    @endhasfields



</div>
