module.exports = {
    localDateString: () => {
        const dt = new Date(parseInt(Date.now()))
        const day = dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()
        const month = dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : "0" + (dt.getMonth() + 1)
        const year = dt.getFullYear()
        return year+ '-' + month + '-' + day
    }, 
    makeYesterday: () =>{
        const dt = new Date(Date.now() - 86400000)
        const day = dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()
        const month = dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : "0" + (dt.getMonth() + 1)
        const year = dt.getFullYear()
        return year+ '_' + month + '_' + day
    }
}