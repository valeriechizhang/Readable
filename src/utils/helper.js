export const formatDate = (timestamp) => {
    if (timestamp) {
        if (typeof timestamp !== 'number') {
            timestamp = parseInt(timestamp)
        }
        var date = new Date(timestamp)
        return date.toString().slice(4, 16)
    }
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export const createUUID = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}