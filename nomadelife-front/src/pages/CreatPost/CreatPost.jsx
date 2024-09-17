import {useState} from 'react'

export const CreatPost = () => {
  const [post, setPost] = useState("Mensagem do Post");
  return (
    <>
    <p> {post} </p>
    <button onClick={() => setPost ("Outra Mensagem")}>Trocar</button>  
    </>
  )
}

export default CreatePost