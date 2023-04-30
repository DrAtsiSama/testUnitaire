const User = require('./utilisateur');
const ToDoList = require('./todolist');
const EmailSenderService = require('./emailSenderService');
// test générique
const userTest = new User("Fabrice", "Fabien", "fabrice.fabien@hotmail.fr", "2002-02-20", "password1Maj");
const todoTest = new ToDoList("Only ToDoTest", "Je suis du contenu !", new Date());

describe('Mock TodoList', () => {
    let todolistMock;
    let pushMock;
    const emailSenderService = new EmailSenderService();
    let email = "toto@tata.titi";
    let message = "Todolist is full!";
    /**
     * Initialisation du mock et todo avant les tests
     * création todo vide + mock pushmock
     */
    beforeEach(() => {
        todolistMock = [];
        // modification de la méthode push pour appeler la méthode d'origine
        todolistMock.internalList = [];
        pushMock = jest.fn((element) => {
            Array.prototype.push.call(todolistMock, element);
            todolistMock.internalList.push(element);
            if(todolistMock.internalList.length === 8){
                emailSenderService.sendEmail(email,message);
            }
        });
        todolistMock.push = pushMock;
    });
    //
    test("8 ème élément ", () => {
        for(let i = 1; i <= 7; i++){
            todolistMock.push(`Tache ${i}`);
        }
        todolistMock.push('Tache 8');
        expect(pushMock).toHaveBeenCalledTimes(8);
        expect(emailSenderService.sendEmail).toHaveBeenCalledWith("toto@tata.titi",'Todolist is full!');
    });
})

//catégorie de test
describe('Test Utilisateur Valide :', () => {
    // définition du test effectué
    test('Nom et prénom renseignés', () => {
        /**
         * expect : résultat voulu
         * .toBeTruthy() : Le résultat retourné doit être vrai
         * le test a pour but de vérifié si le nom de l'utilisateur générique possède bien un Nom.  
         */
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
        let createTodo = userTest.createTodoList("Test TodoList", "Je suis le contenu creation Todo", new Date());

        expect(userTest.listToDo).toContain(createTodo)
    });

    test('Suppresion d\'une ToDoList pour l\'utilisateur', () => {
        let toDoLength = userTest.listToDo.length;

        userTest.removeTodoList("Test TodoList");
        expect(userTest.listToDo.length).toBe(toDoLength - 1)
    });

    test('Ajout d\'une nouvelle ToDoList à l\'utilisateur', () => {
        const toDoList1 = userTest.createTodoList("Only ToDoTest", "Je suis un second content du contenu !", new Date());

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
        let newTask = todoTest.addTaskSansTime("Ajouter une tache", "contenu de la tache", new Date());

        expect(todoTest.tasks).toContain(newTask);
    });
    //Erreur lors de l'ajout de la tache
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
    test('Ajout d\'une nouvelle Tache moins de 30 minutes après', () => {
        let newTask = todoTest.addTask("Ajouter une tache", "contenu de la tache", new Date());

        expect(todoTest.tasks.length === 0).toBe(true);
    });

});

jest.mock('./emailSenderService.js');

describe('Test Mock emailSenderService :', () => {
    // Test d'un mock (retournera un test valide : appel d'une méthode et vérification de l'appel de celle ci dans le même test)
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
    let createTodo = userTest.createTodoList("Test TodoList", "Je suis le contenu creation Todo", new Date());

    for (let i = 0; i < 10; i++){
        // Ajout des tasks dans la toDoList
        createTodo.addTaskSansTime("Ajouter une tache", "contenu de la tache", new Date());
        console.log(createTodo.tasks.length);
        if (createTodo.tasks.length === 8) {
            result = emailSenderService.sendEmail(email,message);
        }
    }

    // Verification de l'appel du Mock
    expect(sendEmailMock).toHaveBeenCalled();
    // Attend un resultat lors de l'appel à TRUE
    expect(result).toBeTruthy();
});