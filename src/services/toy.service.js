import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

export const toyService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getFilterFromSearchParams,
    createToy
}

const STORAGE_KEY = 'TOYS_DB'

const baseUrl = import.meta.env.BASE_URL;

_createToys()

async function query() {
    try {
        let robots = await storageService.query(STORAGE_KEY)

        return robots
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

async function save(toyToSave) {
    if (toyToSave._id) {
        return await storageService.put(STORAGE_KEY, toyToSave)
    } else {
        return await storageService.post(STORAGE_KEY, toyToSave)
    }
}

async function remove(id) {
    return await storageService.remove(STORAGE_KEY, id)
}

async function getById(id) {
    let toy = await storageService.get(STORAGE_KEY, id)
    toy = _setNextPrevToyId(toy)
    return toy
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: [] }
}

function getFilterFromSearchParams(searchParams) {
    const deaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in deaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function createToy(
    name = '',
    price = 0,
    labels = [],
    inStock = true
) {
    return {
        name,
        price,
        labels,
        inStock
    }
}

function _setNextPrevToyId(toy) {
    return query().then((toys) => {
        const toyIdx = toys.findIndex((currBook) => currBook._id === toy._id)
        const nextId = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevId = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextId._id
        toy.prevToyId = prevId._id
        return toy
    })
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                "_id": "t104",
                "name": "Finger Paint Set",
                "price": 28,
                "imgUrl": `${baseUrl}toy-img/paint-set.jpeg`,
                "labels": ["Art", "Baby"],
                "createdAt": 1632595200000,
                "inStock": true
            },
            {
                "_id": "t105",
                "name": "Scooter",
                "price": 150,
                "imgUrl": `${baseUrl}toy-img/scooter.jpeg`,
                "labels": ["On wheels", "Outdoor"],
                "createdAt": 1633113600000,
                "inStock": true
            },
            {
                "_id": "t106",
                "name": "Monopoly Board Game",
                "price": 45,
                "imgUrl": `${baseUrl}toy-img/board-game.jpeg`,
                "labels": ["Box game"],
                "createdAt": 1633632000000,
                "inStock": true
            },
            {
                "_id": "t107",
                "name": "Cuddle Bear Plush",
                "price": 75,
                "imgUrl": `${baseUrl}toy-img/bear.jpeg`,
                "labels": ["Doll", "Baby"],
                "createdAt": 1634150400000,
                "inStock": false
            },
            {
                "_id": "t108",
                "name": "Building Blocks Set",
                "price": 60,
                "imgUrl": `${baseUrl}toy-img/block-set.jpeg`,
                "labels": ["Puzzle", "Art"],
                "createdAt": 1634668800000,
                "inStock": true
            },
            {
                "_id": "t101",
                "name": "Talking Doll",
                "price": 123,
                "imgUrl": `${baseUrl}toy-img/doll.jpeg`,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "_id": "t102",
                "name": "Remote Control Car",
                "price": 85,
                "imgUrl": `${baseUrl}toy-img/car.jpeg`,
                "labels": ["On wheels", "Battery Powered", "Outdoor"],
                "createdAt": 1631558400000,
                "inStock": true
            },
            {
                "_id": "t103",
                "name": "Jigsaw Puzzle (1000 pieces)",
                "price": 35,
                "imgUrl": `${baseUrl}toy-img/puzzle.jpeg`,
                "labels": ["Puzzle", "Box game"],
                "createdAt": 1632076800000,
                "inStock": false
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}