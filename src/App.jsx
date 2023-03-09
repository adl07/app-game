import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const elementos = [
    {id: 0 , name: 'papel' , icon: '📄' , gana: [2]  },
    {id: 1 , name: 'tijera' , icon: '✂️' , gana: [0]},
    {id: 2 , name: 'piedra', icon: '🗻' , gana: [1] }
  ]
  
  const [userChoice, setUserChoice] =useState(null)
  const [computerChoice, setComputerChoice] =useState(null)
  const [result , setResult] = useState(null)
  const [message , setMessage] = useState(null)
  const [computeMessage , setComputeMessage] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //Refactorizando
  
  function OptionsButton ({option, disabled, handlePlay}){

    return (
      <button
          key={option.id}
          disabled={disabled}
          onClick={() =>handlePlay(option.id)}
          title={option.name}
          >
          {option.icon}
      </button>
    )
    
  }

  const getResult =(userChoice, computerChoice)=>{
    if(userChoice === computerChoice){
      return 0
    }
    if(elementos[userChoice].gana.includes(computerChoice)){
      return 1;
    }

    return 2;
  }

  useEffect(()=>{
    if(userChoice != null){
      setMessage(`elegiste ${elementos[userChoice]?.icon} - ${elementos[userChoice]?.name}`)
    }
  },[userChoice])

  useEffect(()=>{
    if(computerChoice != null){
      setComputeMessage(`elegiste ${elementos[computerChoice]?.icon} - ${elementos[computerChoice]?.name}`)
    }
  }, [computerChoice])

  const handlePlay=(choice)=>{
    setUserChoice(choice)
    setDisabled(true)
    const randomChoice = Math.floor(Math.random() * 3)

      setTimeout(()=>{
        setComputerChoice(randomChoice)
      }, 1500)
    
    
      setTimeout(()=>{
        setResult(getResult(choice,randomChoice))
      }, 3000)

      clearTimeout()

  }
  const reseat = ()=>{
    setDisabled(false)
    setResult(null)
    setUserChoice(null)
    setComputeMessage(null)
    setMessage(null)
    setComputerChoice(null)
}

  return (
    <div className="App">
      <h1>Piedra, papel o tijera</h1>

      <section className='game'>
      <div>
        {elementos.map((option) =>(
          <OptionsButton
            key={option.id}
            handlePlay={handlePlay}
            disabled={disabled}
            option ={option}
          >
          </OptionsButton>
        ))}
        {userChoice != null && (
          <p>{message}</p>
        )}
        {computerChoice != null && (
          <p>{computeMessage}</p>
        )}
        <div>
          {result === 0 && <p> 💁 Empate</p>}
          {result === 1 && (
            <p> ✅ Victoria con {elementos[userChoice]?.name} contra {" "} {elementos[computerChoice]?.name}</p>
          ) }
          {result === 2 && (
              <p> 🥺 Derrota con {elementos[userChoice]?.name} contra {" "} {elementos[computerChoice]?.name}</p>
          )}
          <button className='btn-reseat' onClick={reseat}>Jugar de nuevo</button>
        </div>
      </div>
      
      </section>
      
    </div>
  )
}

export default App
