var someData = [
    {
        firstName: "Max",
        lastName: "Mustermann",
        age: 40
    },
    {
        firstName: "Hagbard",
        lastName: "Celine",
        age: 44
    },
    {
        firstName: "Karl",
        lastName: "Koch",
        age: 42
    },
];

var employees = {
    accounting: []
};

for (var i in someData) {

    var item = someData[i];

    employees.accounting.push({
        "firstName": item.firstName,
        "lastName": item.lastName,
        "age": item.age
    });
}
