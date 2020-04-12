
import ls from 'local-storage'

// Check all thing in object is filled, notice dont check !el as it could be false
export function checkFilled(obj, exception){
    
    // Allow exception
    exception = exception ? exception : []

    let res = true

    for (const prop in obj) {
        let el = obj[prop]

        if(exception.indexOf(prop) == -1){
            if(el == "" && el == null && el == undefined && typeof el == undefined){
                res = false
            }
        }
    }

    return true
}

export function logout(){
    ls.remove('login_token')
    ls.remove('login_snum')
    ls.remove('login_uuid')
    ls.remove('data_n')
    ls.remove('data_tt')
}