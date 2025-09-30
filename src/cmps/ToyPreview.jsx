import { formatToDate } from "../services/util.service";
import instock from "../assets/img/instock.png"
import { Link } from "react-router";

export function ToyPreview({ toy }) {
    return (
        <article className='toy-preview'>
            <Link to={`/toy/${toy._id}`}>
                <h2>{toy.name}</h2>
                <div className="labels">
                    {toy.labels.map(label => <span key={label} className="label">{label}</span>)}
                </div>
                <div className="img-wrapper">
                    <img className="toy-img" src={toy.imgUrl} alt={toy.name} width={200} />
                    {toy.inStock && <img className="instock" src={instock} alt="In Stock" width={40} />}
                </div>
                <p className="price">${toy.price}</p>
                <div className="status">
                    {toy.createdAt && <p className="date">Posted: {formatToDate(toy.createdAt)}</p>}
                    {toy.updatedAt && <p className="date">Updated: {formatToDate(toy.updatedAt)}</p>}
                </div>
            </Link>
        </article>
    )
}