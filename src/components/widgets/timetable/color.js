const bg = [
    'rgba(240, 244, 255, 1)',
    'rgba(96, 59, 244, 1)',
    'rgba(255, 122, 0, 1)',
    'rgba(8, 201, 85, 1)',
    'rgba(122, 59, 295, 1)',
    'rgba(255, 94, 84, 1)',
    'rgba(241, 193 , 69, 1)'
]

const border = [
    'rgba(75, 135, 255, 1)',
    'rgba(96, 59, 244, 1)',
    'rgba(255, 122, 0, 1)',
    'rgba(8, 201, 85, 1)',
    'rgba(122, 59, 295, 1)',
    'rgba(255, 94, 84, 1)',
    'rgba(241, 193 , 69, 1)'
]

export function sColor(index, mode){
    if(mode == "border"){
        return set(index, border)
    } else {
        return set(index, bg)
    }

}

function set(index, colors){
    if(!index){
        index = 0
    }

    if(!index){
        return colors[0]
    }

    if(index > colors.length){
        index = index % colors.length
    }

    return colors[index]
}