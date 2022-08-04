
import { useState } from "react";
import styled from "@emotion/styled"

const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`;

const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`;

// Hook personalizado, coge el texto lo imprime arriba, y crea un select con las opciones
const useSelectMonedas = (texto, opciones) => {

    // Esta es la opcion que el usuario ha seleccionado
    const [state, setState] = useState('')

    // Función que crea el select, pone el texto primero, el value del select es el state, y luego recorre con .map las Opciones, necesita 2 valors, el id y el nombre
    const SelectMonedas = () => (
        <>
            <Label>{texto}</Label>
            <Select
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value="">Seleccione</option>

                {opciones.map( opcion => (
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >
                        {opcion.nombre}
                    </option>
                ))}
            </Select>
        </>
    )

    // Devolvemos el state, y el selectMonedas que es quien crea el select como tal
    return [ state, SelectMonedas ]
 
}

export default useSelectMonedas
