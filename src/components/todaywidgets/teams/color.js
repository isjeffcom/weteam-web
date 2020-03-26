const colors = ["#FF8585", "#907EFF", "#FFC165"]

export function getColors(idx){
    return colors[idx % colors.length]
}
