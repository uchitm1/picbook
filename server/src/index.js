const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const dateScalar = require("./resolvers/Date");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");
const Like = require("./resolvers/Like");

const main = async () => {
	const app = express();
	const PORT = process.env.PORT || 4000;

	dotenv.config();

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	app.use(
		session({
			name: process.env.COOKIE_NAME,
			store: new pgSession({
				conString: process.env.DATABASE_URL,
			}),
			cookie: {
				maxAge: 14 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			},
			secret: process.env.SESSION_SECRET_KEY,
			saveUninitialized: false,
			resave: false,
		})
	);

	const prisma = new PrismaClient();

	const apolloServer = new ApolloServer({
		typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
		resolvers: {
			Date: dateScalar,
			Query,
			Mutation,
			User,
			Post,
			Like,
		},
		context: ({ req, res }) => {
			return {
				req,
				res,
				prisma,
			};
		},
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

main().catch((err) => console.log(err));
