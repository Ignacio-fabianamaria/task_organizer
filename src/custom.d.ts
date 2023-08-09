declare module '*.svg'{
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src:string;
    export default src;
}

//declaração de módulo TypeScript para arquivos SVG

/*Em resumo, esse trecho de código é uma declaração de módulo TypeScript
para arquivos SVG, permitindo que importe arquivos SVG em projeto e use
o componente ReactComponent para renderizá-los como componentes
funcionais React */