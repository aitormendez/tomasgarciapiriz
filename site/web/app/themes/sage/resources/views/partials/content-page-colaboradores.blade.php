<div class="p-6 text-white">
    @php(the_content())

    @hasfields('page_colaboradores')
    <h2 class="mb-4 font-bold tracking-wide">{{ __('Colaboradores habituales', 'sage') }}</h2>
        <ul class="table mb-6">
            @fields('page_colaboradores')
                @if (get_sub_field('page_colaboradores_tipo') === 'habitual')
                    <li class="table-row">
                        <span class="table-cell pr-6"> @sub('page_colaboradores_nombre')</span> <span class="table-cell"> @sub('page_colaboradores_rol')</span>
                    </li>
                @endif   
            @endfields
        </ul>
    @endhasfields

    @hasfields('page_colaboradores')
    <h2 class="mb-4 font-bold tracking-wide">{{ __('Colaboradores anteriores', 'sage') }}</h2>
        <ul class="table mb-6">
            @fields('page_colaboradores')
                @if (get_sub_field('page_colaboradores_tipo') === 'anterior')
                    <li class="table-row">
                        <span class="table-cell pr-6"> @sub('page_colaboradores_nombre')</span> <span class="table-cell"> @sub('page_colaboradores_rol')</span>
                    </li>
                @endif   
            @endfields
        </ul>
    @endhasfields

</div>
