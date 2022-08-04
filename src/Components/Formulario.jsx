
import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import useSelectMonedas from "../Hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import Error from "./Error";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 20px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`;

const Formulario = ({setMonedas}) => {

    // State donde se guardan las 20 criptos con mayor MarketCap, lo coge de una API y lo guarda aqui en forma de array
    const [ criptos, setCriptos ] = useState([])
    // State para el error
    const [ error, setError ] = useState(false)

    // State de useSelectMoneda que crea un Componente que usa select que guarda en la segunda variable, y en la primera guarda la opción escogida
    // Se le tiene que pasar como primera variable un string que imprimira arriba del select, y la segunda son las opciones del select
    
    // Select para las monedas FIAT
    const [ moneda, SelectMonedas ] = useSelectMonedas("Seleccione una Moneda", monedas);
    // Select para las criptos, viene de la API
    const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas("Seleccione una Criptomoneda", criptos);

    // UseEffect que coge las 20 criptos mejor cotizadas y las guarda en un array como objetos con el nombre completo y las siglas en criptos
    useEffect(() => {
        
        const consultarApi = async () => {
            // Cogemos la URL
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";

            // Llamamos a la página y lo guardamos con json
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            // Solo necesitamos la .Data
            console.log(resultado.Data)

            // Creamos un array auxiliar, que haga el map de resultados, y devuelva solo un objeto con el nombre y las siglas
            const arrayCriptos = resultado.Data.map( cripto => {
                return {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
            })

            setCriptos(arrayCriptos)
        }
        consultarApi();

    } ,[])

    // Cuando le damos a Submit, comprobamos que no haya nada vació, sino error true
    const handleSubmit = e => {
        e.preventDefault()

        if([ moneda, criptomoneda ].includes('')){
            setError(true);
            return;
        }

        setError(false)

        // Guaradamos en Monedas, las variables recogidas
        setMonedas({
            moneda,
            criptomoneda
        })
    }
    
    return (
        <>
            {error && 
                <Error 
                    mensaje = {"Todos los campos son obligatorios"}
                />
            }
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptomonedas />

                <InputSubmit
                    type="submit"
                    value="Cotizar" 
                />
            </form>
        </>
    )
}

export default Formulario


