<template>
    <div>
        <div class="container d-flex justify-content-center">
            <div class="row">
                <form @submit.prevent="handleSubmit">
                    <br>
                    <div class="row mb-4">
                        <label class="form-label text-center mb-4">Title</label>
                        <input type="text" class="form-control" v-model="book.title"
                            :class="{ 'has-error': submitting && invalidTitle }" @focus="clearStatus"
                            @keypress="clearStatus" />
                    </div>
                    <div class="row mb-4">
                        <label class="form-label text-center mb-4">Pages</label>
                        <input type="number" class="form-control" v-model="book.pages"
                            :class="{ 'has-error': submitting && invalidPages }" @focus="clearStatus"
                            @keypress="clearStatus" />
                    </div>
                    <div class="row mb-4">
                        <label class="form-label">Authors</label>
                        <select multiple class="form-select" v-model="book.authorID">
                            <option v-for="author in this.authors" :key="author.id" :value="author.id"
                                :class="{ 'has-error': submitting && invalidPages }" @focus="clearStatus"
                                @keypress="clearStatus">{{ author.name + ' '
                                    + author.lastName }}</option>
                        </select>
                    </div>
                    <div class="d-flex justify-content-center">
                        <p v-if="error && submitting" class="error-message">
                            Please put all the necesary info in!
                        </p>
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
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            book: {
                title: '',
                pages: 0,
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
            this.submitting = true
            this.clearStatus()

            if (this.invalidTitle || this.invalidPages || this.invalidAuthors) {
                this.error = true
                return
            }

            axios.post('http://127.0.0.1:8080/books/', this.book);
            alert("Dodano ksiazke!");
            this.$router.push("/books");
        },
        clearStatus() {
            this.success = false
            this.error = false
        },
    },
    computed: {
        invalidTitle() {
            return this.book.title === ''
        },
        invalidPages() {
            return this.book.pages === 0
        },
        invalidAuthors() {
            return this.book.authorID.length === 0
        }
    },
}
</script>

<style scoped> form {
     margin-bottom: 2rem;
 }

 [class*='-message'] {
     font-weight: 500;
 }

 .error-message {
     color: #d33c40;
 }

 .success-message {
     color: #32a95d;
 }
</style>