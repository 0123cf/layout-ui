export const getUrlParams = (name: string) => {
    var str, href = window.document.location.href, i = href.indexOf(name + '=')
    if (i == -1) return void 0
    str = href.slice(name.length + i + 1)
    return str.split('&')[0]
}