import { useState } from "react"

const REACT_APP_KEY = '1b27307cc5b94f18952185201230806'
const REACT_APP_URL = 'http://api.weatherapi.com/v1/current.json?aqi=no'


const WeatherApp = () => {
    const [inputValue, setInputValue] = useState('')
    const [clima, setClima] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue.trim() == '') return
        
        getClima(inputValue)
    }

    const getClima = (city) => {
        setClima(null)
        setLoading(true); // Mostrar el indicador de carga al iniciar la solicitud
        setError(false); // Reiniciar el estado de error
    
        fetch(`${REACT_APP_URL}&key=${REACT_APP_KEY}&q=${city}`)
          .then((res) => {
            if (!res.ok) {
              setError(true);
              setClima(null);
              throw new Error(`Network response was not ok: ${res.status}`);
            }
            setInputValue('')
            return res.json();
          })
          .then((data) => {
            setLoading(false); // Ocultar el indicador de carga al recibir la respuesta
            setClima(data);
          })
          .catch((err) => {
            setLoading(false); // Ocultar el indicador de carga en caso de error
            console.error('An error occurred:', err.message);
            // Aquí puedes realizar acciones adicionales según el tipo de error, como mostrar un mensaje al usuario
          });
      };

  return (
    <>
    <h1 className="title">App Weather</h1>
    <h3 className="title">Look for a city</h3>
    <section className="form-container">
    <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} placeholder="london, new york, paris" onChange={(e)=> setInputValue(e.target.value)} />
        <button type="submit">search</button>
    </form>
    </section>

    {loading && <p className="loading">Loading...</p>}

    {error && <p className="error">The weather of the searched city was not found</p>}
    
    {
        clima &&
        <section className="container">
            <div className="info-container">
            <div className="localidad">
            <h2>{clima.location.name}</h2>
            <h3>{clima.location.country}</h3>
            </div>
            <p>Temperature: {clima.current.temp_c}º</p>
            <p>Humidity: {clima.current.humidity}%</p>
            <p>Wind speed: {clima.current.wind_kph} km/h</p>
            
            <div className="div-icon-clima">
            <p>{clima.current.condition.text}</p>
            <img src={clima.current.condition.icon} alt={`${clima.location.name}-clima-icon`} />
            </div>

            <iframe
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d${clima?.location.lon}5!3d${clima?.location.lat}5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smx!4v1651103744472!5m2!1sen!2smx`}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

        </div>
        </section>
    }
    </>
  )
}

export default WeatherApp