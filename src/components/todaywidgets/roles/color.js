const bg = ["#F0F4FF", "#FFE9DE"]
const txt = ["#4B87FF", "#986D30"]

export function getColors(idx){
    return { bg: bg[idx % bg.length], txt: txt[idx % txt.length] } 
}
