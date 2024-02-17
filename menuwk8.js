//the provided code sets up a system for managing different types of employees and their associated trainees through a menu-driven interface. 
//Users can create, view, and delete employee types, as well as add or remove trainees within each type.

//This section describes the Trainee class and its properties. It also uses a describe method to state the name and job title of the employees.
class Trainee {
    constructor(name, title) {
        this.name = name;
        this.title = title;
    }

    describe() {
        return `${this.name}'s job title is ${this.title}`;
    }
}

//This section describes the EmployeeType class, adding the properties of 'name' and an empty array of 'trainees'. 
class EmployeeType {
    constructor(name) {
        this.name = name;
        this.trainees = [];
    }

    addTrainee(trainee) {
        if (trainee instanceof Trainee) {
            this.trainees.push(trainee);
        } else { //If the argument passed is not an instance of 'Trainee', it shows an error.
            throw new Error(`You can only add an instance of Trainee. 
            Argument is not trainee: ${trainee}`);
        }
    }

    describe() {
        return `There are ${this.trainees.length} ${this.name} trainees in the upcoming training.`; //Shows the number of trainees for the particular employee type.
    }
}

//This section defines the menu system that will be used in the app. 
class Menu {
    constructor() {
        this.employeeTypes = [];
        this.selectedEmployeeType = null;
    }

    start() { //Start method to show the starting point of the application and what each selection will be tied to.
        let selection = this.showMainMenuOptions();
        while (selection !== '4') { 
            switch(selection) {
                case '0':
                    this.createEmployeeType();
                    break;
                case '1':
                    this.viewEmployeeType();
                    break;
                case '2':
                    this.deleteEmployeeType();
                    break;
                case '3':
                    this.displayEmployeeTypes();
                    break;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Task completed!'); //If the selection is 4 (Exit), this alert will pop up on the screen.
    }

    showMainMenuOptions() { //Selections for the main menu (what will be displayed).
        return prompt(`
        0) Create a new employee type
        1) View trainees by employee type
        2) Delete an employee type
        3) Display all employee types
        4) Exit
        `);
    }

//Shows what each menu item is linked to and how to handle user input.
    showEmployeeTypeMenuOptions(employeeTypeInfo) {  //Selections for the employee type menu.
        return prompt(`
        0) Add new trainee
        1) Delete existing trainee
        --------------------
        ${employeeTypeInfo}
        `);
    }

    displayEmployeeTypes() {
        let employeeTypeString = '';
        for (let i = 0; i < this.employeeTypes.length; i++) {
            employeeTypeString += i + ') ' + this.employeeTypes[i].name + '\n';
        }
        alert(employeeTypeString);
    }

    createEmployeeType() { 
        let name = prompt('Enter new employee type: ');
        this.employeeTypes.push(new EmployeeType(name));
    }

    viewEmployeeType() {
        let index = prompt("Enter the number of the employee type that you want to view:");
        if (index > -1 && index < this.employeeTypes.length) {
            this.selectedEmployeeType = this.employeeTypes[index];
            let description = 'Employee type : ' + this.selectedEmployeeType.name + '\n';
            description += ' ' + this.selectedEmployeeType.describe() + '\n ';
            for (let i = 0; i < this.selectedEmployeeType.trainees.length; i++) {
                description += i + ') ' + this.selectedEmployeeType.trainees[i].describe() + '\n';
            }
            let selection1 = this.showEmployeeTypeMenuOptions(description); //When viewing an employee type, another menu will give the option of adding or deleting a trainee.
            switch (selection1) {
                case '0':
                    this.createTrainee();
                    break;
                case '1':
                    this.deleteTrainee();
                    break;
            }
        }
    }

    deleteEmployeeType() {
        let index = prompt('Enter the number of the employee type to be deleted: ');
        if (index > -1 && index < this.employeeTypes.length) {
            this.employeeTypes.splice(index, 1);
        }
    }

    createTrainee() {
        let name = prompt('Enter name for new trainee: ');
        let title = prompt('Enter title for new trainee: ');
        this.selectedEmployeeType.addTrainee(new Trainee(name, title)); //After adding a new trainee name, it will also ask for the job title.
    }

    deleteTrainee() {
        let index = prompt('Enter the index of the trainee that you wish to delete: ');
        if (index > -1 && index < this.selectedEmployeeType.trainees.length) { 
            this.selectedEmployeeType.trainees.splice(index, 1);
        }
    }
}

let menu = new Menu(); //Instatiates a new menu object.
menu.start(); //Start method to initiate the application.
