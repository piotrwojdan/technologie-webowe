<template>
    <div class="container">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th>Tytuł</th>
                    <th>Liczba stron</th>
                    <th>Autorzy</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in this.books_source" :key="book.id">
                    <td>{{ book.title }}</td>
                    <td>{{ book.pages }}</td>
                    <td>
                        <p v-for="author in book.authors" :key="author.id">{{ author.name + ' ' + author.lastName}}</p>
                    </td>
                    <td>
                        <button class="btn btn-primary" >Edit</button>
                        <button class="btn btn-danger" @click="(event, id) => deleteBook(event, book.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "books-table",
    data() {
        return {
            books_source: null
        }
    },
    methods: {
        deleteBook(event, id) {
            axios.delete('http://127.0.0.1:8080/books/' + id) 
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8080/books')
        .then(resp => this.books_source = resp.data)
        .catch(error => console.error(error))
    },
}

</script>

<style lang="">
    
</style>