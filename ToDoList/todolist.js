class TodoList {
    constructor(name, content, dateDeCreation) {
        this.name = name; // Nom ToDoList
        this.content = content;
        this.dateCreation = dateDeCreation;
        this.lastTaskDateCreation = dateDeCreation;
        this.tasks = [];  // Liste de Taches
        this.lastTaskId = 0; // Id Tache
        this.id = Math.floor(Math.random() * 1000); // Id ToDoList
    }

    addTask(tache, contenu, date) {
        // verification si : date actuelle - date de création de la dernière tache est inférieur à 30 minutes. Si pas de dernière tache retourne FALSE
        const validDate = (new Date() - this.lastTaskDateCreation)  < 30 * 60 * 1000 || false;
        // Taches entre 0 et 10 | Le nom de la tache ajouté n'existe pas | Pas de dernière tache il y a moins de 30 minutes | contenu de la tache avec un maximum de 1000 caractères
        if(
            this.tasks.length >= 0 &&
            this.tasks.length < 10 &&
            !this.tasks.includes(tache.name) &&
            !validDate &&
            contenu.length <= 1000
        ) {
            // incrémentation du dernier ID utilisé et ajout de celui ci, nom de la tache, contenu, date de création
            const newTask = {
                id: ++this.lastTaskId,
                name: tache,
                content : contenu,
                dateCreation : date
            };
            this.lastTaskDateCreation = new Date();

            this.tasks.push(newTask);
            return newTask;
        }
    }

    addTaskSansTime(tache, contenu, date) {
        // verification si : date actuelle - date de création de la dernière tache est inférieur à 30 minutes. Si pas de dernière tache retourne FALSE
        const validDate = (new Date() - this.lastTaskDateCreation) < 1 || false ; // < 30 * 60 * 1000 || false;
        // Taches entre 0 et 10 | Le nom de la tache ajouté n'existe pas | Pas de dernière tache il y a moins de 30 minutes | contenu de la tache avec un maximum de 1000 caractères
        if(
            this.tasks.length >= 0 &&
            this.tasks.length < 10 &&
            !this.tasks.includes(tache.name) &&
            !validDate &&
            contenu.length <= 1000
        ) {
            // incrémentation du dernier ID utilisé et ajout de celui ci, nom de la tache, contenu, date de création
            const newTask = {
                id: ++this.lastTaskId,
                name: tache,
                content : contenu,
                dateCreation : date
            };
            this.lastTaskDateCreation = new Date();

            this.tasks.push(newTask);
            return newTask;
        }
    }

    removeTask(id) {
        // Recherche de l'id de la tache dans la liste
        const index = this.tasks.findIndex(task => task.id === id);

        // Si celui-ci existe
        if (index !== -1) {
            // Retrait de la tache dans la liste
            this.tasks.splice(index, 1);
        }
    }

    getTasks() {
        return this.tasks;
    }
}

module.exports = TodoList;