@if ($relacionados)
    <section class="bg-black relacionados">

        <h2 class="p-6 font-bold text-white">{{ __('Contenido relacionado', 'sage') }}</h2>
        
        <ul class="flex flex-wrap">
            @foreach ($relacionados as $relacionado)
                <li class="w-1/2 mb-6 md:w-2/6 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
                    <a href="{{ get_permalink($relacionado) }}">
                        @thumbnail($relacionado->ID,'large')
                        <h3 class="px-6 pt-3">{{ $relacionado->post_title }}</h3>
                    </a>
                </li>
            @endforeach
        </ul>

    </section>
@endif