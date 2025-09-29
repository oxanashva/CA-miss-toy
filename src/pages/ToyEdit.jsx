import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"


export function ToyEdit() {
    const elDialog = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        elDialog.current.showModal()
    }, [])

    function onCloseModal() {
        elDialog.current.close()
        navigate('/toy')
    }

    return (
        <dialog ref={elDialog} className="toy-edit">
            <h2>Edit Toy</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Labels</label>
                    <select
                        id="labels"
                        name="labels"
                        multiselect="true"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Is In Stock</label>
                    <input
                        id="instock"
                        name="instock"
                        type="checkbox"
                    />
                </div>
                <button className="btn" type="submit">Save</button>
            </form>
            <button className="close" type="button" onClick={onCloseModal}>X</button>
        </dialog>
    )
}