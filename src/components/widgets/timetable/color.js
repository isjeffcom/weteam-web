const bg = [
    'rgba(240, 244, 255, 1)',
    'rgba(240, 242, 255, 1)',
    'rgba(245, 255, 254, 1)',
    'rgba(255, 252, 245, 1)',
    'rgba(255, 247, 245, 1)',
    'rgba(245, 248, 255, 1)',
    'rgba(239, 239 , 239, 1)'
]

const border = [
    'rgba(75, 135, 255, 1)',
    'rgba(87, 86, 179, 1)',
    'rgba(77, 198, 132, 1)',
    'rgba(198, 186, 77, 1)',
    'rgba(198, 107, 81, 1)',
    'rgba(81, 144, 189, 1)',
    'rgba(107, 107 , 107, 1)'
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