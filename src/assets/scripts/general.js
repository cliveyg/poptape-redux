export function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;
    return uuidRegex.test(uuid);
}

export function getFieldFromToken(token, field) {
    const tokenArray = token.split(".")
    const base64decoded = JSON.parse(atob(tokenArray[1]))
    return base64decoded[field]
}

export function getErrorMessage(e, status, caller) {

    let retErr = {
         'message': 'error',
         'translate': true
    }

    if (status === 500 || status === 500 || status === 502) {
        retErr.message = 'errors:server'
    } else {
        if (caller === 'signup') {
            retErr.message = 'errors:user_pass_not_valid'
        } else if (caller === 'login') {
            retErr.message = 'errors:user_pass_incorrect'
        }
        if (e.message !== undefined) {
            retErr.message = e.message
            retErr.translate = false
        }
    }

    return retErr
}

// this function is a workaround to test the create item page
// it will be replaced by a categories microservice
export function getCategoriesAndFields() {

    const topLevelCats = [
        {"name": "items:cif_tlc_vehicles", "value": "vehicles:20001"},
        {"name": "items:cif_tlc_collectables", "value": "collectables-art:30000"},
        {"name": "items:cif_tlc_electronics", "value": "electronics:40000"},
        {"name": "items:cif_tlc_books", "value": "books:50000"},
        {"name": "items:cif_tlc_toys", "value": "toys:60000"},
        {"name": "items:cif_tlc_music", "value": "music:70000"},
        {"name": "items:cif_tlc_business", "value": "business-industrial:80000"},
        {"name": "items:cif_tlc_misc", "value": "misc:10000"},
    ]

    const vehicleCats = [
        {"name": "items:cif_slc_autoparts", "value": "autoparts:20010"},
        {"name": "items:cif_slc_boats", "value": "boats:20100"},
        {"name": "items:cif_slc_cars", "value": "cars:21000"},
        {"name": "items:cif_slc_motorbikes", "value": "motorcycles:22000"},
        {"name": "items:cif_slc_trucks", "value": "trucks-vans:25000"},
        {"name": "items:cif_slc_other_vehicles", "value": "other-industrial-vehicles:27000"},
        {"name": "items:cif_slc_buses", "value": "buses:28000"}
    ]

    const otherCats = [
        {"name": "items:cif_slc_cat", "value": "cat-a:0001"},
        {"name": "items:cif_slc_mouse", "value": "cat-b:0002"},
        {"name": "items:cif_slc_dog", "value": "cat-c:0003"},
        {"name": "items:cif_slc_giraffe", "value": "cat-d:0004"},
        {"name": "items:cif_slc_lion", "value": "cat-e:0005"},
        {"name": "items:cif_slc_sheep", "value": "cat-f:0006"},
    ]

    const standardFields = [
        {key: "name", label: "Name", type: "text", props: {required: true, maxlength: 150}},
        {key: "start_date", label: "Some date", type: "datetime", props: {required: true}},
        {key: "amount", label: "Amount", type: "currency", props: {required: true}},
        {key: "some_field", label: "Some field", type: "text", props: {maxlength: 150}},
        {
            key: "description", label: "Description", type: "maxtext", props: {
                required: true,
                rows: 8,
                maxlength: 5000
            }
        },
        {
            key: "colours", label: "Colours", type: "select",
            props: {
                required: true, items: [{label: "Red", value: "red", order: 1},
                    {label: "Yellow", value: "yellow", order: 2},
                    {label: "Blue", value: "blue", order: 3}]
            }
        },
        {
            key: "add_to_auction", label: "Add to auction", type: "radio",
            props: {
                required: true, items: [{label: "Now", value: "now", order: 1},
                    {label: "Later", value: "later", order: 2}]
            }
        },
    ]

    const carFields = [
        {key: "title", label: "Item Title", type: "text", props: {required: true, maxlength: 150}},
        {
            key: "description", label: "Description", type: "maxtext", props: {
                required: true,
                rows: 8,
                maxlength: 5000
            }
        },
        {key: "condition", label: "Condition", type: "text", props: {required: true, maxlength: 50}},
        {key: "make", label: "Make", type: "text", props: {maxlength: 50}},
        {key: "model", label: "Model", type: "text", props: {maxlength: 90}},
        {key: "year", label: "Year", type: "number", props: {required: true}},
        {key: "mileage", label: "Mileage (km)", type: "number", props: {required: true}},
        {key: "vin", label: "VIN", type: "text", props: {required: true, maxlength: 25}},
        {key: "doors", label: "Number of doors", type: "number", props: {required: true}},
        {
            key: "colour", label: "Colour", type: "select",
            props: {
                required: true, items: [{label: "Silver", value: "silver", order: 1},
                    {label: "White", value: "white", order: 2},
                    {label: "Black", value: "black", order: 3},
                    {label: "Gold", value: "gold", order: 4},
                    {label: "Red", value: "red", order: 5},
                    {label: "Yellow", value: "yellow", order: 6},
                    {label: "Blue", value: "blue", order: 7},
                    {label: "Green", value: "green", order: 8},
                    {label: "Grey", value: "grey", order: 9},
                    {label: "Orange", value: "orange", order: 10},
                    {label: "Brown", value: "brown", order: 11},
                    {label: "Other", value: "Other", order: 12},]
            }
        },
        {
            key: "power_options", "label": "Power options", type: "checkbox",
            props: {
                items:
                    [{label: "Power steering", value: "powersteer", order: 1},
                        {label: "Electric windows", value: "elecwindows", order: 2},
                        {label: "Cruise control", "value": "cruise", order: 3},
                        {label: "Aircon", "value": "aircon", order: 4},
                    ],
            }
        },
        {
            key: "number_of_cylinders", label: "Number of cylinders", type: "select",
            props: {
                items:
                    [{label: "N/A", value: "na", order: 1},
                        {label: "Two", value: "2", order: 2},
                        {label: "Four", value: "4", order: 3},
                        {label: "Six", value: "6", order: 4},
                        {label: "V6", value: "v6", order: 5},
                        {label: "Eight", value: "8", order: 6},
                        {label: "V8", value: "v8", order: 7},
                        {label: "Ten", value: "10", order: 8},
                        {label: "Twelve", value: "12", order: 9},
                        {label: "V12", value: "v12", order: 10},
                        {label: "Other", value: "other", order: 11},
                    ],
            }
        },
        {
            key: "safety_features", "label": "Safety features", type: "checkbox",
            props: {
                items:
                    [{label: "ABS", value: "abs", order: 1},
                        {label: "Airbags", value: "airbag", order: 2},
                        {label: "Side airbags", "value": "sidebag", order: 3},
                    ],
            }
        },
        {
            key: "transmission", label: "Transmission", type: "radio",
            props: {
                required: true, items: [{label: "Manual", value: "manual", order: 1},
                    {label: "Auto", value: "auto", order: 2}]
            }
        },
        {
            key: "fuel_type", label: "Fuel type", type: "select",
            props: {
                items:
                    [{label: "Petrol", value: "petrol", order: 1},
                        {label: "Diesel", value: "diesel", order: 2},
                        {label: "Electric", value: "electric", order: 3},
                        {label: "Hybrid", value: "hybrid", order: 4},
                        {label: "LPG", value: "lpg", order: 5},
                        {label: "Flex", value: "flex", order: 6},
                        {label: "Other", value: "other", order: 7},
                    ],
            }
        },
        {
            key: "drivetrain", label: "Drivetrain", type: "select",
            props: {
                items:
                    [{label: "Front wheel drive", value: "fwd", order: 1},
                        {label: "Rear wheel drive", value: "rwd", order: 2},
                        {label: "4x4", value: "4wd", order: 3},
                        {label: "All wheel drive", value: "awd", order: 4},
                        {label: "Other", value: "other", order: 5},
                    ],
            }
        },
        {
            key: "driveside", label: "Drive side", type: "radio",
            props: {
                required: true, items: [{label: "Left", value: "left", order: 1},
                    {label: "Right", value: "right", order: 2}]
            }
        },
        {key: "location", label: "Location", type: "text", props: {required: true, maxlength: 90}},
        {
            key: "manufacture_country",
            label: "Country of manufacture",
            type: "text",
            props: {required: false, maxlength: 90}
        },
    ]

    return {topLevelCats, vehicleCats, otherCats, standardFields, carFields}
}