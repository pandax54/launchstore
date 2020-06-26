
module.exports = {
    date(timestamp) {
        const date = new Date(timestamp)

        // yyyy
        // const year = date.getUTCFullYear()
        const year = date.getFullYear()

        //mm
        //const month = `0${date.getUTCMonth() + 1}`.slice(-2) 

        // const month = (date.getUTCMonth() + 1 < 10) ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1
        const month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1

        // dd
        // const day = `0${date.getUTCDate()}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);

        const hour = date.getHours();

        const minutes = date.getMinutes();

        // yyyy-mm-dd
        console.log(`${year}-${month}-${day}`)

        // return `${year}-${month}-${day}`
        // I want options to show the data, so I am gonna create an object
        return {
            day,
            month,
            year,
            hour,
            minutes,
            "iso": `${year}-${month}-${day}`,
            "birthDay": `${day}/${month}`,
            format: `${day}/${month}/${year}`
            // you now must called it inside the functions 

        }
    },
    formatBRL(price) {
        return Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price / 100)
    },
    formatCpfCnpj(value) {
        value = value.replace(/\D/g, "")

        // if (value.length > 14) {
        // value = value.slice(0, -1)
        // }

        // check if cpnj
        if (value.length > 11) {
            // 11.222.333/4444-55 -> exemplo de cnpj

            // 11.222333444455
            value = value.replace(/(\d{2})(\d)/, "$1.$2")
            // 11.222.333444455
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            // 11.222.333/444455
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            // 11.222.333/4444-55
            value = value.replace(/(\d{4})(\d)/, "$1-$2")
            // nao permitir mais entradas
            value = value.replace(/(-\d{2})\d+?$/, '$1')

        } else if (value.length == 11) {
            // cpf
            value = value.replace(/(\d{3})(\d)/, '$1.$2')
            value = value.replace(/(\d{3})(\d)/, '$1.$2')
            value = value.replace(/(\d{3})(\d)/, '$1-$2')

            //value = value.replace(/(\d{3})(\d{2})/, '$1-$2')
            //value = value.replace(/(-\d{2})\d+?$/, '$1'

        }

        return value
    },
    formatCep(value) {

        return value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d{3})/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    }
}