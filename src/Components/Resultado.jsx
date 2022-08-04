
import styled from "@emotion/styled"

const Division = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`;

const Texto = styled.p`
 font-size: 18px;
    span{
        font-weight: 700;
    }
`;

const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`;

const Imagen = styled.img`
    display: block;
    width: 120px;
`
const Span = styled.span`
    color: #457BF5;
`

const SpanUp = styled.span`
    color: #55E292;
`

const SpanDown = styled.span`
    color: #E94242;
`

// Componente para mostrar los resultados, coge el prop de resultado y lo muestra en pantalla, esto viene de la API
const Resultado = ({ resultado }) => {

    // Hacemos object destructuring de las variables que nos interesan mostrar
    // Para la imagen hay que añadirle el link antes
    // Se crea un div que este divido en 2, una para la imagen y otro para el contenido
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

    return (
        <Division>
            <Imagen 
                src={`https://cryptocompare.com/${IMAGEURL}`} 
                alt="imagen"/>
            <div>
                <Precio> Precio Actual : <Span>{PRICE}</Span></Precio>
                <Texto> Alto 24h : <SpanUp>{HIGHDAY}</SpanUp></Texto>
                <Texto> Bajo 24h : <SpanDown>{LOWDAY}</SpanDown></Texto>
                <Texto> Variación 24h :
                    {CHANGEPCT24HOUR > 0 ? <SpanUp>{" " + CHANGEPCT24HOUR} %</SpanUp> : <SpanDown>{" " + CHANGEPCT24HOUR} %</SpanDown>}
                </Texto>
                <Texto> Última Actualización : <span>{LASTUPDATE}</span></Texto>
            </div>
        </Division>
    )
}

export default Resultado
