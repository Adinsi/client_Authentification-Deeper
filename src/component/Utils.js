export const dateParser = (num) => {
    let options = { hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "long", year: "numeric", month: "short", day: "numeric" };
    let timestatmp = Date.parse(num);
    let date = new Date(timestatmp).toLocaleDateString('fr-BJ', options);
    return date.toString();
}