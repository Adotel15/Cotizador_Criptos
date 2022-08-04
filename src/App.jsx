import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import Formulario from './Components/Formulario'
import Resultado from './Components/Resultado'
import Spiner from './Components/Spiner'

import ImagenCrypto from './img/imagen-criptos.png'


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;


const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #F4901F;
    display: block;
    margin: 10px auto 0 auto;

  }
`;

function App() {

  // Los states
  // State para la moneda actual seleccionada, es un objeto con el nombre de la moneda, y con la criptomoneda a cotizar
  const [ monedas, setMonedas ] = useState({})
  // State para el resultado del objeto que devuelve la API para la moneda con la criptomenda actual del state de arriba
  const [ resultado, setResultado ] = useState({})
  // Esto es lo que permite que se vea la animación para el cargando
  const [ cargando, setCargando ] = useState(false)

  // Effect que lee cuando el valor de las monedas se actualiza
  useEffect(() => {
    // Si monedas tiene algo guardado
    if(Object.keys(monedas).length > 0){

      // Función para coger el objeto de la API con el valor de la moneda y criptomoneda
      const cotizarCripto = async () => {
        // Mientras dure la ejecución de esta función se muestra el spiner, y el objeto de resultado está vacio
        setCargando(true);
        setResultado({})

        // Cojemos los datos del objeto monedas, y creamos la URL
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        // const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedas.criptomoneda}&tsyms=${monedas.moneda}`

        // Llamamos a la página
        const respuesta = await fetch(url);
        // Lo convertimos a JSON
        const API = await respuesta.json();

        // Del JSON guardamos en el state solo la parte que nos interesa que es la interacción de la moneda con la cripto
        setResultado(API.DISPLAY[criptomoneda][moneda])
        setCargando(false);
      }
      // Llamamos a la función
      cotizarCripto()
    }
  }, [monedas])


  return (
    <Contenedor>
      {/* Contenedor de 2 columnas una para la Imagen y otra para todo la parte del Forumulario, Heading, Resultados */}

      <Imagen
        src={ImagenCrypto}
        alt="imagenes criptomonedas"
      />

      <div>
        <Heading>Ver el Precio de las Criptomonedas</Heading>
        <Formulario
          setMonedas={setMonedas}
        />

        {cargando && <Spiner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>

    </Contenedor>
  )
}

export default App
