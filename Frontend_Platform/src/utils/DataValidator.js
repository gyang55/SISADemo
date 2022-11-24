function validateStringName(name) {
    return name.match(
        /^([A-Za-z]+[]?)*([A-Za-z]+)?$/
    );
}

function validateCompanyName(name) {
    return name.match(
        /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/
    );
}

function validatePhone(phone) {
    return phone.match(
        /^[]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im
    );
}

function validateAddress(address) {
    return address.match(
        /^[a-zA-Z0-9\s,.'-]{3,}$/
    );
}

function validatePassword(password) {
    return password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    )
}

function validateOldPassword(saved_old_password, old_password){
    if(saved_old_password === old_password){
        return true
    }
    return false
}

function validatePasswordMatches(new_password, new_password_confirm){
    if(new_password === new_password_confirm){
        return true
    }
    return false
}

function validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

export {
    validateStringName,
    validatePhone,
    validateCompanyName,
    validateAddress,
    validatePassword,
    validatePasswordMatches,
    validateOldPassword,
    validateEmail
};