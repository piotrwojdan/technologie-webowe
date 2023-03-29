<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Liczba stron</th>
                    <th>Autorzy</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books_source" :key="book.id">
                    <td>{{ book.title }}</td>
                    <td>{{ book.pages }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "books-table",
    props: {
        books_source: Array,
    },
}
</script>

<style lang="">
    
</style>