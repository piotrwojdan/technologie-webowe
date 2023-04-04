<template>
    <div id="authors-create">
        <div class="container d-flex justify-content-center">
            <div class="row">
                <form @submit.prevent="handleSubmit">
                    <br>
                    <div class="row mb-4">
                        <label class="form-label text-center mb-4">Name</label>
                        <input type="text" class="form-control" v-model="author.name"
                            :class="{ 'has-error': submitting && invalidName }" @focus="clearStatus" />
                    </div>
                    <div class="row mb-4">
                        <label class="form-label text-center mb-4">Last Name</label>
                        <input type="text" class="form-control" v-model="author.lastName"
                            :class="{ 'has-error': submitting && invalidLastName }" @focus="clearStatus"
                            @keypress="clearStatus" />

                    </div>
                    <p v-if="error && submitting" class="error-message">
                        Proszę wypełnić wskazane pola formularza
                    </p>
                    <div class="d-flex justify-content-center">
                        <button class="btn bg-dark text-white mb-4 center">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'authors-form',
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            author: {
                name: '',
                lastName: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true
            this.clearStatus()
            if (this.invalidName || this.invalidLastName) {
                this.error = true
                return
            }

            axios.post('http://127.0.0.1:8080/authors/', this.author)
            alert("Dodano autora!");
            this.$router.push("/authors");



            this.author = {
                name: '',
                lastName: ''

            }
            this.error = false
            this.success = true
            this.submitting = false
        },

        clearStatus() {
            this.success = false
            this.error = false
        },
    },

    computed: {
        invalidName() {
            return this.author.name === ''
        },
        invalidLastName() {
            return this.author.lastName === ''

        }
    }

}
</script>

<style>
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
}</style>