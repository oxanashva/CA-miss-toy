import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { toyService } from "../services/toy.service"
import { showErrorMsg } from "../services/event-bus.service"
import { formatToDate } from "../services/util.service"
import instock from "../assets/img/instock.png"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    console.log('toy :', toy);
    const params = useParams()

    useEffect(() => {
        loadToy()
    }, [params.toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(params.toyId)
            setToy(toy)
        } catch (error) {
            showErrorMsg("Error loading toy")
        }
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="container toy-details">
            <div className="img-wrapper">
                <img className="toy-img" src={toy.imgUrl} alt={toy.name} width={300} />
                {toy.inStock && <img className="instock" src={instock} alt="In Stock" width={40} />}
            </div>

            <div className="info">
                <h2>{toy.name}</h2>
                <div className="labels">
                    {toy.labels.map(label => <span key={label} className="label">{label}</span>)}
                </div>
                <p className="price">${toy.price}</p>
                <span className="date">Posted: {formatToDate(toy.createdAt)}</span>

                <div className="actions">
                    <Link to="/toy" className="link-btn">Back</Link>
                    <Link to={`/toy/${toy.prevToyId}`} className="link-btn">Prev</Link>
                    <Link to={`/toy/${toy.nextToyId}`} className="link-btn">Next</Link>
                </div>
            </div>
        </section>
    )
}