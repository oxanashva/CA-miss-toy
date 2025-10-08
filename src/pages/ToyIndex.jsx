import { useEffect } from "react"
import { loadToys, removeToyOptimistic, setFilterBy, setSortBy } from "../store/toy/toy.actions"
import { useSelector } from "react-redux"
import { Link, Outlet, useSearchParams } from "react-router"
import { toyService } from "../services/toy.service"
import { getExistingProperties } from "../services/util.service"
import { ToyList } from "../cmps/ToyList"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { ToyFilter } from "../cmps/ToyFilter"


export function ToyIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

    useEffect(() => {
        setFilterBy(toyService.getFilterFromSearchParams(searchParams))
    }, [])

    useEffect(() => {
        loadToys()
        setSearchParams(getExistingProperties(filterBy))
    }, [filterBy, sortBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed successfully!');
        } catch (error) {
            showErrorMsg(`Having issues removing toy (${toyId})`)
        }
    }

    function onSetSortBy(field, direction) {
        const newSortBy = {}
        newSortBy[field] = direction
        setSortBy(newSortBy)
    }

    function onClearFilters() {
        setFilterBy(toyService.getDefaultFilter())
        setSortBy({})
    }

    return (
        <section className="toy-index container">
            <Link to="/toy/edit" className="link-btn add-btn">Add Toy</Link>
            <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} sortBy={sortBy} onSetSortBy={onSetSortBy} onClearFilters={onClearFilters} />
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            <Outlet />
        </section>
    )
}