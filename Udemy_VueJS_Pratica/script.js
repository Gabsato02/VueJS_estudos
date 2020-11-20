let app = new Vue({
    el: '#app',
    data: {
        appName: 'Agenda de Contatos',
        appTitle: 'App para gerenciamento de contatos',
        contact: {
            id: '',
            name: '',
            email: '',
            phone: ''
        },
        contacts: [],
        isEdit: false
    },
    created() {
        this.contacts = JSON.parse(localStorage.getItem('contactsStorage'));
    },
    methods: {
        addContact(contact) {
            // Verifica se existe o item contactsStorage no Local Storage (armazenamento de browser interseção)
            let contacts = localStorage.getItem('contactsStorage');

            contact.id = new Date().getTime();

            if (contacts) {
                // Converte o conteúdo do item contacts em objeto para depois dar um push no novo contato
                contacts = JSON.parse(contacts);
                contacts.push(contact);
            } else {
                contacts = [contact];
            }

            this.contacts = contacts;
            
            // Adiciona o conteúdo da variável contacts no item contactsStorage do Local Storage, convertendo para JSON antes
            localStorage.setItem('contactsStorage', JSON.stringify(contacts));
            location.reload();
        },
        deleteContact(contactId) {
            let contacts = localStorage.getItem('contactsStorage');

            // Se não houver items no Local Storage, retorna
            if (!contacts) return;

            contacts = JSON.parse(contacts);

            // A variável contacts recebe através dum filtro, apenas os elementos cujo IDs sejam diferentes do ID passado por parâmetro para exclusão
            contacts = contacts.filter((element) => {
                return element.id != contactId;
            });

            this.contacts = contacts;

            localStorage.setItem('contactsStorage', JSON.stringify(contacts));
        },
        editContact(contact) {
            this.contact = contact;
            this.isEdit = true;
            
        },
        updateContact(contact) {
            let contacts = this.contacts.map(element => {
                if (element.id === contact.id) {
                    return contact;
                } else {
                    return element;
                }
            });

            this.contacts = contacts;
            this.isEdit = false;

            localStorage.setItem('contactsStorage', JSON.stringify(contacts));
            location.reload();
        }
    },
    computed: {
        contactsCount() {
            return `Total de contatos: ${this.contacts.length}`;
        }
    }

});