

<template>
    <div class="container">

        <table id="booksTable" class="table table-sm">
            <thead class="thead-dark">
                <tr>
                    <th>Tytuł</th>
                    <th>Liczba stron</th>
                    <th>Autorzy</th>
                    <th>
                        <div class="container">
                            <button @click="(event, id) => createBook(event)" class="btn btn-light">+
                                Create</button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in paginatedData" :key="index">
                    <td>{{ book.title }}</td>
                    <td>{{ book.pages }}</td>
                    <td>
                        <p v-for="author in book.authors" :key="author.id">{{ author.name + ' ' + author.lastName }}</p>
                    </td>
                    <td>
                        <button @click="(event, id) => editBook(event, book.id)" class="btn btn-primary">Edit</button>
                        <button class="btn btn-danger" @click="(event, id) => deleteBook(event, book.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <paginate :page-count="pageCount" :total-items="totalRows" @page-changed="changePage" :prev-text="'Previous'"
            :next-text="'Next'" :container-class="'pagination'" />


    </div>
</template>

<script>
import axios from 'axios'
import { Paginate } from 'vuejs-paginate';


export default {
    name: "books-table",
    data() {
        return {
            pageSize: 5,
            currentPage: 1,
            books_source: []
        }
    },
    computed: {
        totalRows() {
            return this.books_source.length;
        },
        pageCount() {
            return Math.ceil(this.books_source.length / this.pageSize);
        },
        paginatedData() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.books_source.slice(startIndex, endIndex);
        },
    },
    methods: {
        deleteBook(event, id) {
            axios.delete('http://127.0.0.1:8080/books/' + id);
            alert("Ksiązka usunięta!");

        },
        editBook(event, id) {
            this.$router.push("/editBook/" + id);
        },
        createBook(event) {
            this.$router.push("/createBook/");
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
    },
    mounted() {
        axios.get('http://127.0.0.1:8080/books')
            .then(resp => this.books_source = resp.data)
            .catch(error => console.error(error))
    },
    components: {
        Paginate,
    },
}

</script>

<style lang="">
    
</style>