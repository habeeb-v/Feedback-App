import Card from "../components/shared/Card"
import { Link } from "react-router-dom"

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About This Project</h1>
            <p>This a React app to leave feedback on our product</p>
            <p>Versioin: 1.0.0</p>

            <p>
                <Link to='/'>Back To Home</Link>
            </p>
        </div>
    </Card>
  )
}

export default AboutPage
