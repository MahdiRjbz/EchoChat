const modifyTimestamp = (timestamp) => {
    let today = new Date();
    today = {year: today.getFullYear(), month: today.getMonth(), day: today.getDate()}
    let date = timestamp?.toDate()
    date = {year: date?.getFullYear(), month: date?.getMonth(), day: date?.getDate()}
    if (timestamp) {
        if (today.year === date.year && today.month === date.month && today.day === date.day) {
            return timestamp.toDate().toLocaleTimeString('fa-IR').slice(0, -3)
        } else if (today.year === date.year && today.month === date.month &&  date.day + 1 === today.day) {
            return 'Yesterday'
        } else {
            return timestamp.toDate().toLocaleDateString('fa-IR')
        }
} else {
    return 'Wait...'
}
}
  
export { modifyTimestamp }