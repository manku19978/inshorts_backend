export const formatString = str => {
    let result = ''
    let chainChars = 0

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === '\xa0' || str.charAt(i) === ' ') {
            if (chainChars === 0) {
                result += ' '
            }
            chainChars++
        } else {
            result += str.charAt(i)
            chainChars = 0
        }
    }

    const resultArray = result.split(' ')

    return {
        title: resultArray[0],
        count: resultArray[1],
        countChange: resultArray[2]
    }
}
