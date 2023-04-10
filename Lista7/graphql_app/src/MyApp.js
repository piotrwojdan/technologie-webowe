import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import axios from "axios";
import {mongoose} from 'mongoose';
mongoose.connect("mongodb+srv://madzik:madzikPassword!@cluster0.gawc2fs.mongodb.net/?retryWrites=true&w=majority");


const User= mongoose.model("User",{
    name: String,
    login: String,
    email: String,
});

const ToDoItem= mongoose.model("ToDoItem",{
    title: String,
    completed: String,
    user_id: String,
});




const resolvers = {
    Query: {
      getUsers: ()=> User.find(),
      getUser: async (_,{id}) => {
        var result = await User.findById(id);
        return result;
    }
},
    Mutation: {
        addUser: async (_, { name, login, email }) => {
            console.log(mongoose.connection.readyState)
            const user = new User({name, login, email});
            await user.save();
            return user;
        },
        deleteUser: async (_, {id}) => {
            await User.findByIdAndRemove(id);
            return "User deleted";
        }
    }
  }


const schema = createSchema({
  typeDefs: readFileSync(join("./src/schema.graphql"), "utf8"),
  resolvers
  
});

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
