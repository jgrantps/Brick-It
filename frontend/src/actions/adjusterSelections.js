export const addSelection = (selectionData) => {
    return {
        type: 'ADD_SELECTION',
        payload: selectionData
    }
}

export const addKits = (kitsData) => {
    return {
        type: 'ADD_KIT',
        payload: kitsData
    }
}