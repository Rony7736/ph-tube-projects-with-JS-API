

function getTimeString(time){
    // get hour minute and seconds
    const hour = parseInt(time / 3600)
    let remainingSeconds = parseInt(time % 3600)
    const remainingMinuts = parseInt(remainingSeconds / 60)
    remainingSeconds = remainingSeconds % 60

    return `${hour} hour ${remainingMinuts} minuits ${remainingSeconds} seconds ago`;
}

console.log(getTimeString(7865));

