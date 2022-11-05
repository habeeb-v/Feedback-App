import loading from '../assets/loading.mp4'


function Spinner() {
  return (
    <video
    src= {loading}
    alt = "Loading.."
    style={{width:'100px', margin: 'auto', display: 'block',
}}
    />
  )
}

export default Spinner
