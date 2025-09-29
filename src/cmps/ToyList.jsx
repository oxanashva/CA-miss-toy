import { Link } from "react-router";
import { ToyPreview } from "./ToyPreview";


export function ToyList({ toys }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="toy-actions">
                        <button className="btn">Remove</button>
                        <Link to={`/toy/edit/${toy._id}`} className="link-btn">Edit</Link>
                    </section>
                </li>
            )}
        </ul>
    )
}