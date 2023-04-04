<template>
    <div>
        <div class="container d-flex justify-content-center">
            <div class="row">
                <form @submit.prevent="handleSubmit">
                <br>
                    <div class="row mb-4">
                            <label class="form-label text-center mb-4">Title</label>
                            <input type="text" class="form-control" v-model="book.title"/>
                    </div>
                    <div class="row mb-4">
                            <label class="form-label text-center mb-4">Pages</label>
                            <input type="number" class="form-control" v-model="book.pages"/>
                        
                    </div>
                    <div class="row mb-4">

                        <label class="form-label">Authors</label>
                        <select multiple class="form-select" v-model="book.authorID"><option v-for="author in this.authors" :key="author.id" :value="author.id">{{ author.name + ' ' + author.lastName}}</option></select>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn bg-dark text-white mb-4 center">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { throwStatement } from '@babel/types';
import axios from 'axios'

export default {
    data() {
        return {
            book: {
                title: '',
                pages: '',
                authorID: [],
            },
            authors: [],
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8080/authors/')
            .then(resp => this.authors = resp.data)
            .catch(error => console.error(error))
    },
    methods: {
        handleSubmit() {
            axios.post('http://127.0.0.1:8080/books/', this.book);
            alert("Dodano ksiazke!");
            this.$router.push("/books");
        }
    }
    
}
</script>

<style>
    
</style>