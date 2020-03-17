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

export const addCollectionComment = (commentData) => {
    return {
        type: 'ADD_COLLECTION_COMMENT',
        payload: commentData
    }
}

export const addAllSelections = (selectionPayload) => {
    return {
        type: 'LOAD_USER_SELECTIONS_FROM_DB',
        payload: selectionPayload
    }
}