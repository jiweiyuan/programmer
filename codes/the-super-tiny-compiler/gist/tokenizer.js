// while numbers

function tokenizer(str) {
    let result = []
    let current = 0

    while(current <= str.length - 1) {
        console.log(100)
        let char = str[current]

        let NUMBERS = /[0-9]/
        if(NUMBERS.test(char)) {
            let value = ''
            while(NUMBERS.test(char)) {
                console.log(char)
                value += char
                char = str[++current]
            }
            result.push({type: 'number', value: value})
            continue
        }
        
        let STRINGS = /[a-z]/
        if(STRINGS.test(char)) {
            let value = ''
            while(STRINGS.test(char)) {
                value += char
                char = str[++current]
            }
            console.log(char)

            result.push({type: 'string', value: value})
            continue
        }
    }

    return result;
}

// fn("name1134saf") => [{type: 'string', value:'adfas'}, {type: 'number', value: '1134' }, {type: 'string', value: 'sdf'}]

console.log(tokenizer("name1134saf"))