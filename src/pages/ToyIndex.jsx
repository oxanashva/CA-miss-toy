import { useEffect } from "react"
import { loadToys, removeToyOptimistic, setFilterBy } from "../store/toy/toy.actions"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router"
import { toyService } from "../services/toy.service"
import { getExistingProperties } from "../services/util.service"
import { ToyList } from "../cmps/ToyList"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ToyIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        setFilterBy(toyService.getFilterFromSearchParams(searchParams))
    }, [])

    useEffect(() => {
        loadToys()
        setSearchParams(getExistingProperties(filterBy))
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed successfully!');
        } catch (error) {
            showErrorMsg(`Having issues removing toy (${toyId})`)
        }
    }

    return (
        <section className="container">
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </section>
    )
}