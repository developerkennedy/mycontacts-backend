const isValidEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/
    return regex.test(value)
}

module.exports = isValidEmail;