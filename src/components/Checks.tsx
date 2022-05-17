export function FormatarCPF(cpf) {

    var strTemp;
    var strValor;

    strTemp = cpf.replace(".", "");
    strTemp = strTemp.replace(".", "");
    strTemp = strTemp.replace(".", "");
    strTemp = strTemp.replace("-", "");
    strTemp = strTemp.replace("-", "");

    strValor = strTemp

    if (strValor.length > 9) {
        strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3) + '.' + strValor.substr(6, 3) + '-' + strValor.substr(9, 2);
    }
    else if (strValor.length > 6) {
        strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3) + '.' + strValor.substr(6, 3);
    }
    else if (strValor.length > 3) {
        strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3);
    }

    return strValor
}

export function FormatarData(birthDay) {

    var strValor
	var strTemp

    strTemp = birthDay.replace("/", "");
    strTemp = strTemp.replace("/", "");
    strValor = strTemp;

    if (strValor.length > 4) {
        strValor = strValor.substr(0, 2) + '/' + strValor.substr(2, 2) + '/' + strValor.substr(4, 4);
    }
    else if (strValor.length > 2 && strValor.length < 5) {
        strValor = strValor.substr(0, 2) + '/' + strValor.substr(2, 2);
    }

    return strValor
}

export function FormatarNumber(number) {

    var strValor
	var strTemp

    strTemp = number.replace(".", "");
    strTemp = strTemp.replace("-", "");
    strTemp = strTemp.replace("(", "");
    strTemp = strTemp.replace(")", "");
    strTemp = strTemp.replace(" ", "");
    strValor = strTemp;

    if (strValor.length < 4 && strValor.length > 1) {
        strValor = '(' + strValor.substring(0, 2) + ')' + ' ' + strValor.substring(2, 3);
    } else if (strValor.length > 10) {
        strValor = '(' + strValor.substring(0, 2) + ')' + ' ' + strValor.substring(2, 3) + strValor.substring(3, 7) + '-' + strValor.substring(7, 11);
    } else {
        strValor = number
    }

    return strValor

}

export function FormatarCep(cep) {

    var strValor
	var strTemp

    strTemp = cep.replace(".", "");
    strTemp = strTemp.replace("-", "");
    strTemp = strTemp.replace(" ", "");
    strValor = strTemp;

    if (strValor.length > 5) {
        strValor = strValor.substring(0, 5) + '-' + strValor.substring(5, 8)
    } else {
        strValor = cep
    }

    return strValor

}

export function ValidarFullName(fullName) {

    if (fullName.length > 5) {
        return 3
    } else if (fullName === '') {
        return 1
    } else {
        return 2
    }
}

export function ValidarCPF(cpf) {

    var Soma;
    var Resto;
    var strCPF;
	var strTemp;
    var i;
    Soma = 0;   

    strTemp = cpf.replace(".", "");
    strTemp = strTemp.replace(".", "");
    strTemp = strTemp.replace(".", "");
    strTemp = strTemp.replace("-", "");
    strTemp = strTemp.replace("-", "");
    strCPF = strTemp;
    if (cpf === '') {
        return 1
    } else {
        if (strCPF == "00000000000")
        return 2;
        for (i=1; i<=9; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) 
        Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) )
        return 2;
        Soma = 0;
        for (i = 1; i <= 10; i++)
           Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) 
        Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) )
            return 2;
        return 3;
    }

}

export function ValidarEmail (email) {

    const emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    const emailCorrect = email.match(emailRegex)

    if (emailCorrect && email != '') {
        return 3
    } else if (email === '') {
        return 1
    } else {
        return 2
    }
}

export function ValidarPassword (password) {

    const passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,18}$$"
    const passwordCorrect = password.match(passwordRegex)

    if (password === '') {
        return 1
    } else if (passwordCorrect) {
        return 3
    } else {
        return 2
    }
}

export function ValidarBirthDay (birthDay) {
    
    if (birthDay.length > 8) {
        return 3
    } else if (birthDay === '') {
        return 1
    } else {
        return 2
    }
}

