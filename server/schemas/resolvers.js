const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // context.user
            return context.user;
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            console.log(token);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error("Wrong password!");
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { authors, description, title, bookId, image, link }) => {
            // return User
        },
        removeBook: async (parent, { bookId }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "Couldn't find user with this id!" });
            }
            return updatedUser;
            // return User
        }
    }
}


module.exports = resolvers;