import { useHistory } from "react-router-dom";

const Home = props => {
  const history = useHistory()
  return (
    <section className="Home">
      <h1>Welcome to the Iceberg</h1>
      <img src="/36763.jpg" />
      <button onClick={() => history.push('/dashboard')}>Log in as an interviewer</button>
      <h2>If you're a candidate, please use the link provided by the potential employer</h2>
    </section>
  )
}

export default Home