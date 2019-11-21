export const CHANGE_YEAR = 'CHANGE_YEAR'

export const changeYear = function(year) {
    return {
        type: CHANGE_YEAR,
        payload: year
    }
}