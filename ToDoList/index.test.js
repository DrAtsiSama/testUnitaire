const User = require('./utilisateur');
const ToDoList = require('./todolist');
const EmailSenderService = require('./emailSenderService');

const userTest = new User("Fabrice", "Fabien", "fabrice.fabien@hotmail.fr", "2002-02-20", "password1Maj");
const todoTest = new ToDoList("Only ToDoTest", "Je suis du contenu !", Date.now());

describe('Test Utilisateur Valide :', () => {
    test('Nom et prénom renseignés', () => {
        expect(userTest.isNameValid()).toBeTruthy();
        expect(userTest.isPrenomValid()).toBeTruthy();
    });

    test('Adresse mail valide', () => {
        expect(userTest.isMailValid()).toBeTruthy();
    });

    test('Utilisateur agé d\'au moins 13 ans', () => {
        expect(userTest.isAgeValid()).toBeTruthy();
    });

    test('Mot de Passe 8 - 40 Caractères au moins 1 majuscule et 1 chiffre', () => {
        expect(userTest.checkPassword()).toBeTruthy();
    });

    test('La liste de Todo existe chez l\'utilisateur', () => {
        expect(userTest.listToDo.length).toBe(0);
    });
});

describe('Test Utilisateur ToDoList:', () => {
    test('Création d\'une nouvelle ToDoList pour l\'utilisateur', () => {
        let createTodo = userTest.createTodoList("Test TodoList", "Je suis le contenu creation Todo", Date.now());

        expect(userTest.listToDo).toContain(createTodo)
    });

    test('Suppresion d\'une ToDoList pour l\'utilisateur', () => {
        let toDoLength = userTest.listToDo.length;

        userTest.removeTodoList("Test TodoList");
        expect(userTest.listToDo.length).toBe(toDoLength - 1)
    });

    test('Ajout d\'une nouvelle ToDoList à l\'utilisateur', () => {
        const toDoList1 = userTest.createTodoList("Only ToDoTest", "Je suis un second content du contenu !", Date.now());

        userTest.addTodoList(toDoList1);
        expect(userTest.listToDo).toContain(toDoList1)
    });

    test('Affichage de la liste de Todo pour l\'utilisateur', () => {
        userTest.getTodoLists();
        expect(userTest.getTodoLists()).toBe(userTest.listToDo)
    });

    test('Clean ToDoList pour l\'utilisateur', () => {
        let toDoLength = userTest.listToDo.length;

        userTest.removeTodoList("Only ToDoTest");
        expect(userTest.listToDo.length).toBe(toDoLength - 1)
    });
});

describe('Test ToDoList :', () => {
    test('Ajout d\'une nouvelle Tache ', () => {
        let newTask = todoTest.addTask("Ajouter une tache", "contenu de la tache", Date.now());

        expect(todoTest.tasks).toContain(newTask);
    });

    test('Recupération des Taches', () => {
        let list = todoTest.getTasks();

        expect(todoTest.tasks.length).toBe(list.length);
    });

    test('Ajout de la liste de Taches', () => {
        let tasks = userTest.addTaskTodoList(todoTest.getTasks());

        expect(userTest.listToDo).toContain(tasks);
    });

    test('Suppression de la première Tache', () => {
        todoTest.removeTask(1);
        expect(todoTest.tasks.length).toBe(0);
    });
});

jest.mock('./emailSenderService.js');

describe('Test Mock emailSenderService :', () => {
    it('Simulation envoie du mail ', () => {
        // Creation de la promesse pour EmailSenderService
        const emailSenderService = new EmailSenderService();
        // Creation du mock
        const sendEmailMock = jest.fn();

        // Creation d'une instance emailSenderService (sendEmailMock sera utilisé à la place de la fonction sendEmail et EmailSenderService)
        emailSenderService.sendEmail = sendEmailMock;

        // Definition du mail et contenu
        const email = "mailMockTest@test.fr";
        const message = "Je suis un, Mock message";

        // configure le mock pour retourner TRUE
        sendEmailMock.mockReturnValue(true);

        // Appel de sendEmail avec les arguments defini
        const result = emailSenderService.sendEmail(email,message);

        // Verification de l'appel du Mock
        expect(sendEmailMock).toHaveBeenCalled();
        // Attend un resultat lors de l'appel à TRUE
        expect(result).toBeTruthy();
    })
});

test('envoie email au 8 eme item élément de la toDoList', () => {

    // Creation de la promesse pour EmailSenderService
    const emailSenderService = new EmailSenderService();
    // Creation du mock
    const sendEmailMock = jest.fn();
    // Creation d'une instance emailSenderService (sendEmailMock sera utilisé à la place de la fonction sendEmail et EmailSenderService)
    emailSenderService.sendEmail = sendEmailMock;
    // Definition du mail et contenu
    const email = "mailMockTest@test.fr";
    const message = "Je suis un, Mock message";
    // Appel de sendEmail avec les arguments defini
    let result;

    // configure le mock pour retourner TRUE
    sendEmailMock.mockReturnValue(true);

    // creation de la toDoList
    let createTodo = userTest.createTodoList("Test TodoList", "Je suis le contenu creation Todo", Date.now());

    for (let i = 0; i < 10; i++){
        // Ajout des tasks dans la toDoList
        createTodo.addTask("Ajouter une tache", "contenu de la tache", Date.now());

        if (createTodo.tasks.length === 8) {
            result = emailSenderService.sendEmail(email,message);
        }
    }

    // Verification de l'appel du Mock
    expect(sendEmailMock).toHaveBeenCalled();
    // Attend un resultat lors de l'appel à TRUE
    expect(result).toBeTruthy();
});