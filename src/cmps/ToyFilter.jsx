import { useEffect, useRef, useState } from "react"
import { debounce } from "../services/util.service"


export function ToyFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterByDebounced = useRef(debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterByDebounced(filterByToEdit)
    }, [filterByToEdit])
    function handleChange({ target }) {
        let { name: field, value, type } = target

        switch (type) {
            case "number":
                value = +value
                break
            case "checkbox":
                value = target.checked
                break
            case "select-multiple":
                value = Array.from(target.options)
                    .filter(option => option.selected)
                    .map(option => option.value)
                break
            case "select-one":
                if (field === 'inStock') {
                    if (value === 'true') {
                        value = true
                    } else if (value === 'false') {
                        value = false
                    } else {
                        value = ''
                    }
                }
                break
            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const labelsOptions = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    const { name, inStock, labels } = filterByToEdit
    return (
        <section className="toy-filter">
            <h2>Filter Toys By:</h2>
            <div className="filters">
                <div className="filter">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="filter">
                    <label htmlFor="name">In Stock</label>
                    <select
                        id="inStock"
                        name="inStock"
                        value={inStock}
                        onChange={handleChange}
                    >
                        <option value="">All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                    </select>
                </div>
                <div className="filter">
                    <label htmlFor="name">Labels</label>
                    <select
                        id="labels"
                        name="labels"
                        value={labels}
                        multiple
                        onChange={handleChange}
                    >
                        {labelsOptions.map(label => <option key={label} value={label}>{label}</option>)}
                    </select>
                </div>
            </div>
        </section>
    )
}