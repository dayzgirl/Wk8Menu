//This is a menu to create a roster of trainees for the next training class. It should include the full names, employee ID, Phone number, 
//email, whether their background check and drug tests have been cleared, and the type of trainee (employees, management, contractors, and temps).  
//If the background check and drug tests have not been cleared, it should not allow you to add the new hire. You should be able to see the trainees
//by type.

//Type of trainee and trainee name
class Trainee {
    constructor(name, title) {
        this.name = name;
        this.title = title;
    }

    describe() {
        return `${this.name}'s job title is ${this.title}`;
    }
}

class EmployeeType {
    constructor(name) {
        this.name = name;
        this.trainees = [];
    }

    addTrainee(trainee) {
        if (trainee instanceof Trainee) {
            this.trainees.push(trainee);
        } else {
            throw new Error(`You can only add an instance of Trainee.
            Argument is not trainee: ${trainee}`);
        }
    }

    describe() {
        return `There are ${this.trainees.length} ${this.name} trainees in the upcoming training.`;
    }
}

class Menu {
    constructor() {
        this.employeeTypes = [];
        this.selectedEmployeeType = null;
    }

    start() {
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
        alert('Task completed!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Create a new employee type
        1) View trainees by employee type
        2) Delete an employee type
        3) Display all employee types
        4) Exit
        `);
    }

    showEmployeeTypeMenuOptions(employeeTypeInfo) {
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
            let selection1 = this.showEmployeeTypeMenuOptions(description);
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
        this.selectedEmployeeType.addTrainee(new Trainee(name, title));
    }

    deleteTrainee() {
        let index = prompt('Enter the index of the trainee that you wish to delete: ');
        if (index > -1 && index < this.selectedEmployeeType.trainees.length) { 
            this.selectedEmployeeType.trainees.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
