<template>
    <div id="book-form">
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
                        <label><p v-for="author in book.authors" :key="author.id">{{ author.name + ' ' + author.lastName}}</p></label>
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
import axios from 'axios'

export default {
    name: 'book-form',
    data() {
        return {
            book: {
                title: '',
                pages: '',
                authors: [],
            },
        }
    },
    methods: {
        handleSubmit() {
            console.log('uruchomiono handleSubmit')
            
            axios.put('http://127.0.0.1:8080/books/' + this.id, this.book)
            alert("Zapisano!");
            this.$router.push("/books");
        },
    },

    props: ["id"],
    mounted() {
        axios.get('http://127.0.0.1:8080/books/' + this.id)
            .then(resp => {
                this.book.title = resp.data.title;
                this.book.pages = resp.data.pages;
                this.book.authors = resp.data.authors;
            })
            .catch(error => console.error(error))
    },
}
</script>