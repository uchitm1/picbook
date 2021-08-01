const bcrypt = require("bcryptjs");

const registerUser = async (_parent, args, context) => {
	const usernameExists = await context.prisma.user.findUnique({
		where: { username: args.user.username },
	});
	if (usernameExists) throw new Error("Username already exists.");
	const password = await bcrypt.hash(args.user.password, 10);
	const user = await context.prisma.user.create({
		data: {
			...args.user,
			password,
		},
	});
	context.req.session.userId = user.id;
	return user;
};

const loginUser = async (_parent, args, context) => {
	const user = await context.prisma.user.findUnique({
		where: { username: args.user.username },
	});
	if (!user) throw new Error("Account doesn't exist.");
	const matchedPassword = await bcrypt.compare(
		args.user.password,
		user.password
	);
	if (!matchedPassword) throw new Error("Incorrect Password");
	context.req.session.userId = user.id;
	return user;
};

const logoutUser = async (_parent, _args, context) => {
	return new Promise((resolve, _reject) => {
		context.req.session.destroy((err) => {
			context.res.clearCookie(process.env.COOKIE_NAME);
			if (err) {
				console.error(err);
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
};

const currentUser = async (_parent, _args, context) => {
	if (!context.req.session.userId) {
		throw new Error("No ongoing session");
	}
	const user = await context.prisma.user.findUnique({
		where: { id: context.req.session.userId },
	});
	return user;
};

const createPost = async (_parent, args, context) => {
	const post = await context.prisma.post.create({
		data: {
			imageUrl: args.post.imageUrl,
			description: args.post.description,
			createdBy: { connect: { id: context.req.session.userId } },
		},
	});
	return post;
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	currentUser,
	createPost,
};
