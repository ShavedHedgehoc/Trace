import { fetchBoilsDataAction, handleErrorBoilsDataAction } from "../store/boilsDataReducer";


export const fetchBoils = (formData) => {

    const apiUrl = `/api/v1/boils?page=0` +
        // ${page}` +
        //`&per_page=${perPage}` +
        `&per_page=10` +
        `&batch_search=${formData.batch}` +
        `&marking_search=${formData.marking}` +
        `&date_search=${formData.date}` +
        `&month_search=${formData.month}` +
        `&year_search=${formData.year}` +
        `&plant_search=${formData.plant}`

    return function (dispatch) {

        fetch(apiUrl)
            // .then(response=>response.json())
            // .then(json=>dispatch(fetchBoilsDataAction(json)))
            .then(response => {
                console.log(response.status);

                if (response.status == 200) {
                    return response
                } else {
                    let error = new Error(response.statusText);
                    error.response = response
                    throw error
                }
            })
            .then(response => response.json())
            .then(json => dispatch(fetchBoilsDataAction(json)))
            .catch((e) => dispatch(handleErrorBoilsDataAction(e.message)))
    }

}
