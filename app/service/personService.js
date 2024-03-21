class personService {
    constructor() {
        this.listPersons = [];
    }

    addPerson(person){
        this.listPersons.push(person);
    }

    deletePersonByCode(_code){
        this.listPersons.filter(person => person.code !== _code);
    }

    updatePerson(_code, newPersonInfo) {
        let foundIndex = this.listPersons.findIndex(person => person.code === _code);
        if(foundIndex !== -1){
            // * assign every properties in newPersonInfo into this.listPersons[foundIndex]
            this.listPersons[foundIndex] = { ...this.listPersons[foundIndex], ...newPersonInfo };
        }
    }

    sortPersons() {
        this.listPersons.sort((a, b) => a.name.localeCompare(b.name));
    }

    filterPersons(type) {
        return this.listPersons.filter(person => person instanceof type);
    }
}
