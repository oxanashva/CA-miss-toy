import { showErrorMsg } from "../../services/event-bus.service"
import { toyService } from "../../services/toy.service"
import { store } from "../store"
import { SET_TOYS, ADD_TOY, REMOVE_TOY, EDIT_TOY, UNDO_CHANGES, SET_FILTER, SET_SORT } from "./toy.reducer"

export async function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy

    try {
        const toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (error) {
        console.log('Having issues with loading toys:', error)
        showErrorMsg('Having issues with loading toys')
        throw error
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (error) {
        console.log('Having issues removing toy:', error)
        throw error
    }
}

export async function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    try {
        await toyService.remove(toyId)
    } catch (error) {
        console.log('Having issues removing toy:', error)
        store.dispatch({ type: UNDO_CHANGES })
        throw error
    }
}

export async function saveToy(toyToSave) {
    const type = toyToSave._id ? EDIT_TOY : ADD_TOY
    try {
        const toy = await toyService.save(toyToSave)
        store.dispatch({ type, toy })
    } catch (error) {
        console.log('Having issues saving toy:', error)
        showErrorMsg('Having issues saving toy')
        throw error
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT, sortBy })
}