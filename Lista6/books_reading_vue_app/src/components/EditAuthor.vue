<template>
    <div id="authors-form">
        <div class="container d-flex justify-content-center">
            <div class="row">
                <form @submit.prevent="handleSubmit">
                <br>
                    <div class="row mb-4">
                            <label class="form-label text-center mb-4">Name</label>
                            <input type="text" class="form-control" v-model="author.name"/>
                    </div>
                    <div class="row mb-4">
                            <label class="form-label text-center mb-4">Last Name</label>
                            <input type="text" class="form-control" v-model="author.lastName"/>
                        
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
import axios from 'axios';

export default {
    name: 'authors-form',
    data() {
        return {
            author: {
                name: '',
                lastName: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            axios.put('http://127.0.0.1:8080/authors/' + this.id, this.author)
            alert("Zapisano!");
            this.$router.push("/authors");
        },
    },

    props: ["id"],
    mounted() {
        axios.get('http://127.0.0.1:8080/authors/' + this.id)
            .then(resp => {
                this.author.name = resp.data.name;
                this.author.lastName = resp.data.lastName;
            })
            .catch(error => console.error(error))
    },
    
}
</script>

<style>
    
</style>