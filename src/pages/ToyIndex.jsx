import { useEffect } from "react"
import { loadToys, setFilterBy } from "../store/toy/toy.actions"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router"
import { toyService } from "../services/toy.service"
import { formatToDate, getExistingProperties } from "../services/util.service"
import instock from '../assets/img/instock.png'
import { ToyList } from "../cmps/ToyList"


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

    return (
        <section className="container">
            <ToyList toys={toys} />
        </section>
    )
}