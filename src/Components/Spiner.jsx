
import '../styles/Spiner.css'
import styled from '@emotion/styled'

const Division = styled.div`
    margin-top: 100px;
`;



const Spiner = () => {
  return (
      <Division>
        <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
        </div>
       </Division>
  )
}

export default Spiner
