<template>
    <div id="book-form">
        <div class="container d-flex justify-content-center">
            <div class="row">
                <form @submit.prevent="handleSubmit">
                <br>
                    <div class="row mb-4">
                            <label class="form-label text-center mb-4">Title</label>
                            <input type="text" class="form-control" placeholder=""/>
                    </div>
                    <div class="row mb-4">
                            <label class="form-label text-center mb-4" placeholder="">Pages</label>
                            <input type="number" class="form-control"/>
                        
                    </div>
                    <div class="row mb-4">

                        <label class="form-label">Authors</label>
                        <label><p v-for="author in book.authors" :key="author.id">{{ author.name + ' ' + author.lastName}}</p></label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn bg-dark text-white mb-4 center">Send</button>
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
                id: '',
                title: '',
                pages: '',
                authors: [],
            },
        }
    },
    methods: {
        handleSubmit(id) {
            axios.put('http://127.0.0.1:8080/books/' + id, this.book)
            console.log('uruchomiono handleSubmit')
        },
    },

    props: ['id'],
    mounted() {
        axios.get('http://127.0.0.1:8080/books/' + props['id'])
            .then(resp => this.book = resp.data)
            .catch(error => console.error(error))
    },
}
</script>