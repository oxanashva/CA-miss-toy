import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveToy } from "../store/toy/toy.actions"


export function ToyEdit() {
    const [toy, setToy] = useState(toyService.createToy)

    const elDialog = useRef(null)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        elDialog.current.showModal()
        if (toyId) {
            loadToy()
        }
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (error) {
            console.log('Having issues loading toy:', error)
            showErrorMsg(`Having issues loading toy (${toyId})`)
        }
    }

    function handleChange({ target }) {
        let { name: field, value, type } = target

        if (target.multiple) {
            value = Array.from(target.options)
                .filter(option => option.selected)
                .map(option => option.value)
        } else {
            switch (type) {
                case "number":
                    value = +value
                    break
                case "checkbox":
                    value = target.checked
                    break
                default:
                    break
            }
        }

        setToy(toy => ({ ...toy, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            let toyToSave = { ...toy }
            if (toyId) {
                toyToSave.updatedAt = Date.now()
            } else {
                toyToSave.createdAt = Date.now()
            }
            saveToy(toyToSave)
            showSuccessMsg('Toy saved successfully!');
            onCloseModal()
        } catch (error) {
            console.log('Having issues saving toy:', error);
            showErrorMsg('Having issues saving toy')
            onCloseModal()
        }
    }

    function onCloseModal() {
        elDialog.current.close()
        navigate('/toy')
    }

    const labelsOptions = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    const { name, price, labels, inStock } = toy

    return (
        <dialog ref={elDialog} className="toy-edit">
            <h2>{toyId ? 'Edit Toy' : 'Add Toy'}</h2>
            <form onSubmit={onSaveToy}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min={0}
                        value={price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labels">Labels</label>
                    <select
                        id="labels"
                        name="labels"
                        multiple
                        value={labels}
                        onChange={handleChange}
                    >
                        {labelsOptions.map(label => <option key={label} value={label}>{label}</option>)}
                    </select>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="imgUrl">Image URL</label>
                    <input
                        id="imgUrl"
                        name="imgUrl"
                        type="url"
                        value={imgUrl}
                        placeholder="https://example.com"
                        pattern="https://.*"
                        onChange={handleChange}
                    />
                </div> */}
                <div className="form-group">
                    <label htmlFor="inStock">Is In Stock</label>
                    <input
                        id="inStock"
                        name="inStock"
                        type="checkbox"
                        value={inStock}
                        onChange={handleChange}
                        checked={inStock}
                    />
                </div>
                <button className="btn" type="submit">Save</button>
            </form>
            <button className="close" type="button" onClick={onCloseModal}>X</button>
        </dialog>
    )
}

// https://cdn.pixabay.com/photo/2018/10/26/13/17/russian-stacking-dolls-3774585_1280.jpg