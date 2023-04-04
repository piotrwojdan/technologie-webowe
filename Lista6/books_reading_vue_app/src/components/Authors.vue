<template>
    <div class="container">
        <table id="authorsTable" class="table table-sm">
            <thead class="thead-dark">
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>
                        <div class="container">
                            <button @click="(event, id) => createAuthor(event)" class="btn btn-light">+
                                Create</button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="author in authors_source" :key="author.id">
                    <td>{{ author.name }}</td>
                    <td>{{ author.lastName }}</td>
                    <td>
                        <button @click="(event) => editAuthor(event, author.id)" class="btn btn-primary">Edit</button>
                        <button class="btn btn-danger" @click="(event) => deleteAuthor(event, author.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'authors',
    data() {
        return {
            pageSize: 5,
            currentPage: 1,
            authors_source: []
        }
    },
    methods: {
        createAuthor() {
            this.$router.push("/createAuthor/");
        },
        editAuthor(event, id) {
            this.$router.push("/editAuthor/" + id);
        },
        async deleteAuthor(event, id) {
            await axios.delete('http://127.0.0.1:8080/authors/' + id)
                .then(resp => alert("Autor usunięty!"))
                .catch(err => {
                    if (err.response.status == 403) {
                        alert("Dany autor nadal posiada ksiazki w systemie! Nie mozna usunąć!!!")
                    } 
                });
            this.$router.go();
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8080/authors')
            .then(resp => this.authors_source = resp.data)
            .catch(error => console.error(error))
    }
}
</script>
<style>
    
</style>