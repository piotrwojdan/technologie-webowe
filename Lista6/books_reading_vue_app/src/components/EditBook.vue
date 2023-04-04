<template>
    <div id="book-form">
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
                        <label>
                            <p v-for="author in book.authors" :key="author.id">{{ author.name + ' ' + author.lastName }}</p>
                        </label>
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
    name: 'book-form',
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            book: {
                title: '',
                pages: 0,
                authors: [],
            },
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true
            this.clearStatus()

            if (this.invalidTitle || this.invalidPages) {
                this.error = true
                return
            }

            axios.put('http://127.0.0.1:8080/books/' + this.id, this.book)
            alert("Zapisano!");
            this.$router.push("/books");
        },
        clearStatus() {
            this.success = false
            this.error = false
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
    computed: {
        invalidTitle() {
            return this.book.title === ''
        },
        invalidPages() {
            return this.book.pages === 0
        },
    },
}
</script>

<style scoped>
form {
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